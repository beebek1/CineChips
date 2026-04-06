import moviePoster from "../../../assets/moviePoster.png";
import SigninForm from "../components/SigninForm";
import { useSigninForm } from "../hooks/useLoginForm";
import { useLogin } from "../hooks/useLogin";

export default function SigninPage() {
  const { formData, handleChange } = useSigninForm();
  const { login } = useLogin();

  return (
    <div className="flex min-h-screen bg-[#080808] overflow-hidden">
      
      {/* Left Side Poster */}
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

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md relative z-10">
          <header className="mb-12">
            <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-12 -left-4 select-none uppercase tracking-tighter">
              LOGIN
            </h1>

            <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
              Sign <span className="text-[#d4af37]">In</span>
            </h2>

            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Enter your credentials to access CineChips
            </p>
          </header>

          <SigninForm
            email={formData.email}
            password={formData.password}
            onChange={handleChange}
            onSubmit={() => login(formData)}
          />
        </div>
      </div>
    </div>
  );
}