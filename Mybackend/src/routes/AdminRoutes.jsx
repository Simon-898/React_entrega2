import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { loading, isAdmin } = useAuth();
  if (loading) return null; // o spinner
  return isAdmin ? children : <Navigate to="/login" replace />;
}
