import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterUser } from "../../service/userService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultcheckInput = {
    isValidEmail: true,
    isValidPhone: true,
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

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!isValidInputs()) return;

    const userData = { email, phone, username, password };
    try {
      const res = await RegisterUser(userData);
      if (res.data.EC == 0) {
        navigate("/login");
        toast.success(res.data.EM);
      } else toast.error(res.data.EM);
    } catch (error) {
      toast.error(error.response?.data?.EM || "Registration failed!");
    }
  };
  return (
    <div className="register_form">
      <Container>
        <Row className="justify-content-center">
          <Col sm={4} className="shadow bg-light rounded p-4">
            <h2 className="text-center">Register</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-2 mt-4" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={objCheckInput.isValidEmail ? "" : "is-invalid"}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="Phone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  className={objCheckInput.isValidPhone ? "" : "is-invalid"}
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={objCheckInput.isValidPassword ? "" : "is-invalid"}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className={
                    objCheckInput.isValidConfirmPassword ? "" : "is-invalid"
                  }
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Button className="w-100" type="submit">
                  Register
                </Button>
              </Form.Group>
              <hr />
              <Form.Group className="mt-3 text-center">
                <Button
                  as={Link}
                  to="/login"
                  className="btn-success"
                  type="submit"
                >
                  Already've an account. Login
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
