import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import Redux hook for authentication
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import PrivateRoutes from "./routes/PrivateRoutes"; // Ensure protection for User List
import Navbar from "./components/Navbar"; 

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if logged in
  const loggedInUser = useSelector((state) => state.auth.user); // Get logged-in user's details

  return (
    <Router>
      {/* ✅ Navbar is always visible */}
      <Navbar />  

      <Routes>
        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/addUser" element={<AddUser />} /> 

        {/* Protected Route - Only Logged-in Users Can See User List */}
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/editUser/:id" element={loggedInUser ? <EditUser /> : <Navigate to="/" />} />
        </Route>

        {/* 404 Page for unknown routes */}
        <Route path="*" element={<h2 className="text-center text-red-500 mt-10">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
