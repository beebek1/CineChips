import { Navigate, Outlet } from "react-router-dom";
import getUserRole from "./authRole";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const role = getUserRole();

    if (!role || !allowedRoles.includes(role)) {
        localStorage.removeItem("jwtToken");
        return <Navigate to="/signin" replace />;
    }

    return element;
};

const PublicRoute = () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet/>;
};

export { PublicRoute, ProtectedRoute };