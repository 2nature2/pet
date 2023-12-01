import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import LoginForm from './Member/LoginForm';

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
        <Route path = "/" element={<MainPage/>}/>
       
        <Route path = "/community" element={<CommunityPage/>}/>
        <Route path={'/join'} element={<JoinForm join={join} />} />
        <Route path={'/login'} element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
