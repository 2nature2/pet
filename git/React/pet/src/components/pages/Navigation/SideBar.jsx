
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import '../../styles/Sidebar.css';

import SidebarItem from "./SidebarItem.jsx";

<<<<<<< HEAD
const SideBar = () => {
    
    return (
        <div className="admin-sidebar">
        <NavLink to="/admin/adminPage/memberList">회원관리</NavLink>
        <NavLink to="/admin/adminPage/reportList">신고관리</NavLink>
        {/* 추가 메뉴 아이템들 */}
      </div>
      );
    };
=======
function SideBar() {

  const menus = [
    { name: "회원 관리", path: "/admin/memberList" },
    { name: "신고 관리", path: "/admin/report" }
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem
              menu={menu}
            />
          </Link>
        );
      })}
    </div>
  );
}
>>>>>>> 063c3e1b7820fe244051ec9e30316bbc36ea2102

export default SideBar;