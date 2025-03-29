import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const newUser = { first_name: firstName, last_name: lastName, email };
      await dispatch(addUser(newUser)).unwrap(); // Dispatch action
      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("Error registering user.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border rounded w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border rounded w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
