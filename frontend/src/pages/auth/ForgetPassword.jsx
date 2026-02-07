import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import moviePoster from '../../assets/moviePoster.png';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const changeHandler = (e) => {
        setEmail(e.target.value);
    };

    const handleReset = (e) => {
        if (!email) {
            return toast.error("Please enter your registered email");
        }
        // Add your API call here
        toast.success('Reset instructions sent to your email!');
    };

    return (
        <div className="flex min-h-screen bg-[#080808] overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Left side - Visual Poster */}
            <div className="hidden lg:flex lg:w-1/2 h-screen relative group">
                <img
                    src={moviePoster}
                    alt="movie poster"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-[3000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent"></div>
                <div className="absolute bottom-16 left-16 z-10">
                    <div className="bg-[#d4af37] h-1 w-12 mb-6"></div>
                    <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
                        Lost your <br /> Way?
                    </h2>
                    <p className="text-gray-300 text-sm font-medium tracking-widest uppercase opacity-70">
                        We'll help you get back to the show.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

                <div className="w-full max-w-md relative z-10">
                    <header className="mb-12">
                        <button 
                            onClick={() => navigate('/signin')}
                            className="flex items-center gap-2 text-gray-500 hover:text-[#d4af37] transition-colors text-[10px] font-black tracking-widest uppercase mb-8 group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                        </button>
                        
                        <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-8 -left-4 select-none uppercase tracking-tighter">RESET</h1>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
                            Forgot <span className="text-[#d4af37]">Password?</span>
                        </h2>
                        <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
                            Enter your email to receive a recovery link
                        </p>
                    </header>

                    <div className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Registered Email</label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={changeHandler}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleReset}
                            className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                        >
                            Request Reset Link <FaPaperPlane size={10} />
                        </button>

                        {/* Footer Help */}
                        <div className="pt-10 border-t border-white/5 text-center">
                            <p className="text-gray-600 text-[10px] font-black tracking-widest uppercase">
                                Still having trouble? <Link to="/support" className="text-[#d4af37] hover:underline ml-1">Contact Support</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;