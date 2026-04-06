import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

type Props = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (agreedToTerms: boolean) => void;
};

export default function SignupForm({
  fullName,
  email,
  password,
  confirmPassword,
  onChange,
  onSubmit,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
          Full Name
        </label>

        <div className="relative group">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
          <input
            type="text"
            placeholder="Bibek Soti"
            name="fullName"
            value={fullName}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

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

      {/* Password + Confirm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
            Password
          </label>

          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37]" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              value={password}
              onChange={onChange}
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
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
            Confirm
          </label>

          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37]" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
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

      {/* Terms */}
      <div className="flex items-center gap-3 pt-2">
        <div
          onClick={() => setAgreedToTerms(!agreedToTerms)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
            agreedToTerms ? "bg-[#d4af37] border-[#d4af37]" : "border-white/10 bg-white/5"
          }`}
        >
          {agreedToTerms && <FaCheckCircle className="text-black text-[10px]" />}
        </div>

        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
          I accept the{" "}
          <Link to="#" className="text-[#d4af37] hover:underline">
            Terms of Service
          </Link>
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={() => onSubmit(agreedToTerms)}
        className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 active:scale-95 cursor-pointer"
      >
        Initialize Account
      </button>

      {/* Footer */}
      <div className="text-center pt-6">
        <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
          Already a member?
          <Link to="/signin" className="text-[#d4af37] hover:underline ml-2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}