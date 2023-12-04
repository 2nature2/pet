import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetMain = ({pets}) => {
    const navigate = useNavigate();

    const {
        
        noticeNo, // "경남-창원1-2023-00644"
        noticeSdt, // 접수일시
        popfile, // img
        happenPlace, // 발견장소
        kindCd, // 종류
        specialMark, // 특징
        processState, // 상태(보유중 보호중 등등..)

    } = pets;

    return (
        <div>
            
        </div>
    )
}

export default PetMain;