import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './assets/Shopster.png'

const Header = ({ handleLogout, cart }) => {
  const navigate = useNavigate();

  const generateCart = async (event) => {
    event.preventDefault();
    try {
      navigate("/cart", { state: { cart: cart } });
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <div className='h-[30rem]'>
      <div>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">Shopster</span>
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link to="/home" className="block py-2 pr-4 pl-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to="/cart" onClick={generateCart} className="block py-2 pr-4 pl-3 ">Cart</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className='block py-2 pr-4 pl-3' >Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className='w-10 /12 container mx-auto'>
        <img src={logo} alt='logo' />
      </div>
    </div>
  )
}

export default Header