import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/auth/signup'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SignIn from './pages/auth/Signin';
import SeatData from './pages/user/SeatBooking';
import { Toaster } from 'react-hot-toast';
import Forgetpassword from './pages/auth/ForgetPassword';
import DateBooking from '../src/pages/user/DateBooking';
import Footer from './components/Footer';
import Upcoming from './pages/user/Upcoming';
import Showing from './pages/user/Showing';
import MyBookings from './pages/user/MyBookings';
import Account from './pages/user/Account';
import {NotFound, ScrollToTop} from './components/Elements';

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
        <Route path="/datebooking" element={<DateBooking />}/>
        <Route path="/datebooking/:movie-name" element={<DateBooking />}/>
        <Route path="/seatbooking" element={<SeatData />}/>
        <Route path="/reset-password" element={<Forgetpassword />}/>
        <Route path="/upcoming" element={<Upcoming />}/>
        <Route path="/showing" element={<Showing />}/>
        <Route path="/bookings" element={<MyBookings />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/404" element={<NotFound />}/>
      </Routes>
      {!hideNavbar && location.pathname !=='/seatbooking' && <Footer/>}
    </>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="bg-[#222222] min-h-screen">
        <AppWrapper />
      </div>
    </Router>
  );
}

export default App;