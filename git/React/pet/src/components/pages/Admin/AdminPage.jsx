import { NavLink } from "react-router-dom";
import SideBar from "../Navigation/SideBar";
import MemberList from "./MemberList";
import ReportList from "./ReportList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../../styles/Sidebar.css';





const AdminPage=()=>{
  
    
    return(
        <>
 
 <div className="admin-page">
      <SideBar />

    </div>
        </>
    )
}

export default AdminPage;