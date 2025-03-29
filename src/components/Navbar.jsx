import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  console.log("Token in Navbar:", token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");  // Navigates to Login Page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold">User Management</h1>

      {/* Center - Navigation Links */}
      {token && (
        <div className="space-x-4">
          <Link to="/" className={`${location.pathname === "/" ? "font-bold" : ""}`}>Home</Link>
          <Link to="/users" className={`${location.pathname === "/users" ? "font-bold" : ""} `}>Users List</Link>
          <Link to="/add-user" className={`${location.pathname === "/add-user" ? "font-bold" : ""}`}>New User</Link>
        </div>
      )}

      {/* Right Side - Home and Logout Button */}
      {/* <div className="space-x-4">
        <button 
          onClick={handleHome} 
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Home
        </button>

        {token && (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
