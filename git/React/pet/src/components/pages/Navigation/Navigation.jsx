import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navigation = () => {
    const handleLogout = async () => {
        try {
          // 서버의 /logout 엔드포인트에 로그아웃 요청
          const response = await fetch('/logout', {
            method: 'POST', // 또는 'GET'을 사용할 수 있습니다.
            credentials: 'include', // 필요에 따라 쿠키를 함께 전송합니다.
          });
    
          if (response.ok) {
            // 로그아웃 성공 처리
            console.log('로그아웃 성공');
          } else {
            // 로그아웃 실패 처리
            console.error('로그아웃 실패');
          }
        } catch (error) {
          console.error('로그아웃 요청 중 오류:', error.message);
        }
      };


      
    return(
        <div className='nav'>
            <NavLink className='navmenu' to="/">MAIN</NavLink>
            <NavLink className='navmenu' to="/pet">PET</NavLink>
            <NavLink className='navmenu' to="/adoption">ADOPTION</NavLink>
            <NavLink className='navmenu' to="/community">COMMUNITY</NavLink>
            <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
            <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
            <NavLink className='navmenu' to="/membet/logout">LOGOUT</NavLink>
            
            
        </div>
    );
};

export default Navigation;