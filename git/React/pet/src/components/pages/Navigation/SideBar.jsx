import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/Sidebar.css';

const SideBar = () => {
    
    return (
        <div className="admin-sidebar">
        <NavLink to="/admin/adminPage/memberList">회원관리</NavLink>
        <NavLink to="/admin/adminPage/report">신고관리</NavLink>
        {/* 추가 메뉴 아이템들 */}
      </div>
      );
    };


export default SideBar;