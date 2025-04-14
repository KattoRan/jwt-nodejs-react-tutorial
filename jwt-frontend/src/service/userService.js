import axios from "axios";

const RegisterUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/register", userData);
};
const LoginUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/login", userData);
};
const getAllUsers = async () => {
  return await axios.get("http://localhost:3000/api/user-manager"); // đường dẫn tới API của bạn
};
export { RegisterUser, LoginUser, getAllUsers };
