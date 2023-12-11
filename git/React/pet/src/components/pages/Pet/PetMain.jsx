import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetMain = () => {
    const navigate = useNavigate();

    // const {
        
    //     noticeNo, // "경남-창원1-2023-00644"
    //     noticeSdt, // 접수일시
    //     popfile, // img
    //     happenPlace, // 발견장소
    //     kindCd, // 종류
    //     specialMark, // 특징
    //     processState, // 상태(보유중 보호중 등등..)

    // } = pets;

    return (
        <div className='community'>
            <div className='cboard'>
            <h2>기간이 얼마 남지 않은 아이들이에요.</h2>
            </div>
            
        </div>
    )
}

export default PetMain;