import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black border-t border-gray-800'>
      <div className='max-w-7xl mx-auto px-8'>
        
        {/* Main Footer Content */}
        <div className='py-16 grid grid-cols-1 md:grid-cols-4 gap-12'>
          
          {/* Brand Section */}
          <div className='md:col-span-1'>
            <h2 className='text-3xl font-black text-yellow-500 mb-4 tracking-tight'>
              CINE<span className='text-white'>CHIPS</span>
            </h2>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
              Your premium destination for the latest movies and unforgettable cinema experiences.
            </p>
            
            {/* Social Links */}
            <div className='flex space-x-4'>
              <a href="#" className='w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group'>
                <FaFacebookF className='text-gray-400 group-hover:text-black transition-colors' />
              </a>
              <a href="#" className='w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group'>
                <FaTwitter className='text-gray-400 group-hover:text-black transition-colors' />
              </a>
              <a href="#" className='w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group'>
                <FaInstagram className='text-gray-400 group-hover:text-black transition-colors' />
              </a>
              <a href="#" className='w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group'>
                <FaYoutube className='text-gray-400 group-hover:text-black transition-colors' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-bold text-lg mb-4 tracking-wide'>QUICK LINKS</h3>
            <ul className='space-y-3'>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Now Showing
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Upcoming Movies
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  My Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-white font-bold text-lg mb-4 tracking-wide'>SUPPORT</h3>
            <ul className='space-y-3'>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-yellow-500 transition-colors text-sm'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-white font-bold text-lg mb-4 tracking-wide'>STAY UPDATED</h3>
            <p className='text-gray-400 text-sm mb-4'>
              Get the latest movie updates every week.
            </p>
            <div className='flex'>
              <input 
                type="email" 
                placeholder="Enter your email"
                className='bg-gray-800 text-gray-300 placeholder-gray-500 px-4 py-2 rounded-l-full flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm'
              />
              <button className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-r-full transition-colors'>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 py-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            
            {/* Copyright */}
            <p className='text-gray-500 text-sm'>
              © 2026 CineChips. All rights reserved.
            </p>

            {/* Tagline */}
            <p className='text-gray-400 text-sm'>
              <span className='text-yellow-500 font-semibold'>New movies every Sunday</span> on CineChips
            </p>

            {/* Disclaimer */}
            <p className='text-gray-600 text-xs max-w-md text-center md:text-right'>
              This site does not store files. Content linked from 3rd party services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;