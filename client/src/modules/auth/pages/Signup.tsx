import moviePoster from "../../../assets/moviePoster.png";
import SignupForm from "../components/SignupForm";
import { useSignupForm } from "../hooks/useRegisterForm";
import { useRegister } from "../hooks/useRegister";

export default function SignupPage() {
  const { formData, handleChange } = useSignupForm();
  const { register } = useRegister();

  return (
    <div className="flex min-h-screen bg-[#080808] overflow-hidden">
      {/* Left Side Poster */}
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

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md relative z-10">
          <header className="mb-12">
            <h1 className="text-white/[0.03] text-[100px] font-black leading-none absolute -top-12 -left-4 select-none uppercase tracking-tighter">
              JOIN
            </h1>

            <h2 className="text-4xl font-black text-white tracking-tighter uppercase relative z-10">
              Create <span className="text-[#d4af37]">Account</span>
            </h2>

            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Start your journey with CineChips
            </p>
          </header>

          <SignupForm
            fullName={formData.fullName}
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={handleChange}
            onSubmit={(agreedToTerms) => register(formData, agreedToTerms)}
          />
        </div>
      </div>
    </div>
  );
}