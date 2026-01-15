import { useEffect, useState } from 'react';
import logo from '../assets/cinechipsLogo.svg'
import { FaSearch } from "react-icons/fa";
// import EasyButton from '../components/BtnCompo';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='flex justify-between items-center'>
      <div className='flex items-center '>
        <img 
          src={logo} 
          alt="logo" 
          className='w-40 h-15 ml-5 object-contain'
        />

        {/* buttons */}
        <div className="flex ml-6 items-center space-x-5">

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
      </div>

      {/* search bar */}
      <div className='flex space-x-3 items-center'>
        <div className="flex items-center w-60 h-10 bg-[#434343] px-3 py-2">
          <FaSearch className="text-[#ffd602] w-4 h-4" />

          <input 
            type="text"
            placeholder="Search.."
            style={{fontFamily:'Saira'}}
            className="text-[#92813b] ml-3 w-full placeholder-[#92813b] 
                      focus:outline-none font-saira"
          />
        </div>

        {/* login button */}
        {/* {!isLoggedIn && */}
          <button
            onClick={() => navigate("/signin")}
            className='bg-[#ffd602] h-10 w-20 mr-5'
            style={{fontFamily:'Saira'}}
          >
            LOGIN
          </button>
        {/* } */}
     </div>
    </nav>
  )
}

export default Navbar
