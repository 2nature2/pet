import { React, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import { Button, Container, Form, Row, Col } from "react-bootstrap"




function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/main')
      .then(response => response.text())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const join=(member)=>{
    fetch('/member/join',{
      method: 'post',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
       name:member.name,
       userid:member.userid,
       password:member.password,
       email:member.email,
       address:member.address,
       tel:member.tel
      })
    })
    .then((resp)=>resp.json())
    .then((resp)=>{
      console.log(resp)
      alert("등록완료")
    })
  }

  return (

    <Container>
      <h2>회원가입</h2>
      <JoinForm join={join}></JoinForm>
    </Container>



  );
}

export default App;
