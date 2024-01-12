import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";



const MyPage=()=>{

    // React 상태를 사용하여 입력 필드의 값을 관리합니다.
    const [formData, setFormData] = useState({
      name: sessionStorage.getItem("name") || "",
      tel: sessionStorage.getItem("tel") || "",
      nickname: sessionStorage.getItem("nickname") || "",
      userid: sessionStorage.getItem("userid") || "",
      email: sessionStorage.getItem("email") || "",
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
    
    // 추가적인 수정 로직 또는 서버에 전송 등의 작업 수행 가능
    axios.post("/member/memberupdate", formData)
    .then((response)=>{
      if(response.data=="success"){
        alert("회원정보 수정 완료")
        sessionStorage.setItem("name", formData.name);
         sessionStorage.setItem("tel", formData.tel);
         sessionStorage.setItem("nickname", formData.nickname);
        sessionStorage.setItem("userid", formData.userid);
        sessionStorage.setItem("email", formData.email);

        window.location.href = '/'
      }else{
        alert("회원정보 수정 실패")
      }
    })
    .catch((error) => {
      console.error('AxiosError:', error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    });
  };

    return(
        <Container className="panel" style={{ marginTop: "50px", width: "700px"}}>
          <h4>회원정보 수정</h4>
        <Form style={{border:"3px solid #ccc", padding: "20px", borderRadius:"10px"}}  onSubmit={handleSubmit}>
          <Form.Group as={Form.Row} className="mb-3" >
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
          <Form.Group as={Form.Row} className="mb-3">
            <Form.Label column sm="2">
              아이디
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.userid}
              name="userid"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3">
            <Form.Label column sm="2">
              닉네임
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.nickname}
              name="nickname"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" >
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
          <Form.Group as={Form.Row} className="mb-3" >
            <Form.Label column sm="2">
              이메일
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.email}
              name="email"
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