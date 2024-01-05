import React, { useEffect, useState } from 'react';
import WritePage from "./components/pages/Community/WritePage";
import ViewPage from "./components/pages/Community/ViewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/pages/Navigation/Navigation';
import UpdatePage from "./components/pages/Community/UpdatePage";
import Swal from "sweetalert2";
import JoinForm from './components/pages/Member/JoinForm';
import LoginForm from './components/pages/Member/LoginForm';
import PetMain from './components/pages/Pet/PetMain';

import Adoption from './components/pages/Pet/Adoption';
import UserInfo from './components/pages/Member/UserInfo';
import LoginFail from './components/pages/Member/LoginFail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PetDetail from './components/pages/Pet/PetDetail';


function App() {
  const [communityList, setCommunityList] = useState([]);
  // eslint-disable-next-line
  const [formContent, setFormContent] = useState({
    b_category: '',
    b_title: '',
    b_content: '',
    b_writer: '',
  })
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadCommunityList = async () => {
    try {
      const response = await axios.get(`/community/?page=${page}`);
      setCommunityList(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadCommunityList(page);
    };
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  const insertCommunity = (communityDTO) => {
    fetch('/community/insert', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(communityDTO)
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Network response was not ok: ${resp.status}`);
        }
        return resp.text();
      })
      .then((resp) => {
        setCommunityList(communityList.concat(
          {
            b_category: communityDTO.b_category,
            b_title: communityDTO.b_title,
            b_content: communityDTO.b_content,
            b_writer: communityDTO.b_writer
          }
        ));
        loadCommunityList();
        resetForm();
        Swal.fire({
          icon: "success",
          iconColor: "#1098f7",
          title: "작성 완료",
          confirmButtonColor: "#1098f7",
        }).then(function () {
          window.history.back();
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        console.error('Response:', error.response);
      });
  };

  const resetForm = () => {
    setFormContent({
      b_category: '',
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
        tel: member.tel
      }),
    })
      .then((resp) => resp.text())
      .then((result) => {
        if (result === 'success') {
          alert('등록완료');
          window.location.href = '/login';
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
            <Route path="/community" element={<CommunityPage lists={communityList} loadCommunityList={loadCommunityList} setCommunityList={setCommunityList} totalElements={totalElements} totalPages={totalPages} setPage={setPage} setTotalPages={setTotalPages} setTotalElements={setTotalElements}/>} />
            <Route path="/community/write" element={<WritePage insertCommunity={insertCommunity} loadCommunityList={loadCommunityList} resetForm={resetForm}/>} />
            <Route path="/community/view/:bnum" element={<ViewPage lists={communityList}/>} />
            <Route path="/community/update" element={<UpdatePage />} />
            <Route path="/pet" element={<PetMain />} />
            <Route path="/pet/detail/:desertionNo" element={<PetDetail />} />
            <Route path="/member/join" element={<JoinForm join={join} />} />
            <Route path="/member/login" element={<LoginForm />} />
            <Route path="/member/userInfo" element={<UserInfo />} />
            <Route path="/loginFail" element={<LoginFail />} />
            <Route path="/adoption" element={<Adoption/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;