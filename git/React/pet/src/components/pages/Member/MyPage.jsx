import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";



const MyPage=()=>{

    // React 상태를 사용하여 입력 필드의 값을 관리합니다.
    const [formData, setFormData] = useState({
      name: sessionStorage.getItem("name") || "",
      tel: sessionStorage.getItem("tel") || "",
      address: sessionStorage.getItem("address") || "",
      password: sessionStorage.getItem("tel") || "",
    });

    // 입력 필드의 값이 변경될 때 상태를 업데이트합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   // 폼을 제출할 때 세션 스토리지에 새로운 값을 저장합니다.
   const handleSubmit = (e) => {
    e.preventDefault();

    // 세션 스토리지에 새로운 값 저장
    sessionStorage.setItem("name", formData.name);
    sessionStorage.setItem("tel", formData.tel);
    sessionStorage.setItem("address", formData.address);
    sessionStorage.setItem("password", formData.password);

    // 추가적인 수정 로직 또는 서버에 전송 등의 작업 수행 가능
  };

    return(
        <Container className="panel" style={{ marginTop: "50px", width: "700px"}}>
          <h4>회원정보 수정</h4>
        <Form style={{border:"3px solid #ccc", padding: "20px", borderRadius:"10px"}}  onSubmit={handleSubmit}>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              이름
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.tel}
              name="tel"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              주소
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
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