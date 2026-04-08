import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserNavbar from "../../shared/components/UserNavbar";
import AppFooter from "../../shared/components/UserFooter";

const UserLayout: React.FC = () => {
  const location = useLocation();
  const showFooter = !location.pathname.includes("/seatbooking");

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      {showFooter && <AppFooter />}
    </>
  );
};

export default UserLayout;