
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  return token ? <Outlet /> : <Navigate to="/login" />; // ✅ Redirect if no token
};

export default PrivateRoutes;
