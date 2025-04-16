import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import TableRow from "./TableRow";
import Filters from "./Filters";
import { getAllUsers } from "../../service/userService";

const UserManager = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("");

  const usersPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const formatted = response.data.DT.map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address,
          joined: user.createdAt,
          permission: user.permission || "Viewer",
        }));
        setUserData(formatted);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Lọc theo tìm kiếm và quyền ngay tại client-side mà không cần gọi API
  const filteredUsers = userData.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase());
    // tìm theo tên và email
    const matchesPermission =
      permissionFilter === "" || user.permission === permissionFilter;

    return matchesSearch && matchesPermission;
  });

  // Xử lý phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUserDeleted = (id) => {
    const updatedList = userData.filter((user) => user.id !== id);
    setUserData(updatedList);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">User Management</h2>

      <Filters
        onSearchChange={(keyword) => {
          setSearchValue(keyword);
          setCurrentPage(1); // reset về trang 1 khi filter
        }}
        onPermissionChange={(perm) => {
          setPermissionFilter(perm);
          setCurrentPage(1);
        }}
      />

      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Joined</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, idx) => (
            <TableRow key={idx} {...user} onUserDeleted={handleUserDeleted} />
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={idx + 1 === currentPage}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default UserManager;
