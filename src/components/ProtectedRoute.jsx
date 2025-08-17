// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user); // assuming you store user in Redux

  if (!user) {
    return <Navigate to="/" replace />; // redirect to Home if not logged in
  }

  return children;
};

export default ProtectedRoute;
