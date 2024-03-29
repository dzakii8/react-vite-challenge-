import Axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"

export default function FormLogin() {

  let [form, setForm] = useState({
    email: "",
    password: ""
  })
  let navigate = useNavigate()
  
  const handleOnSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await Axios.post("https://api.dzakii.online/users/login", form)
      localStorage.setItem("access_token",data.access_token)
      // console.log(data);
      navigate('/cms')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={form.email}
                    onChange={(event =>{
                      setForm((prevForm)=>{
                        return {
                          ...prevForm,
                          email: event.target.value
                        }
                      })
                    })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={form.password}
                    onChange={(event =>{
                      setForm((prevForm)=>{
                        return {
                          ...prevForm,
                          password: event.target.value
                        }
                      })
                    })}
                  />
                </div>
                <Button name="Sign in"/>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}