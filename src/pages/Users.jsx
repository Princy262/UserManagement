import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Get logged-in user details
import { useNavigate } from "react-router-dom"; 
import UserCard from "../components/UserCard"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.user); // Get logged-in user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page]);

  // Delete User - Only allow self-delete
  const handleDelete = async (id) => {
    if (id !== loggedInUser?.id) {
      alert("You can only delete your own account!");
      return;
    }
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Users List</h2>

      {/* Display Users using UserCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => user.id === loggedInUser?.id && navigate(`/editUser/${user.id}`)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-md ${
              page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
