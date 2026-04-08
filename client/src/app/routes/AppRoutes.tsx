import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ProtectedRoute, PublicRoute } from "../guards/protectedRoute";
import NotFoundPage from "../../shared/components/NotFound";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

// User pages
import UserDashboardPage from "../../modules/domain/user/pages/userDashboardPage";
import AccountPage from "../../modules/domain/user/pages/AccountPage";
import MovieBookingDashboardPage from "../../modules/bookings/pages/MovieBookingDashboardPage";
import SeatBookingPage from "../../modules/bookings/pages/SeatBookingPage";
import MyBookingsPage from "../../modules/bookings/pages/MyBookingsPage";
import UpcomingPage from "../../modules/movies/pages/UpcomingPage";
import ShowingPage from "../../modules/movies/pages/ShowingPage";

// Admin pages
import AdminDashboardPage from "../../modules/domain/admin/dashboard/pages/AdminDashboardPage";
import MovieAdminPage from "../../modules/movies/pages/MovieAdminPage";
import HallAdminPage from "../../modules/domain/admin/halls/pages/HallAdminPage";
import ScheduleAdminPage from "../../modules/domain/admin/schedules/pages/SchedulePage";

// Auth pages
import SignIn from "../../modules/auth/pages/Signin";
import SignUp from "../../modules/auth/pages/Signup";
import Forgetpassword from "../../modules/auth/pages/ForgotPassword";

type JwtPayload = {
  role?: string;
  exp?: number;
};

const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded?.exp || decoded.exp * 1000 <= Date.now()) return null;
    return decoded.role ?? null;
  } catch {
    return null;
  }
};

// Blocks specific roles from route tree
const DenyRolesRoute: React.FC<{ deniedRoles: string[]; redirectTo: string }> = ({
  deniedRoles,
  redirectTo,
}) => {
  const role = getRoleFromToken();
  if (role && deniedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* auth-only pages (logged-in users redirected away) */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<Forgetpassword />} />
      </Route>

      {/* public user-facing pages (guest + user), but admin/org denied */}
      <Route element={<DenyRolesRoute deniedRoles={["org", "admin"]} redirectTo="/admin/dashboard" />}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserDashboardPage />} />
          <Route path="/showing" element={<ShowingPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/datebooking/:movie-id?" element={<MovieBookingDashboardPage />} />
          <Route path="/seatbooking/:movie-id?" element={<SeatBookingPage />} />
        </Route>
      </Route>

      {/* logged-in user-only pages */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Route>

      {/* admin-only pages (users and guests denied) */}
      <Route element={<ProtectedRoute allowedRoles={["org", "admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/movies" element={<MovieAdminPage />} />
          <Route path="/admin/halls" element={<HallAdminPage />} />
          <Route path="/admin/schedules" element={<ScheduleAdminPage />} />
        </Route>
      </Route>

      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;