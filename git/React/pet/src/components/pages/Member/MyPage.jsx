import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


const MyPage=()=>{
    return(
        <Container className="panel" style={{ marginTop: "50px", width: "700px"}}>
          <h4>회원정보 수정</h4>
        <Form style={{border:"3px solid #ccc", padding: "20px", borderRadius:"10px"}}>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              이름
            </Form.Label>
            <Form.Control
              type="text"
              value={sessionStorage.getItem("name")}
              name="name"
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Form.Control
              type="text"
              value={sessionStorage.getItem("tel")}
              name="tel"
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              주소
            </Form.Label>
            <Form.Control
              type="text"
              value={sessionStorage.getItem("address")}
              name="address"
            />
          </Form.Group>

          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Form.Control
              type="text"
              value={sessionStorage.getItem("tel")}
              name="password"
            />
          </Form.Group>
          <Button variant="secondary"  type="submit">
              수정
            </Button>
          </Form>

          </Container>
    )
}
export default MyPage;