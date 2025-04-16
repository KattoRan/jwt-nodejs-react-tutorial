import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterUser } from "../../service/userService";

export const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultcheckInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidAddress: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultcheckInput);

  const isValidInputs = () => {
    let newCheck = { ...defaultcheckInput };

    if (!email) {
      toast.error("Email is required!");
      newCheck.isValidEmail = false;
    }
    if (!phone) {
      toast.error("Phone is required!");
      newCheck.isValidPhone = false;
    }
    if (!address) {
      toast.error("Phone is required!");
      newCheck.isValidPhone = false;
    }
    if (!password) {
      toast.error("Password is required!");
      newCheck.isValidPassword = false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      newCheck.isValidConfirmPassword = false;
    }

    setObjCheckInput(newCheck);

    // Nếu có bất kỳ lỗi nào, return false
    return Object.values(newCheck).every((val) => val);
  };
  const navigate = useNavigate();
  const handleCreate = async () => {
    if (!isValidInputs()) return;

    const userData = { email, phone, address, username, password };
    try {
      const res = await RegisterUser(userData);
      if (res.data.EC == 0) {
        navigate("/user-manager");
        toast.success(res.data.EM);
      } else toast.error(res.data.EM);
    } catch (error) {
      toast.error(error.response?.data?.EM || "Registration failed!");
    }
  };
  return (
    <Container
      fluid
      className="py-5 bg-light vh-100 d-flex justify-content-center align-items-center"
    >
      <Card className="w-50 h-100 shadow-lg rounded-4">
        <Card.Body className="p-4">
          <Row className="mb-5">
            <Col md={12} className="text-center">
              <Image
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                roundedCircle
                width={120}
                height={120}
                alt="User Avatar"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12}>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Email
                </Col>
                <Col>
                  <Form.Control
                    className={objCheckInput.isValidEmail ? "" : "is-invalid"}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Phone
                </Col>
                <Col>
                  <Form.Control
                    className={objCheckInput.isValidPhone ? "" : "is-invalid"}
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Address
                </Col>
                <Col>
                  <Form.Control
                    className={objCheckInput.isValidAddress ? "" : "is-invalid"}
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Username
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Password
                </Col>
                <Col>
                  <Form.Control
                    className={
                      objCheckInput.isValidPassword ? "" : "is-invalid"
                    }
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3} className="text-muted">
                  Confirm Password
                </Col>
                <Col>
                  <Form.Control
                    className={
                      objCheckInput.isValidConfirmPassword ? "" : "is-invalid"
                    }
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col className="d-flex justify-content-end gap-2">
              <Button variant="primary" onClick={() => handleCreate()}>
                Save
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
