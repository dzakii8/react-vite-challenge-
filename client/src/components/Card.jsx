import Axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Card() {
  const [dataLodging, setDataLodging] = useState([])
  const [numberPage, setNumber] = useState([])
  let nav = useNavigate()

  let {number} = useParams()


  const fetchData = async () => {
    try {
      // if (number) {
      //   const { data } = await Axios.get(`https://api.dzakii.online/pub?page[size]=10&page[number]=${number}`)
      // } else {
      //   const { data } = await Axios.get(`https://api.dzakii.online/pub?page[size]=10&page[number]=1`)
      // }
        const { data } = await Axios.get(`https://api.dzakii.online/pub`)

      
      setDataLodging(data)
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <div className="my-2 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
            <Link to="/?page[number]=1"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                1
              </Link>
            </li>
            <li>
              
              <Link to="/?page[number]=2"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                2
              </Link>
            </li>
            <li>
            <Link to="/?page[number]=3"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                3
              </Link>
            </li>
            <li>
            <Link to="/?page[number]=4"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                4
              </Link>
            </li>
            <li>
            <Link to="/?page[number]=5"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                5
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>

      </div> 
      <div className="flex flex-wrap gap-10 justify-center mt-10">
        {
          dataLodging.map(el => {
            return (
              <Link to={`${el.id}`}>
              <div className="card w-44 bg-base-100 shadow-xl rounded mx-4">
                <figure className="">
                  <img
                    src={el.imgUrl}
                    className="object-cover w-full h-44"
                    alt="image"
                  />
                </figure>
                <div className="card-body h-24 min-h-max m-0 p-1.5">
                  <h6 className="card-title py-0 m-0" style={{ fontSize: 14 }}>{el.name}</h6>
                  <p className='flex-grow block' style={{ fontSize: 14 }}>{el.location}</p>
                  <p>Rp. {el.price}</p>
                </div>
              </div>
              </Link>
            )
          })
        }
      </div>
      


    </>
  )


}
export default Card