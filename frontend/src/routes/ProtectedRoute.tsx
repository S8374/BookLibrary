// ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../component/Provider/authProvider";

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (!currentUser) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
