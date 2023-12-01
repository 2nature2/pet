import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/Community.css';

const ViewPage = () => {
    const {bnum} = useParams();
    const [view, setView] = useState({
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
        viewList()
    },[])

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
            <p>글제목: {bnum}</p>
            <p>제목: {view.b_title}</p>
            <p>내용: {view.b_content}</p>
            <p>{view.b_writer}</p>
            <p>{view.b_date}</p>
            <p>{view.b_like}</p>
            <p>{view.hitcount}</p>  
        </div>
    )
}

export default ViewPage;