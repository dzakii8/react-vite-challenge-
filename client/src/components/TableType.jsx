import Axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function TableType() {
  const [dataType, setDataType] = useState([])
  let nav = useNavigate()
  const fetchData = async () => {
    const { data } = await Axios.get("https://api.dzakii.online/types",{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    setDataType(data)
  }


  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
    <div className="mx-10">

    <Link to='/cms/addType'>
    <button className="btn">
      Add Type
    </button>
    </Link>
      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {dataType.map((el, i) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td className="">
                    <Link to={`/cms/editType/${el.id}`}>
                    <button className="btn w-16 m-1">Edit</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>

    </>
  )
}