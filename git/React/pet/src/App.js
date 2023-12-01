
import React, { useEffect, useState } from 'react';
import WritePage from "./components/pages/Community/WritePage";
import ViewPage from "./components/pages/Community/ViewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import axios from "axios";
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import LoginForm from './Member/LoginForm';

function App() {
  const [communityList, setCommunityList] = useState([]);
  const [formContent, setFormContent] = useState({
    b_title: '',
    b_content: '',
    b_writer: '',
  })

  useEffect(()=> {
    loadCommunityList()
  }, [])

  const loadCommunityList = () => {
    axios.get('/community/')
    .then((resp) => {
      console.log("확인",resp.data.content);
      setCommunityList(resp.data.content);
    })
  }

  const insertCommunity = (communityDTO) => {
    fetch('community/insert', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(communityDTO)
    })
    .then((resp) => {
      if(!resp.ok){
        throw new Error(`Network response was not ok: ${resp.status}`);
      }
      return resp.text();
    })
    .then((resp)=> {
      console.log(resp);
      setCommunityList(communityList.concat(
        {
          b_title: communityDTO.b_title,
          b_content: communityDTO.b_content,
          b_writer: communityDTO.b_writer
        }
        )); 
      loadCommunityList();
      resetForm();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      console.error('Response:', error.response);
    });
  };

  const resetForm = () => {
    setFormContent({
      b_title: '',
      b_content: '',
      b_writer: ''
    })
  }

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
        <Route path="/" element={<MainPage/>} />
            <Route path="/community" element={<CommunityPage lists={communityList} />} />
            <Route path="/write" element={<WritePage insertCommunity={insertCommunity} loadCommunityList={loadCommunityList} resetForm={resetForm}/>} />
            <Route path="/community/view/:bnum" element={<ViewPage />} />
        <Route path={'/join'} element={<JoinForm join={join} />} />
        <Route path={'/login'} element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
)
}

export default App;
