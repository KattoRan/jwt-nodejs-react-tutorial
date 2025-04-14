import React from "react";
import { Badge } from "react-bootstrap";
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
const TableRow = ({ username, email, address, joined, permission }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <tr className="hover-bg-light">
      <td className="py-3">{username}</td>
      <td className="py-3">{email}</td>
      <td className="py-3">{address}</td>
      <td className="py-3">{formatDate(joined)}</td>
      <td className="py-3">
        <td>
          <Badge bg={getBadgeColor(permission)}>{permission}</Badge>
        </td>
      </td>
      <td className="py-3 text-end">...</td>
    </tr>
  );
};
export default TableRow;
