import axios from "axios";

const BASE_URL = "https://reqres.in/api";

/**
 * Fetch paginated list of users
 * @param {number} page - Page number
 * @returns {Promise} API response with user data
 */
export const fetchUsers = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Failed to fetch users" };
  }
};

/**
 * Update user details
 * @param {number} userId - User ID
 * @param {Object} userData - Updated user details
 * @returns {Promise} API response with updated data
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Failed to update user" };
  }
};

/**
 * Delete a user
 * @param {number} userId - User ID
 * @returns {Promise} API response
 */
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Failed to delete user" };
  }
};
