import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/Community.css';
import { Button } from "react-bootstrap";

const ViewPage = () => {
    const movePage = useNavigate();
    const prevBnum = useRef(null);
    const prev = () => {
       window.history.back();
    }

    function update(){
        movePage(`/community/update`);
    }

    const {bnum} = useParams();
    const [view, setView] = useState({
        b_category: '',
        b_title: '',
        b_content: '',
        b_writer: '',
        b_date: '',
        b_like: '',
        hitcount: '',
        bnum:''
    })
    
    //setView는 객체 업데이트 => concat은 배열에 쓰는 메서드
    useEffect(()=> {
        console.log('useEffect called');
        if(bnum!==prevBnum.current){
            viewList();
            prevBnum.current = bnum;
        }
        
    },[bnum])

    const viewList = () => {
        fetch(`/community/view/${bnum}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then((resp)=> {
            if(!resp.ok){
                throw new Error(`Network response was not ok: ${resp.status}`);
            }
            return resp.json();
        })
        .then((data)=> {
            console.log("data확인",data);
            setView((prevView) => (
                {
                    ...prevView,
                    b_category: data.b_category,
                    b_title: data.b_title, 
                    b_content: data.b_content,
                    b_writer: data.b_writer,
                    b_date: data.b_date,
                    b_like: data.b_like,
                    hitcount: data.hitcount,
                    bnum: data.bnum
                }
            ))
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            console.error('Response:', error.response);
        });
    }

    return(
        <div className="vboard">
            <p>글번호: {bnum}</p>
            <p>분류: {view.b_category}</p>
            <p>제목: {view.b_title}</p>
            <p>내용: {view.b_content}</p>
            <p>작성자: {view.b_writer}</p>
            <p>날짜: {view.b_date}</p>
            <p>좋아요: {view.b_like}</p>
            <p>조회수: {view.hitcount}</p>
            <Button onClick={update} variant="info" style={{marginRight:5}}>수정</Button>
            <Button variant="danger" style={{marginRight:5}}>삭제</Button>
            <Button variant="secondary" onClick={prev}>뒤로가기</Button>
        </div>
    )
}

export default ViewPage;