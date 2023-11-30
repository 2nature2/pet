import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import axios from "axios";
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/pages/Navigation/Navigation';
import WritePage from "./components/pages/Community/WritePage";
import { useEffect, useState } from "react";

function App() {

  const [communityList, setCommunityList] = useState([])
  const [formContent, setFormContent] = useState({
    b_title: '',
    b_content: '',
    b_writer: '',
  })

  useEffect(()=> {
    loadCommunityList()
  }, [])

  const loadCommunityList = () => {
    axios.get('/')
    .then((resp) => {
      console.log(resp.data);
      setCommunityList(resp.data)
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
      alert('작성완료');
      setCommunityList((prevList) => [
        ...prevList,
        {
          b_title: communityDTO.b_title,
          b_content: communityDTO.b_content,
          b_writer: communityDTO.b_writer
        }
      ]); 
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

  return (
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/community" element={<CommunityPage/>} />
            <Route path="/write" element={<WritePage insertCommunity={insertCommunity} loadCommunityList={loadCommunityList} resetForm={resetForm}/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
