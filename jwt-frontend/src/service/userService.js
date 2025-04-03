import axios from "axios";

const RegisterUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/register", userData);
};
const LoginUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/login", userData);
};
export { RegisterUser, LoginUser };
