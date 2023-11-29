import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import MainPage from "./components/pages/Main/MainPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import Navigation from './components/pages/Navigation/Navigation';

function App() {
  return (
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/community" element={<CommunityPage/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
