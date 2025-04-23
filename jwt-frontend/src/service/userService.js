// src/service/userService.js
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

// Không cần token
const RegisterUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/register", userData);
};
const LoginUser = async (userData) => {
  return await axios.post("http://localhost:8085/api/login", userData);
};

// Cần token (đã được thêm tự động nhờ axiosInstance)
const getAllUsers = async () => {
  return await axiosInstance.get("/user-manager");
};

const getUser = async (id) => {
  return await axiosInstance.get(`/user-manager/${id}`);
};

const deleteUserById = async (id) => {
  return await axiosInstance.delete(`/user-manager/${id}`);
};

const updateUser = async (id, data) => {
  return await axiosInstance.put(`/user-manager/${id}`, data);
};

export {
  RegisterUser,
  LoginUser,
  getAllUsers,
  deleteUserById,
  getUser,
  updateUser,
};
