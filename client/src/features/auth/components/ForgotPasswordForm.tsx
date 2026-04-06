import { Link } from "react-router-dom";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

type Props = {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function ForgotPasswordForm({ email, onChange, onSubmit }: Props) {
  return (
    <div className="space-y-8">
      {/* Email Field */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
          Registered Email
        </label>

        <div className="relative group">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />

          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-gray-700 shadow-inner"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="w-full bg-[#d4af37] text-[#080808] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] shadow-xl shadow-[#d4af37]/10 flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
      >
        Request Reset Link <FaPaperPlane size={10} />
      </button>

      {/* Footer */}
      <div className="pt-10 border-t border-white/5 text-center">
        <p className="text-gray-600 text-[10px] font-black tracking-widest uppercase">
          Still having trouble?
          <Link to="/support" className="text-[#d4af37] hover:underline ml-1">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}