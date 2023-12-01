
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

const LoginForm = () => {
  const [loginContent, setLoginContent] = useState({
    userid: "",
    password: "",
  });

  const getValue = (e) => {
    setLoginContent({
      ...loginContent,
      [e.target.name]: e.target.value,
    });
  };

//   const login = () => {
//     axios
//       .post('/login', {  
//         userid: loginContent.userid,
//         password: loginContent.password,
//       })
//       .then((resp) => resp.statusText)
//       .then((result) => {
//         if (result === "success") {
//           alert("로그인 성공");
//         }
//       });
//   };

const login = (member) => {
    const formData = new URLSearchParams();
    formData.append("userid", member.userid);
    formData.append("password", member.password);

    fetch('/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          alert('로그인 성공');
        } else {
          alert('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    const loginbtn=()=>{
        login(loginContent);
        setLoginContent({
            userid:'',
            password:''
        })
    }


  return (
    <div>
      <Container className="panel" style={{ marginTop: "50px", width: "700px" }}>
        <Form>
          <Form.Group as={Form.Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              UserID
            </Form.Label>
            <Form.Control
              type="text"
              onChange={getValue}
              value={loginContent.userid}
              placeholder="UserID"
              name="userid"
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
            <Button variant="secondary"  onClick={loginbtn}> {/* 수정: type을 submit에서 button으로 변경 */}
              Sign In
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
