import React, { useState } from 'react';
import moviePoster from '../../assets/moviePoster.png';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

export default function SignupIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.fullName || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("Confirm password didn't match");
      return;
    } else if (!agreedToTerms) {
      toast.error("Kindly agree to the terms and conditions");
      return;
    }
    try {
      const dataToSubmit = {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'user' // Defaulted to user since admin section is removed
      };

      await toast.promise(
        registerApi(dataToSubmit),
        {
          loading: <b>Creating your account...</b>,
          success: (res) => {
            setTimeout(() => {
              navigate("/signin");
            }, 1000);
            return <b>{res.data.message}</b>;
          },
        },
      );
    } catch (error) {
      const errMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errMessage);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#080808] overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left side - Visual Poster */}
      <div className="hidden lg:flex lg:w-1/2 h-screen relative group">
        <img
          src={moviePoster}
          alt="movie poster"
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent"></div>
        <div className="absolute bottom-16 left-16 z-10 max-w-md">
          <div className="bg-[#d4af37] h-1 w-12 mb-6"></div>
          <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
            The Gold <br /> Standard
          </h2>
          <p className="text-gray-300 text-sm font-medium tracking-widest uppercase opacity-70">
            Cinema Experience Redefined
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative overflow-y-auto">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md relative z-10">
          <header className="mb-12">
            <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-12 -left-4 select-none uppercase tracking-tighter">JOIN</h1>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
              Create <span className="text-[#d4af37]">Account</span>
            </h2>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Start your journey with CineChips
            </p>
          </header>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
                <input
                  type="text"
                  placeholder="Bibek Soti"
                  name="fullName"
                  value={formData.fullName}
                  onChange={changeHandler}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="bibek@cinechips.com"
                  onChange={changeHandler}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <div 
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${agreedToTerms ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/10 bg-white/5'}`}
              >
                {agreedToTerms && <FaCheckCircle className="text-black text-[10px]" />}
              </div>
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                I accept the <Link className="text-[#d4af37] hover:underline">Terms of Service</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 active:scale-95 cursor-pointer"
            >
              Initialize Account
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-6">
              <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                Already a member? <Link to="/signin" className="text-[#d4af37] hover:underline ml-2">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}