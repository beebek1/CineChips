import { useEffect, useState } from 'react';
import { FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50' 
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-8 py-4'>
        <div className='flex justify-between items-center'>
          
          {/* Left Section - Logo & Navigation */}
          <div className='flex items-center space-x-8'>
            {/* Logo */}
            <div className='flex items-center cursor-pointer group'>
              <div className='relative'>
                <h1 className='text-2xl font-black text-yellow-500 tracking-tight'>
                  CINE<span className='text-white'>CHIPS</span>
                </h1>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300'></div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <button className="relative px-4 py-2 text-yellow-500 font-semibold text-sm tracking-wider hover:text-yellow-400 transition-colors group">
                HOME
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-100 group-hover:scale-x-100 transition-transform'></span>
              </button>
 
              <button className="relative px-4 py-2 text-gray-300 font-semibold text-sm tracking-wider hover:text-yellow-500 transition-colors group">
                SHOWING
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform'></span>
              </button>

              <button className="relative px-4 py-2 text-gray-300 font-semibold text-sm tracking-wider hover:text-yellow-500 transition-colors group">
                UPCOMING
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform'></span>
              </button>

              <button className="relative px-4 py-2 text-gray-300 font-semibold text-sm tracking-wider hover:text-yellow-500 transition-colors group">
                BOOKINGS
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform'></span>
              </button>
            </div>
          </div>

          {/* Right Section - Search & Auth */}
          <div className='flex items-center space-x-4'>
            
            {/* Search Bar */}
            <div className={`flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 transition-all duration-300 ${
              scrolled ? 'w-48' : 'w-56'
            } hover:border-yellow-500 focus-within:border-yellow-500 focus-within:w-64`}>
              <FaSearch className="text-gray-400 w-4 h-4 flex-shrink-0" />
              <input 
                type="text"
                placeholder="Search movies..."
                className="bg-transparent text-gray-200 placeholder-gray-500 ml-3 w-full focus:outline-none text-sm"
              />
            </div>

            {/* Login/Profile Button */}
            {!isLoggedIn ? (
              <button
                onClick={() => console.log('Navigate to signin')}
                className='group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105 active:scale-95'
              >
                <span className='text-sm tracking-wide'>LOGIN</span>
              </button>
            ) : (
              <button className='flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-700 hover:border-yellow-500 transition-all duration-300'>
                <FaUser className='w-4 h-4 text-yellow-500' />
                <span className='text-sm font-semibold'>Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom border that appears on scroll */}
      <div className={`h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent transition-opacity duration-300 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </nav>
  );
};

export default Navbar;


//this is nosense comment