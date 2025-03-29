import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: "",
  });

  // ✅ Define password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        avatar: user.avatar || null,
      };

      await dispatch(addUser(newUser));
      toast.success("User added successfully!");
      navigate("/users");
    } catch (error) {
      toast.error("Error adding user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* First Name */}
        <div>
          <label className="block font-medium">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter First Name"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Password with Eye Icon 👁️ */}
        <div className="relative">
          <label className="block font-medium">Password <span className="text-red-500">*</span></label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded pr-10"
          />
          <span 
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password with Eye Icon 👁️ */}
        <div className="relative">
          <label className="block font-medium">Confirm Password <span className="text-red-500">*</span></label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Re-enter Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded pr-10"
          />
          <span 
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Avatar (Optional) */}
        <div>
          <label className="block font-medium">Avatar URL <span className="text-gray-500">(Optional)</span></label>
          <input
            type="text"
            name="avatar"
            placeholder="Enter Avatar URL (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
