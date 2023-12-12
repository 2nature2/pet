import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import axios from "axios";
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/pages/Navigation/Navigation';
import WritePage from "./components/pages/Community/WritePage";
import { useEffect, useState } from "react";
import ViewPage from "./components/pages/Community/ViewPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdatePage from "./components/pages/Community/UpdatePage";
import Swal from "sweetalert2";

function App() {
  const [communityList, setCommunityList] = useState([]);
  const [formContent, setFormContent] = useState({
    b_category: '',
    b_title: '',
    b_content: '',
    b_writer: '',
  })

  useEffect(()=> {
    loadCommunityList();
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
        iconColor: "#06BEE1",
        title: "작성 완료",
        confirmButtonColor: "#06BEE1",
      }).then(function(){
        window.history.back();
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "warning",
        title: "글자수를 확인해주세요"
      })
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

  return (
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/community" element={<CommunityPage lists={communityList} />} />
            <Route path="/write" element={<WritePage insertCommunity={insertCommunity} loadCommunityList={loadCommunityList} resetForm={resetForm}/>} />
            <Route path="/community/view/:bnum" element={<ViewPage lists={communityList}/>} />
            <Route path="/community/update" element={<UpdatePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
