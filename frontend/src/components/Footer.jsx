import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] font-sans">
      {/* 1. SEPARATION LAYER: This creates the distinction you're looking for */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent shadow-[0_-10px_40px_rgba(212,175,55,0.1)]"></div>
      
      {/* 2. SUBTLE GLOW: A very faint radial light to lift the footer from the content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#d4af37]/[0.02] blur-[100px] pointer-events-none"></div>

      <div className='relative z-10 max-w-7xl mx-auto px-8'>
        
        {/* Main Footer Content */}
        <div className='py-24 grid grid-cols-1 md:grid-cols-12 gap-16'>
          
          {/* Brand Section */}
          <div className='md:col-span-4'>
            <h2 className='text-3xl font-light text-white mb-6 tracking-tighter'>
              CINE<span className='font-black text-[#d4af37]'>CHIPS</span>
            </h2>
            <p className='text-gray-500 text-sm leading-relaxed mb-8 max-w-xs'>
              Your premium destination for the latest movies and unforgettable cinema experiences.
            </p>
            
            <div className='flex space-x-3'>
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className='w-10 h-10 bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/40 rounded-full flex items-center justify-center transition-all duration-500 group'
                >
                  <Icon className='text-gray-500 group-hover:text-[#d4af37] text-sm transition-colors' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='md:col-span-2'>
            <h3 className='text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-8'>Navigation</h3>
            <ul className='space-y-4'>
              {['Home', 'Now Showing', 'Upcoming', 'My Bookings'].map((link) => (
                <li key={link}>
                  <a href="#" className='text-gray-500 hover:text-white transition-colors text-xs font-bold tracking-widest'>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className='md:col-span-2'>
            <h3 className='text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-8'>Support</h3>
            <ul className='space-y-4'>
              {['Help Center', 'Contact Us', 'Terms', 'Privacy'].map((link) => (
                <li key={link}>
                  <a href="#" className='text-gray-500 hover:text-white transition-colors text-xs font-bold tracking-widest'>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className='md:col-span-4'>
            <h3 className='text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-8'>Newsletter</h3>
            <p className='text-gray-500 text-xs mb-6 tracking-wide'>
              Subscribe for exclusive premiere invites.
            </p>
            <div className='flex p-1 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-[#d4af37]/30 transition-all'>
              <input 
                type="email" 
                placeholder="YOUR EMAIL"
                className='bg-transparent text-white placeholder-gray-700 px-4 py-3 flex-1 focus:outline-none text-[10px] font-bold tracking-widest'
              />
              <button className='bg-[#d4af37] hover:bg-[#c19d2d] text-black px-5 py-3 rounded-xl transition-all font-black text-xs active:scale-95'>
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/5 py-12'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <p className='text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]'>
              © 2026 CINECHIPS.
            </p>

            <div className='flex items-center gap-6'>
                <p className='text-gray-500 text-[9px] font-black uppercase tracking-[0.3em]'>
                  PREMIERES <span className='text-white'>SUNDAY 9PM</span>
                </p>
                <div className='h-4 w-px bg-white/10'></div>
                <div className='flex items-center gap-2'>
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>
                  <p className='text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]'>
                    Secure Server
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;