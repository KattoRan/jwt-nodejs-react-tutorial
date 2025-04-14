import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableRow from "./TableRow";
import Filters from "./Filters";
import { getAllUsers } from "../../service/userService";
const UserManager = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(); // gọi API đúng
        const formatted = response.data.map((user) => ({
          username: user.name,
          email: user.email,
          address: user.location,
          joined: user.createdAt,
          permission: user.role,
        }));
        setUserData(formatted);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-5">
      <h2 className="mb-4">User Management</h2>
      <Filters />
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Joined</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, idx) => (
            <TableRow key={idx} {...user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManager;
