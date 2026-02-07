import { useState } from 'react';
import moviePoster from '../../assets/moviePoster.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all the fields");
    }

    try {
      const response = await toast.promise(
        loginApi(formData), {
          loading: <b>Checking Credentials</b>,
          success: (res) => <b>{res.data.message}</b>,
          error: (err) => <b>{err.response?.data?.message || "Login failed"}</b>
        }
      );

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      
      // Smooth transition to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);

    } catch (error) {
      console.error(error);
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
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent"></div>
        <div className="absolute bottom-16 left-16 z-10">
          <div className="bg-[#d4af37] h-1 w-12 mb-6"></div>
          <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
            Welcome <br /> Back
          </h2>
          <p className="text-gray-300 text-sm font-medium tracking-widest uppercase opacity-70">
            Your Cinema seat is waiting.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md relative z-10">
          <header className="mb-12">
            <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-12 -left-4 select-none uppercase tracking-tighter">LOGIN</h1>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
              Sign <span className="text-[#d4af37]">In</span>
            </h2>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Enter your credentials to access CineChips
            </p>
          </header>

          <div className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                <Link to='/reset-password' Hb className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={changeHandler}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <div 
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${rememberMe ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/10 bg-white/5'}`}
              >
                {rememberMe && <FaCheckCircle className="text-black text-[10px]" />}
              </div>
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-tight cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                Remember this session
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
            >
              Secure Login <FaArrowRight size={10} />
            </button>

            {/* Sign Up Footer */}
            <div className="text-center pt-8">
              <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                New to the chips? <Link to="/signup" className="text-[#d4af37] hover:underline ml-2">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}