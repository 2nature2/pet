import React, { useEffect, useState } from 'react';
import MainPage from '../Main/MainPage';

const Logout = () =>{
    // const handleLogout = async () => {
    //     try {
    //       // 서버의 /logout 엔드포인트에 로그아웃 요청
    //       const response = await fetch('/logout', {
    //         method: 'POST', // 또는 'GET'을 사용할 수 있습니다.
    //         credentials: 'include', // 필요에 따라 쿠키를 함께 전송합니다.
    //       });
    
    //       if (response.ok) {
    //         // 로그아웃 성공 처리
    //         console.log('로그아웃 성공');
    //       } else {
    //         // 로그아웃 실패 처리
    //         console.error('로그아웃 실패');
    //       }
    //     } catch (error) {
    //       console.error('로그아웃 요청 중 오류:', error.message);
    //     }
    //   };
    useEffect(()=>{
        const handleLogout = async () => {
            try {
              // 서버의 /logout 엔드포인트에 로그아웃 요청
              const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include',
              });
      
              if (response.ok) {
                // 로그아웃 성공 처리
                console.log('로그아웃 성공');
                // 여기에서 로그아웃 후에 수행할 작업을 추가할 수 있습니다.
              } else {
                // 로그아웃 실패 처리
                console.error('로그아웃 실패');
              }
            } catch (error) {
              console.error('로그아웃 요청 중 오류:', error.message);
            }
          };
      
          // 컴포넌트가 마운트될 때 로그아웃 요청 실행
          handleLogout();
    },[])

    return(
        <>
        <MainPage/>
        </>
    )

}

export default Logout;