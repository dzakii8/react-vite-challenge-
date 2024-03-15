import { useState } from 'react'
import { Link } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function Navbar() {
  const [count, setCount] = useState(0)
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
                  Sort
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none z-10">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  Categories
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none z-10">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login">
                <button>
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navbar
