import React from 'react';
import logo from '../assets/cinechipsLogo.png'
import { HiOutlineHome } from 'react-icons/hi';
import { FaUser, FaBell, FaCog } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='flex items-center'>
      <img 
        src={logo} 
        alt="logo" 
        className='w-40 h-15 ml-3 object-contain'
      />

      {/* home button */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 text-[#ffd602] p-2 hover:text-[#e6c500]">
          <FaUser className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="text-[#ffd602] p-2  hover:text-[#e6c500]">
          <FaBell className="w-5 h-5" />
        </button>
        <button className="text-[#ffd602] p-2  hover:text-[#e6c500]">
          <FaCog className="w-5 h-5" />
        </button>
      </div>

    </nav>
  )
}

export default Navbar


