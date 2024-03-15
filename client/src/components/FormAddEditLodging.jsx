import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function FormAddLodging(props) {
  // console.log(props.title);
  let [input, setInput] = useState({
    name: "",
    facility: "",
    roomCapacity: "",
    imgUrl: "",
    location: "",
    price: "",
    typeId: ""
  })

  const [types, setTypes] = useState([])
  let [lodging, setLodging] = useState({})
  const fetchDataType = async () => {
    try {
      const dataType = await axios.get("https://api.dzakii.online/types", {
        
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setTypes(dataType.data)
    } catch (error) {
      console.log(error);
    }
  }
  let { id } = useParams()
  let fetchData = undefined
  if (id) {
    fetchData = async () => {
      const dataLodging = await axios.get(`https://api.dzakii.online/lodgings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        }
      })
      setLodging(dataLodging.data)
      setInput(dataLodging.data)
    }
  }
  
  // console.log(id);
  useEffect(() => {
    fetchDataType()
    if (id) {
       fetchData()
    }
  }, [])

  let nav = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    // console.log(input);
    try {
      if (props.title == "Add") {
        const { data } = await axios.post("https://api.dzakii.online/lodgings", input, { headers: { Authorization: `Bearer ${localStorage.access_token}`, "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8' } })
        nav('/cms')
      } else {
        const { data } = await axios.put(`https://api.dzakii.online/lodgings/${id}`, input, { headers: { Authorization: `Bearer ${localStorage.access_token}`, "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8' } })
        nav('/cms')
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col m-10">
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {props.title} Lodging
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="facility"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            value={input.facility}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  facility: e.target.value
                }
              })
            }}
          />
          <label
          >
            Facility
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="roomCapacity"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required=""
            value={input.roomCapacity}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  roomCapacity: +e.target.value
                }
              })
            }}
          />
          <label
          >
            Room Capacity
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="url"
            name="imgUrl"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            value={input.imgUrl}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  imgUrl: e.target.value
                }
              })
            }}
          />
          <label
          >
            Image Url
          </label>
        </div>
        <div className="flex flex-wrap">

          <div className="relative z-0 w-full mb-5 group">
            <label className="mr-4">
              Type
            </label>
            <select className="select select-bordered w-full max-w-xs" onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  typeId: +e.target.value
                }
              })
            }}>
              {input.typeId ? <option value="0" name="typeId" selected>--SELECT--</option> : <option value="0" name="typeId">--SELECT--</option>}
              {types.map(el => {
                if (input.typeId == el.id) {
                  return <option value={el.id} name="typeId" selected >{el.name}</option>
                } else {
                  return <option value={el.id} name="typeId" >{el.name}</option>
                }
              })}
            </select>

          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="location"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              value={input.location}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    location: e.target.value
                  }
                })
              }}
            />
            <label
            >
              Location
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="price"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              value={input.price}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    price: +e.target.value
                  }
                })
              }}
            />
            <label
            >
              Price
            </label>
          </div>

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