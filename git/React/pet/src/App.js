import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import { Button, Container, Form, Row, Col } from "react-bootstrap"



=======
import axios from "axios";
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/pages/Navigation/Navigation';
import WritePage from "./components/pages/Community/WritePage";
import { useEffect, useState } from "react";
>>>>>>> 616481e280bb49214379d4b056e76cf784f3e248

function App() {

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  const [communityList, setCommunityList] = useState([])
=======
  const [communityList, setCommunityList] = useState([]);
>>>>>>> 48349d94f89ab07720760499ffa895ba88b7739d
  const [formContent, setFormContent] = useState({
    b_title: '',
    b_content: '',
    b_writer: '',
  })

  useEffect(()=> {
    loadCommunityList()
  }, [])

  const loadCommunityList = () => {
    axios.get('community/')
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
>>>>>>> 616481e280bb49214379d4b056e76cf784f3e248
    })
  }

  return (
<<<<<<< HEAD

    <Container>
      <h2>회원가입</h2>
      <JoinForm join={join}></JoinForm>
    </Container>



=======
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/community" element={<CommunityPage lists={communityList}/>} />
            <Route path="/write" element={<WritePage insertCommunity={insertCommunity} loadCommunityList={loadCommunityList} resetForm={resetForm}/>} />
          </Routes>
      </BrowserRouter>
>>>>>>> 616481e280bb49214379d4b056e76cf784f3e248
  );
}

export default App;
