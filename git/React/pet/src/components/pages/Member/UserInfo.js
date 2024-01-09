
import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const UserInfo = () => {
    //회원정보
    const [userInfo,setUserInfo] = useState([]);
    
    // useEffect(()=>{
    //     console.log("UserInfo 렌더링");
    //   axios.get("/member/api/user")
    //   .then((response) => {
    //     // 서버 응답에서 사용자 정보를 가져와서 업데이트
    //     setUserInfo(response.data);
    //     console.log("유저이름 : ",userInfo)
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching user info:', error);
    //   })
    // },[]);

  return (
      <div>
          {/* <ul>이름 : {userInfo.name}</ul> */}
         <ul>이름 : {sessionStorage.getItem("name")}</ul> 
      </div>
  );
};

export default UserInfo;