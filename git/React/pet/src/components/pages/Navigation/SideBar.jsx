
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import '../../styles/Sidebar.css';

import SidebarItem from "./SidebarItem.jsx";

const SideBar = () => {
    
    return (
        <div className="admin-sidebar">
        <NavLink to="/admin/adminPage/memberList">회원관리</NavLink>
        <NavLink to="/admin/report">신고관리</NavLink>
        {/* 추가 메뉴 아이템들 */}
      </div>
      );
    };


export default SideBar;