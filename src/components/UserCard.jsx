import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.user); // Get the logged-in user

  const handleDelete = () => {
    if (user.id !== loggedInUser?.id) {
      alert("❌ You can only delete your own account!");
      return;
    }
    if (window.confirm(`Are you sure you want to delete your account, ${user.first_name} ${user.last_name}?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div className="bg-white border p-4 rounded shadow-md flex items-center space-x-4">
      <img src={user.avatar} alt={user.first_name} className="rounded-full w-16 h-16" />
      <div className="flex-1">
        <h2 className="text-lg font-bold">{user.first_name} {user.last_name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="space-x-2">
        {/* ✅ Only allow editing if the user is logged in and matches the card user */}
        {loggedInUser?.id === user.id && (
          <button
            onClick={() => navigate(`/editUser/${user.id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>
        )}

        {/* ✅ Only allow deletion if the user is logged in and matches the card user */}
        {loggedInUser?.id === user.id && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
