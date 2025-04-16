import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../service/userService";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Image,
  Form,
  Spinner,
} from "react-bootstrap";

const UserDetail = () => {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate(); // dùng để quay lại
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getUser(id);
        setUser(res.data.DT);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleUpdateUser = async () => {
    try {
      const res = await updateUser(id, user);
      if (res.data.EC === 0) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại: " + res.data.EM);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Lỗi hệ thống khi cập nhật.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Không tìm thấy người dùng.</p>
      </div>
    );
  }

  return (
    <Container
      fluid
      className="py-5 bg-light vh-100 d-flex justify-content-center align-items-center"
    >
      <Card className="w-50 h-100 shadow-lg rounded-4">
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col md={12} className="text-center">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                roundedCircle
                width={120}
                height={120}
                alt="User Avatar"
              />
              <h4 className="mt-3">{user.username}</h4>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12}>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Email
                </Col>
                <Col>
                  <Form.Control value={user.email} readOnly />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Phone
                </Col>
                <Col>
                  <Form.Control
                    value={user.phone || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Role
                </Col>
                <Col>
                  {editMode ? (
                    <Form.Select
                      value={user.permission || "Viewer"}
                      onChange={(e) =>
                        setUser({ ...user, permission: e.target.value })
                      }
                    >
                      <option value="Permissions All">Permissions All</option>
                      <option value="Admin">Admin</option>
                      <option value="Contributor">Contributor</option>
                      <option value="Viewer">Viewer</option>
                    </Form.Select>
                  ) : (
                    <Form.Control
                      value={user.permission || "Viewer"}
                      readOnly
                    />
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Account Status
                </Col>
                <Col>
                  <Badge bg="success">Active</Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Created
                </Col>
                <Col>{formatDate(user.createdAt)}</Col>
              </Row>
              <Row>
                <Col xs={3} className="text-muted">
                  Address
                </Col>
                <Col>
                  <Form.Control
                    value={user.address || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col className="d-flex justify-content-end gap-2">
              <Button
                variant={editMode ? "success" : "primary"}
                onClick={async () => {
                  if (editMode) {
                    await handleUpdateUser();
                  }
                  setEditMode(!editMode); // Toggle giữa Edit và View
                }}
              >
                {editMode ? "Save" : "Edit"}
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetail;
