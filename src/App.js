import { React, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import LoginForm from './Member/LoginForm';
import { Container } from "react-bootstrap"

import Navigation from './components/Navigation';


function App() {

  
  const [data, setData] = useState('');

  useEffect(() => {
   
  }, []);

  //회원가입
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
    .then((resp)=>{
      console.log("resp",resp)
      alert("등록완료")
      
    }) 
  }

  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
       
        <Route  path={"/join"} element ={<JoinForm join={join} />}> </Route>
        <Route path={"/login"} element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
