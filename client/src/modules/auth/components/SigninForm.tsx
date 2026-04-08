import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowRight } from "react-icons/fa";

type Props = {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function SigninForm({ email, password, onChange, onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
          Email Address
        </label>

        <div className="relative group">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="bibek@cinechips.com"
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            Password
          </label>

          <Link
            to="/reset-password"
            className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest hover:underline"
          >
            Forgot?
          </Link>
        </div>

        <div className="relative group">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="••••••••"
            onChange={onChange}
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

      {/* Remember Me */}
      <div className="flex items-center gap-3 pt-2">
        <div
          onClick={() => setRememberMe(!rememberMe)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
            rememberMe ? "bg-[#d4af37] border-[#d4af37]" : "border-white/10 bg-white/5"
          }`}
        >
          {rememberMe && <FaCheckCircle className="text-black text-[10px]" />}
        </div>

        <label
          className="text-[10px] text-gray-500 font-bold uppercase tracking-tight cursor-pointer"
          onClick={() => setRememberMe(!rememberMe)}
        >
          Remember this session
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
      >
        Secure Login <FaArrowRight size={10} />
      </button>

      {/* Footer */}
      <div className="text-center pt-8">
        <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
          New to the chips?
          <Link to="/signup" className="text-[#d4af37] hover:underline ml-2">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}