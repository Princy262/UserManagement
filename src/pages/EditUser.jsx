import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/usersSlice";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state) =>
    state.users.users.find((u) => u.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: parseInt(id), data: formData }));
    navigate("/users");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full mb-2"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
