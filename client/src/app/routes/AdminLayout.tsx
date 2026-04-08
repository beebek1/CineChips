import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../shared/components/AdminSidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex bg-[#080808] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-72">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;