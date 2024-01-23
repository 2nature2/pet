import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Login.css";
import Navigation from "../Navigation/Navigation";

const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
              className="styles.passwordInput"
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
          <br/>
         <a href="/member/find" className="find">아이디/비밀번호 찾기</a>
        </Form>
        <br/>
        {/* <a href={KAKAO_AUTH_URL} className="kakaobtn">
       <img src={process.env.PUBLIC_URL + `assets/Kakao.png`} />
       <img src={`/img/kakaologo.png`} />
        </a> */}
      </Container>
   
    </div>
  );
};

export default LoginForm;