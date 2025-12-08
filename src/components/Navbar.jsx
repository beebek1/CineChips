import React from 'react';
import logo from '../assets/cinechipsLogo.png'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='flex items-center'>
      <img 
        src={logo} 
        alt="logo" 
        className='w-40 h-15 ml-5 mt-3 object-contain'
      />

      {/* buttons */}
      <div className="flex ml-6 mt-3 items-center space-x-5">
        <button className="flex items-center space-x-2 text-[#ffd602] p-2 hover:text-[#e6c500]">
          <span style={{fontFamily:'Saira'}} className='text-sm'>HOME</span>

        </button>
        <button className="flex items-center space-x-2 text-[#ffd602] p-2 hover:text-[#e6c500]">
          <span style={{fontFamily:'Saira'}} className='text-sm'>SHOWING</span>
        </button>

        <button className="flex items-center space-x-2 text-[#ffd602] p-2 hover:text-[#e6c500]">
          <span style={{fontFamily:'Saira'}} className='text-sm'>DELAYS</span>
        </button>
      </div>

      {/* search bar */}
      <div>
        <FaSearch className="text-[#ffd602]"/>

        <input 
          type="text"
          placeholder="Search"
          className=" text-[#ffd602] ml-3 w-full placeholder-[#e6c500] focus:outline-none font-saira"
        />
      </div>



    </nav>
  )
}

export default Navbar






