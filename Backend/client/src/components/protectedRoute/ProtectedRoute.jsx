import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  // Login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role hai
  if (allowedRole && user.userType !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;