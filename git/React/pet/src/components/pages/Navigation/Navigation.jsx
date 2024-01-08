import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navigation = ({isLogin}) => {
   


      
    return(
        <div className='nav'>
            <NavLink className='navmenu' to="/">MAIN</NavLink>
            <NavLink className='navmenu' to="/pet">PET</NavLink>
            <NavLink className='navmenu' to="/adoption">ADOPTION</NavLink>
            <NavLink className='navmenu' to="/community">COMMUNITY</NavLink>
           

            {isLogin ? (
        <>
          <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
          <NavLink className='navmenu' to="/member/logout">LOGOUT</NavLink>
        </>
      ) : (
        <>
          <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
          <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
        </>
      )}
      
            {/* <NavLink className='navmenu' to="/member/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/member/login">SIGN-IN</NavLink>
            <NavLink className='navmenu' to="/member/userInfo">UserInfo</NavLink>
            <NavLink className='navmenu' to="/membet/logout">LOGOUT</NavLink> */}
            
            
        </div>
    );
};

export default Navigation;