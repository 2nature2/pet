import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import LoginForm from './Member/LoginForm';
import { Container } from 'react-bootstrap';

function App() {
  
  const [data, setData] = useState('');

  useEffect(() => {}, []);

  // 회원가입
  const join = (member) => {
    
    fetch('/member/join', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: member.name,
        userid: member.userid,
        password: member.password,
        email: member.email,
        address: member.address,
        tel: member.tel,
      }),
    })
      .then((resp) => resp.text())
      .then((result) => {
        if (result === 'success') {
          alert('등록완료');
         
        } else {
          alert('등록실패');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={'/join'} element={<JoinForm join={join} />} />
        <Route path={'/login'} element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
