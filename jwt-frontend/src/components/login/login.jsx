import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../service/userService";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const defaultcheckInput = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultcheckInput);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    let newCheck = { ...defaultcheckInput };
    setObjCheckInput(newCheck);

    if (!email) {
      toast.error("Please enter your email!");
      newCheck.isValidEmail = false;
      return;
    }
    if (!password) {
      toast.error("Please enter your password!");
      newCheck.isValidPassword = false;
      return;
    }
    if (Object.values(newCheck).every((val) => val) === false) return;
    const userData = { email, password };
    try {
      const res = await LoginUser(userData);
      if (res.data.EC == 0) {
        navigate("/home");
        toast.success(res.data.EM);
      } else toast.error(res.data.EM);
    } catch (error) {
      toast.error(error.response?.data?.EM || "Registration failed!");
    }
  };
  return (
    <div className="login_form">
      <Container>
        <Row className="justify-content-center">
          <Col sm={4} className="shadow bg-light rounded p-4">
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4 mt-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={objCheckInput.isValidEmail ? "" : "is-invalid"}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={objCheckInput.isValidPassword ? "" : "is-invalid"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember" />
              </Form.Group>
              <Form.Group>
                <Button className="w-100" type="submit">
                  Login
                </Button>
                <span>Forgot your pasword?</span>
              </Form.Group>
              <hr />
              <Form.Group className="mt-3 text-center">
                <Button
                  as={Link}
                  to="/register"
                  className="btn-success"
                  type="submit"
                >
                  Creat new user
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
