import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/community" element={<CommunityPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
