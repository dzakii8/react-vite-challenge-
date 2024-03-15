import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function FormAddUser() {
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  })
  let nav = useNavigate()
  const handleOnSubmit = async (e) => {
    // console.log(input)
    e.preventDefault()
    nav('/cms')
    // console.log(input);
    try {
      const data = await axios.post("https://api.dzakii.online/users/add-user", input, { headers: { Authorization: `Bearer ${localStorage.access_token}` } })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col m-10">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        Add User
      </h5>
      <form onSubmit={handleOnSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="userName"
            value={input.userName}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  userName: e.target.value
                }
              })
            }}
            id="floating_username"
            className="block py-  2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label>
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  email: e.target.value
                }
              })
            }}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  password: e.target.value
                }
              })
            }}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label
          >
            Password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    phoneNumber: e.target.value
                  }
                })
              }}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              value={input.address}
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    address: e.target.value
                  }
                })
              }}
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
            >
              Address
            </label>
          </div>
        </div>
        <Button name="Create User" />
      </form>
    </div>
  )
}