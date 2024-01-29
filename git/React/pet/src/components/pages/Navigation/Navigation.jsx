import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState } from 'react';

const Navigation = ({isLogin,handleLogout}) => {
   
const navigate = useNavigate();

const Logout=()=>{
  handleLogout();
}



    return(

      <div className='nav'>
      <NavLink className='navmenu' to="/">MAIN</NavLink>
      <NavLink className='navmenu' to="/pet">PET</NavLink>
      <NavLink className='navmenu' to="/community">COMMUNITY</NavLink>
      <div className="nav-right">
        {!isLogin ? (
          <>
            <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
          </>

        ) : (
          <>
            {sessionStorage.getItem("role") === "ROLE_ADMIN" ? (
              <NavLink className='navmenu' to="/admin/adminpage/memberlist">ADMIN</NavLink>
            ) : (
              <NavLink className='navmenu' to="/member/mypage">MY-PAGE</NavLink>

            )}
            <NavLink className='navmenu' to="#" onClick={Logout}>LOGOUT</NavLink>
          </>
        )}
      </div>
    </div>

    );
};

export default Navigation;