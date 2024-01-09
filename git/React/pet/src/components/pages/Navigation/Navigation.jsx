import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState, useNavigate } from 'react';
import axios from 'axios';

const Navigation = ({isLogin}) => {
   
console.log("session: ", sessionStorage.getItem("name"));

//const navigate = useNavigate();
const handleLogout = async () => {
  try {
    // 서버로 로그아웃 요청 보내기 (예: Axios 또는 Fetch 사용)
    const response = await fetch('/logout', {
      method: 'POST',
      // 필요에 따라 헤더 추가
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${yourAccessToken}`,
      // },
    });

    if (response.ok) {
      // 로그아웃 성공 시 프론트엔드에서 필요한 추가 작업 수행
      console.log('로그아웃 성공');
      // 예: 로컬 스토리지나 쿠키에서 토큰 제거
      localStorage.removeItem('accessToken');
      // 로그아웃 후 홈페이지로 이동 또는 다른 페이지로 이동하고 싶으면
      //navigate("/");
    } else {
      console.error('로그아웃 실패');
      // 실패 시 에러 처리
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
           
{/* 
            {sessionStorage.getItem("name")!="null" ? (
        <>
          <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
          <NavLink className='navmenu' to="/member/logout">LOGOUT</NavLink>
        </>
      ) : (
        <>
          <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
          <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
        </>
      )} */}
      
            <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
            <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
            <NavLink className='navmenu' to="#" onClick={handleLogout}>LOGOUT</NavLink>
            
            
        </div>
    );
};

export default Navigation;