import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/signup'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SignIn from './pages/Signin';
import SeatData from './pages/SeatBooking';
import Getuser from './pages/getUser';
import { Toaster } from 'react-hot-toast';
import Forgetpassword from '../src/pages/ForgetPassword';

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/signup' || location.pathname ==='/signin' || location.pathname ==='/reset-password';

  return (
    <>
    <Toaster position='top-right'/>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/seatbooking" element={<SeatData />}/>
        <Route path="/getuser" element={<Getuser />}/>
        <Route path="/dashboard" element={<Home />}/>
        <Route path="/reset-password" element={<Forgetpassword />}/>
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <div className="bg-[#222222] min-h-screen">
        <AppWrapper />
      </div>
    </Router>
  );
}

export default App;