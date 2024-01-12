import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navigation from "../Navigation/Navigation";

const LoginForm = () => {
  const [loginContent, setLoginContent] = useState({
    username: "",
    password: ""
  });



  const getValue = (e) => {
    setLoginContent({
      ...loginContent,
      [e.target.name]: e.target.value,
    });
  };




  return (
    <div>
      <Container className="panel" style={{ marginTop: "50px", width: "700px" }}>
        <Form
        action="/login"
        method="POST"
        >
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextId">
            <Form.Label column sm="2">
              UserID
            </Form.Label>
            <Form.Control
              type="text"
              onChange={getValue}
              value={loginContent.username}
              placeholder="UserID"
              name="username"
            />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              onChange={getValue}
              value={loginContent.password}
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <br />
          <div className="d-grid gap-1">
            <Button variant="secondary"  type="submit"> {/* 수정: type을 submit에서 button으로 변경 */}
              Sign In
            </Button>
          </div>
        </Form>
      </Container>
   
    </div>
  );
};

export default LoginForm;