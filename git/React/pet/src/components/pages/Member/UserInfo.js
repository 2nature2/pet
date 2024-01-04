
import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const UserInfo = () => {
    //회원정보
    const [userInfo,setUserInfo] = useState([]);
    
    useEffect(()=>{
        console.log("UserInfo 렌더링");
      axios.get("/member/api/user")
      .then((response)=>{
        return response.data
      })
      .then(function(data){
        console.log('data: ', data) 
        setUserInfo(data);
      })
    },[]);

  return (
      <div>
          <ul>이름 : {userInfo.name}</ul>
      </div>
  );
};

export default UserInfo;