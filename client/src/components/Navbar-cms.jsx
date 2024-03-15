import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function NavbarCms() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const handleOnLogout = () => {
    localStorage.removeItem("access_token")
    // redirect('/login')
    navigate('/login')
  }
  return (
    <section>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/">
            <a className="btn btn-ghost text-xl">L</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  Menus
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none z-10">
                  <Link to="/cms/Types">
                    <li><a>Types</a></li>
                  </Link>
                  <Link to="/cms">
                    <li><a>Lodgings</a></li>
                  </Link>

                </ul>
              </details>
            </li>
            <li>
              <Link to="/cms/add-user">
                <button>
                  Add User
                </button>
              </Link>
            </li>
            <li>
              <Link to="/cms">
                <button>
                  Back
                </button>
              </Link>
            </li>
            <li>
              <button onClick={handleOnLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default NavbarCms
