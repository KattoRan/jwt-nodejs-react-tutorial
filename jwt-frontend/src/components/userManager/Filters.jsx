import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Filters = ({ onSearchChange, onPermissionChange }) => {
  const navigate = useNavigate();

  const [userSearch, setUserSearch] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("");

  const handleCreateUser = () => {
    navigate(`/user-manager/create-user`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setUserSearch(value);
    onSearchChange && onSearchChange(value); // nếu có props callback thì gọi
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;
    setPermissionFilter(value);
    onPermissionChange && onPermissionChange(value); // callback filter
  };

  return (
    <Form className="mb-3">
      <Row className="align-items-center">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={userSearch}
            onChange={handleSearchChange}
          />
        </Col>

        <Col md={2}>
          <Form.Select
            value={permissionFilter}
            onChange={handlePermissionChange}
          >
            <option value="">Permissions All</option>
            <option value="Admin">Admin</option>
            <option value="Contributor">Contributor</option>
            <option value="Viewer">Viewer</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select>
            <option>Joined Anytime</option>
          </Form.Select>
        </Col>

        <Col className="d-flex justify-content-end gap-2">
          <Button variant="secondary" className="me-2">
            Export
          </Button>
          <Button variant="warning" onClick={handleCreateUser}>
            + New User
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
