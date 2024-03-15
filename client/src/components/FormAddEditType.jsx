import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function FormAddEditType(props) {
  const [input, setInput] = useState({
    name : ""
  })

  let { id } = useParams()

  let nav = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    // console.log(input);
    try {
      if (props.title == "Add") {
        const { data } = await axios.post("https://api.dzakii.online/types", input, { headers: { Authorization: `Bearer ${localStorage.access_token}`, "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8' } })
        nav('/cms/types')
      } else {
        const { data } = await axios.put(`https://api.dzakii.online/types/${id}`, input, { headers: { Authorization: `Bearer ${localStorage.access_token}`, "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8' } })
        nav('/cms/types')
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex flex-col m-10">
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {props.title} Type
      </h5>
      <form className="max-w-md mx-auto" onSubmit={handleOnSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="floating_username"
            className="block py-  2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            value={input.name}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  name: e.target.value
                }
              })
            }}
          />
          <label>
            Name
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.title}
        </button>
      </form>
    </div>
  )
}