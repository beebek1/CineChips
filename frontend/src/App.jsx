import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { ScrollToTop, NotFound } from './components/Elements';
import getUserRole from './protected//authRole';

// Auth & User Pages
import SignUp from './pages/auth/signup';
import SignIn from './pages/auth/Signin';
import Forgetpassword from './pages/auth/ForgetPassword';
import UserHome from './pages/user/Home';
import DateBooking from './pages/user/DateBooking';
import SeatData from './pages/user/SeatBooking';
import Upcoming from './pages/user/Upcoming';
import Showing from './pages/user/Showing';
import MyBookings from './pages/user/MyBookings';
import Account from './pages/user/Account';

// Admin Pages
import AdminHome from './pages/admin/Home';
import AdminMovie from './pages/admin/Movies';
import AdminHall from './pages/admin/Hall';
import AdminSchedule from './pages/admin/Schedules';
import AdminUser from './pages/admin/Users';

// USER LAYOUT
const UserLayout = () => {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/seatbooking');

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </>
  );
};

// --- 2. ADMIN LAYOUT ---
const AdminLayout = () => {
  return (
    <div className="flex bg-[#080808] min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-72"> {/* Sidebar is 72w */}
        <Outlet />
      </div>
    </div>
  );
};

function AppWrapper() {
  const role = getUserRole(); 

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password" element={<Forgetpassword />} />

        {/* --- ADMIN ROUTES (Prefixed with /admin) --- */}
        {role === "org" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="movies" element={<AdminMovie />} />
            <Route path="halls" element={<AdminHall />} />
            <Route path="schedules" element={<AdminSchedule />} />
            <Route path="users" element={<AdminUser />} />
            {/* Add more admin sub-routes here like halls, movies, etc. */}
          </Route>
        )}

        {/* --- USER ROUTES --- */}
        {role === "user" && (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/datebooking/:movie-id?" element={<DateBooking />} />
            <Route path="/seatbooking/:movie-id?" element={<SeatData />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/showing" element={<Showing />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/account" element={<Account />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#080808] min-h-screen text-white">
        <AppWrapper />
      </div>
    </Router>
  );
}

export default App;