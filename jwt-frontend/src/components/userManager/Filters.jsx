import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Filters() {
  return (
    <Form className="mb-3">
      <Row className="align-items-center">
        <Col md={3}>
          <Form.Control type="text" placeholder="Search items..." />
        </Col>
        <Col md={2}>
          <Form.Select>
            <option>Permissions All</option>
            <option>Admin</option>
            <option>Contributor</option>
            <option>Viewer</option>
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
          <Button variant="warning">+ New User</Button>
        </Col>
      </Row>
    </Form>
  );
}
