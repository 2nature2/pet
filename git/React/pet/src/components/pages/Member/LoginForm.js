import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
const LoginForm = () => {
//button submit 방식. 회원정보가 가져와짐
  const [loginContent, setLoginContent] = useState({
    username: "",
    password: ""
  });
const [isLogin,setIsLogin]=useState(false)

const navigate = useNavigate();
  const getValue = (e) => {
    setLoginContent({
      ...loginContent,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomSubmit = async () => {
    console.log("로그인버튼",loginContent.username)
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginContent.username,
          password: loginContent.password,
        }),
      });

      if (response.ok) {
        // 서버 요청이 성공하면 다른 동작 수행
        setIsLogin(true);
        // 이후 추가로 해야 할 작업이 있다면 여기에서 수행
      } else {
        console.error('로그인 실패:', response.status);
        // 로그인 실패 시에 대한 처리
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

 
  return (
    <div>
      <Container className="panel" style={{ marginTop: "50px", width: "700px" }}>
        <Form
         
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
            <Button variant="secondary"  onClick={handleCustomSubmit} > 
              Sign In
            </Button>
          </div>
        </Form>
        
      </Container>
    </div>
  );
};

export default LoginForm;
