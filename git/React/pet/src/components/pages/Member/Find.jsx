import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';


import '../../styles/Find.css';
import { getValue } from '@testing-library/user-event/dist/utils';

const Find = () =>{
    const [findState,setFindState] = useState('idfind');
    const [idContent, setIdContent] = useState({
        name:'',
        tel:''
    })

    const getValue = (e) => {
        setIdContent({
          ...idContent,
          [e.target.name]: e.target.value,
        });
      };
    const findId= async ()=>{
        try{
            const response = await axios.post(`/member/idfind`,{
                name: idContent.name,
                tel: idContent.tel
            })
            console.log("확인:" , response.data)
            if(response.data!="fail"){
                alert("회원님의 아이디는 '"+response.data+"' 입니다.");
            }
            else{
                alert("일치하는 회원정보가 없습니다.");
            }
           
            setIdContent({
                name:'',
                tel:''
            })
        }catch (error) {
            console.error('오류:', error);
          }
    }

    return(
        <div className="findtap">
        <div className="fMenu">
          <button onClick={()=>setFindState('idfind')} style={findState === 'idfind'? {backgroundColor: '#FAED7D', color: 'brown', fontWeight:'500'} : {backgroundColor: 'transparent', color: 'black', border: '1px solid black'}}>아이디 찾기</button>
          <button onClick={()=>setFindState('pwfind')} style={findState === 'pwfind'? {backgroundColor: '#FAED7D', color: 'brown',fontWeight:'500'} : {backgroundColor: 'transparent', color: 'black', border: '1px solid black'}}>비밀번호 찾기</button>
        </div>
        <div className="fboard">
          {
            findState === 'idfind'
            ?
            <div className='stateform'>
            <div className='textform'>
                <input type='text' placeholder='이름을 입력하세요' name='name' onChange={getValue} value={idContent.name}/>
                <input type='text' placeholder='전화번호를 입력하세요'  name='tel' onChange={getValue} value={idContent.tel} />
            </div>
            <Button style={{width:'120px'}} onClick={findId}>ID찾기</Button>
        </div>
        
           :
            
                <div className='stateform'>
            <div className='textform'>
                <input type='text' placeholder='아이디를 입력하세요' name='userid' onChange={getValue} value={idContent.userid}/>
                <input type='text' placeholder='이메일을 입력하세요'  name='email' onChange={getValue} value={idContent.email} />
            </div>
            <Button style={{width:'120px'}} onClick={findId}>PW 찾기</Button>
                </div>
             
          }
        </div>
      </div>
    )
}
export default Find;