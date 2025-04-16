/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { deleteUserById } from "../../service/userService";

const getBadgeColor = (role) => {
  switch (role) {
    case "Admin":
      return "danger";
    case "Contributor":
      return "info";
    case "Viewer":
      return "secondary";
    default:
      return "light";
  }
};

const TableRow = ({
  id,
  username,
  email,
  address,
  joined,
  permission,
  onUserDeleted,
}) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/user-manager/${id}`);
  };
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xoá người dùng này?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUserById(id);
      alert("Xoá thành công!");
      onUserDeleted(id); // báo cho component cha xoá khỏi danh sách
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td className="py-3">{username}</td>
      <td className="py-3">{email}</td>
      <td className="py-3">{address}</td>
      <td className="py-3">{formatDate(joined)}</td>
      <td className="py-3">
        <Badge bg={getBadgeColor(permission || "Viewer")}>
          {permission || "Viewer"}
        </Badge>
      </td>
      <td className="py-3 text-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            as="span"
            bsPrefix="custom-toggle"
            style={{ cursor: "pointer" }}
            id="dropdown-custom"
          >
            <BsThreeDots />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleViewDetail(id)}>
              Chi tiết
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleDeleteUser()}
              className="text-danger"
            >
              Xoá
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default TableRow;
