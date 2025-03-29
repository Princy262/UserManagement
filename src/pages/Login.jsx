import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/usersSlice"; // Import loginUser action

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users); // Get error from Redux state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap(); // Dispatch login action
      navigate("/users"); // Redirect to users page
    } catch (err) {
      alert("Invalid email or password!"); // Show error if login fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <button
          type="button"
          onClick={() => navigate("/adduser")}
          className="w-full bg-gray-500 mt-4 text-white p-2 rounded"
        >
          New User
        </button>
      </div>
    </div>
  );
};

export default Login;
