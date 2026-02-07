import { useEffect, useState } from 'react';
import { FaSearch, FaUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOWING', path: '/showing' },
    { name: 'UPCOMING', path: '/upcoming' },
    { name: 'BOOKINGS', path: '/bookings' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#080808] border-b border-white/5 py-4' 
          : 'bg-transparent py-7'
      }`}
    >
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent h-40 pointer-events-none -z-10"></div>
      )}

      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
      )}

      <div className='max-w-7xl mx-auto px-8'>
        <div className='flex justify-between items-center'>
          
          <div className='flex items-center space-x-16'>
            {/* 3. Wrap Logo in a Link to return Home */}
            <Link to="/" className='flex items-center cursor-pointer select-none group'>
              <h1 className='text-2xl font-light tracking-tighter text-white'>
                CINE<span className='font-black text-[#d4af37]'>CHIPS</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                /* 4. Use Link instead of button for SEO and URL handling */
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[10px] font-black tracking-[0.3em] transition-all duration-300 cursor-pointer outline-none ${
                    location.pathname === link.path 
                      ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex items-center space-x-8'>
            <div className="hidden md:flex items-center group">
              <div className="relative flex items-center">
                <FaSearch className="absolute left-4 text-gray-500 group-focus-within:text-[#d4af37] transition-colors w-3 h-3" />
                <input 
                  type="text"
                  placeholder="SEARCH"
                  className="bg-black/60 border border-white/10 rounded-xl pl-10 pr-6 py-2.5 transition-all duration-500 focus:border-[#d4af37]/40 focus:bg-black w-44 focus:w-60 text-white placeholder-gray-600 text-[10px] font-black tracking-widest focus:outline-none cursor-text"
                />
              </div>
            </div>

            <div className="flex items-center">
              {!isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className='bg-[#d4af37] hover:bg-[#c19d2d] text-black font-black px-8 py-3 rounded-xl transition-all duration-300 text-[10px] tracking-[0.2em] shadow-lg shadow-[#d4af37]/10 active:scale-95 cursor-pointer'
                >
                  LOGIN
                </button>
              ) : (
                /* 5. Direct Account button to the bookings/profile path */
                <Link 
                  to="/account"
                  className='flex items-center space-x-3 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl border border-white/10 transition-all duration-300 group cursor-pointer'
                >
                  <div className="w-6 h-6 rounded-lg bg-[#d4af37]/20 flex items-center justify-center pointer-events-none">
                    <FaUser className='w-2.5 h-2.5 text-[#d4af37]' />
                  </div>
                  <span className='text-[10px] font-black tracking-[0.2em] uppercase'>Account</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;