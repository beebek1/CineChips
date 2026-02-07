import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import moviePoster from '../../assets/moviePoster.png'

const ForgetPassword = () => {
    const navigate = useNavigate()

    const changeHandler =(e) =>{

    }

    return (
        <div className="flex h-screen">
            
        {/* left side image */}
            <div className="hidden lg:flex lg:w-1/2 h-screen overflow-hidden relative">
                <img
                src={moviePoster}
                alt="movie poster"
                className="absolute inset-0 w-full h-full object-none"
                />
            </div>

            {/* Left Side - Form */}
            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="w-full max-w-md px-8">

                    <h1 className="text-3xl font-bold text-center mb-4">
                        Forgot Password?
                    </h1>
                    <p className="text-center text-gray-500 mb-8">
                        No worries! Enter your email and we'll send you reset instructions
                    </p>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={ changeHandler()}
                            className="w-full border border-gray-300 p-3 rounded-md outline-none focus:border-[#174928] focus:ring-2 focus:ring-[#174928] focus:ring-opacity-20 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => toast.success('Reset link sent!')}
                        className="w-full bg-[#ecb403] cursor-pointer hover:bg-[#bd9002] text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide"
                    >
                        Send Reset Link
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Remember your password?{' '}
                            <span
                                onClick={() => navigate('/')}
                                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                            >
                                Sign In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword