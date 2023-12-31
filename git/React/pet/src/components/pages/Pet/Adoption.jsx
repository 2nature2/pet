import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Adoption = () => {


    return (
        <Container className="panel" style={{ marginTop: "50px", width: "700px" }}>
        <Form>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              신청자 이름
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="UserID"
              name="username"
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="UserID"
              name="username"
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              주소
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="UserID"
              name="username"
            />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              공고번호
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              관할 보호 센터
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          </Form>
          </Container>
    )
}

export default Adoption;