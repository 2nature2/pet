import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect } from 'react';

const Navigation = ({isLogin}) => {
   
const navigate = useNavigate();

useEffect(() => {
  
}, [])

const handleLogout = async () => {
  try {
    console.log("로그아웃")
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
           
            <div className="nav-right">
            {sessionStorage.getItem("name")==null ? (
        <>
         <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
          <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
        </>
      ) : (
        <>
        <NavLink className='navmenu' to="/member/mypage">MY-PAGE</NavLink>
          <NavLink className='navmenu' to="#" onClick={handleLogout}>LOGOUT</NavLink>
          
        </>
      )}
         </div>
        </div>
    );
};

export default Navigation;