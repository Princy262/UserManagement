import axios from "axios";

const BASE_URL = "https://reqres.in/api";

/**
 * Authenticates user with given credentials
 * @param {Object} credentials - { email, password }
 * @returns {Promise} API response containing token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: "Login failed" };
  }
};
