import Axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function DetailComp() {
  const [dataDetail, setDataDetail] = useState({})
  let {id} = useParams()
  console.log(id);
  const fetchData = async () => {
    try {
      const { data } = await Axios.get(`https://api.dzakii.online/pub/${id}`)
      setDataDetail(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
        <div className="flex justify-center">
          <a href="#">
            <img className="rounded-t max-h-80" src={dataDetail.imgUrl} alt="" />
          </a>
        </div>
        <div className="flex justify-between w-full h-40">
          <div className="card max-w-full h-full rounded mx-4 p-6 flex-wrap justify-between">
            <div className="flex flex-col">
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                {dataDetail.name}
              </h5>
            </div>
            <div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Location : {dataDetail.location}
              </p>
            </div>
            <div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Facility : {dataDetail.facility}
              </p>
            </div>
          </div>
          <div className="max-w-sm h-40 bg-white p-6">
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-end">Price</p>
            </div>
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-end">Rp. {dataDetail.price}</p>
            </div>
          </div>
        </div>
      </div>
  )
}