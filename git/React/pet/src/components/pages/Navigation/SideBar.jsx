
import React from "react";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem.jsx";

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

export default SideBar;