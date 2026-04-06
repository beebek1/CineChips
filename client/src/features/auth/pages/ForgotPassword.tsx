import { useNavigate } from "react-router-dom";
import moviePoster from "../../../assets/moviePoster.png";
import { FaArrowLeft } from "react-icons/fa";

import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { email, handleChange } = useForgotPasswordForm();
  const { sendResetLink } = useForgotPassword();

  return (
    <div className="flex min-h-screen bg-[#080808] overflow-hidden">
      
      {/* Left Side Poster */}
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

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md relative z-10">
          <header className="mb-12">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 text-gray-500 hover:text-[#d4af37] transition-colors text-[10px] font-black tracking-widest uppercase mb-8 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </button>

            <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-8 -left-4 select-none uppercase tracking-tighter">
              RESET
            </h1>

            <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
              Forgot <span className="text-[#d4af37]">Password?</span>
            </h2>

            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Enter your email to receive a recovery link
            </p>
          </header>

          <ForgotPasswordForm
            email={email}
            onChange={handleChange}
            onSubmit={() => sendResetLink(email)}
          />
        </div>
      </div>
    </div>
  );
}