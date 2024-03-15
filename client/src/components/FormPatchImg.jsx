import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function FormPatchImg() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = useState({})
  let { id } = useParams()
  let nav = useNavigate()



  const fetchData = async () => {
    try {
      const { data } = await axios.get(`https://api.dzakii.online/pub/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      // console.log(data.name);
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      // console.log(localStorage.access_token);
      const response = await axios.patch(`https://api.dzakii.online/lodgings/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        },
      });

      // Lakukan sesuatu setelah berhasil mengunggah file
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div>

      </div>
      <div className="flex justify-center">
        <div className="flex flex-col m-10 w-80">
          <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Patch Image
          </h5>
          <div className="flex flex-col m-10">
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" name="" value={data.name} id="" />
            <label className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Old Url</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" name="" value={data.imgUrl} id="" />
            <div className="relative z-0 w-full mb-5 group">
              <form onSubmit={handleUpload}>
                <label className="block mt-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
                <input onChange={handleFileChange} name="imgUrl" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                <button type="submit"
                  className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}