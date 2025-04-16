import axios from "axios";

const RegisterUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/register", userData);
};
const LoginUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/login", userData);
};
const getAllUsers = async () => {
  return await axios.get("http://localhost:8085/api/user-manager"); // đường dẫn tới API của bạn
};
const getUser = async (id) => {
  return await axios.get(`http://localhost:8085/api/user-manager/${id}`);
};
const deleteUserById = async (id) => {
  return await axios.delete(`http://localhost:8085/api/user-manager/${id}`);
};
const updateUser = async (id, data) => {
  return await axios.put(`http://localhost:8085/api/user-manager/${id}`, data);
};
export {
  RegisterUser,
  LoginUser,
  getAllUsers,
  deleteUserById,
  getUser,
  updateUser,
};
