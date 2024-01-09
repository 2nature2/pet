import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState,  } from 'react';
import axios from 'axios';

const Navigation = ({isLogin}) => {
   
console.log("session: ", sessionStorage.getItem("name"));

const navigate = useNavigate();
const handleLogout = async () => {
  try {
    console.log("로그아웃")
    // 서버로 로그아웃 요청 보내기 (예: Axios 또는 Fetch 사용)
    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('로그아웃 성공');

      //로컬 스토리지에서 토큰 제거
      sessionStorage.removeItem('name');
      navigate("/")
     // window.location.href("/")
    } else {
      console.error('로그아웃 실패');
    }
  } catch (error) {
    console.error('로그아웃 중 오류 발생', error);
  }
};
      
    return(
        <div className='nav'>
            <NavLink className='navmenu' to="/">MAIN</NavLink>
            <NavLink className='navmenu' to="/pet">PET</NavLink>
            <NavLink className='navmenu' to="/adoption">ADOPTION</NavLink>
            <NavLink className='navmenu' to="/community">COMMUNITY</NavLink>
           

            {sessionStorage.getItem("name")==null ? (
        <>
         <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
          <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
        </>
      ) : (
        <>
        <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
          <NavLink className='navmenu' to="#" onClick={handleLogout}>LOGOUT</NavLink>
          
        </>
      )}
      
            {/* <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
            <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
            <NavLink className='navmenu' to="#" onClick={handleLogout}>LOGOUT</NavLink> */}
            
            
        </div>
    );
};

export default Navigation;