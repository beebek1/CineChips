import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import getUserRole, { clearToken } from "./authRole";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/signin",
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const resolvedRole = await getUserRole();
      console.log("this is userrole", resolvedRole);
      setRole(resolvedRole);
      setLoading(false);
    };
    run();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <p className="text-xs tracking-widest uppercase text-gray-500">Authorizing...</p>
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    clearToken();
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const PublicRoute: React.FC = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};

export { ProtectedRoute, PublicRoute };