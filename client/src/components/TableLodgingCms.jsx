import axios from "axios"
import Axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function TableCms() {
  const [dataCms, setDataCms] = useState([])
  const fetchData = async () => {
    const { data } = await Axios.get("https://api.dzakii.online/lodgings?page[size]=99",{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    // console.log(data);
    setDataCms(data)
  }

  let nav = useNavigate()
  const handleDelete = async (id)=>{
    try {
      const {data} = await axios.delete(`https://api.dzakii.online/lodgings/${id}`,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      fetchData()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Facility</th>
              <th>Room Capacity</th>
              <th>Image Url</th>
              <th>Location</th>
              <th>Price</th>
              <th>Type</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {dataCms.map((el, i) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>{el.name}</td>
                  <td>{el.facility}</td>
                  <td>{el.roomCapacity}</td>
                  <td><img src={el.imgUrl} alt="imageHotel" /></td>
                  <td>{el.location}</td>
                  <td>Rp.{el.price}</td>
                  <td>{el.Type.name}</td>
                  <td>{el.User.userName}</td>
                  <td className="">
                    <Link to={`/cms/editLodging/${el.id}`}>
                    <button className="btn w-16 m-1">Edit</button>
                    </Link>
                    <Link to={`/cms/patchImg/${el.id}`}>
                    <button className="btn w-16 m-1">Change Image</button>
                    </Link>
                    <button onClick={()=>{
                      handleDelete(el.id)
                    }} className="btn w-16 m-1">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}