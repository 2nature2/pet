import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/Community.css';

const PetDetail = () => {
    const { desertionNo } = useParams();
    const [loading, setLoading] = useState(true);
    


    return (
        <div className="community">
            <div className="cboard">
            <p>공고번호</p>
            <p>접수일자</p>
            <p>품종</p>
            <p>성별</p>
            <p>발견장소</p>
            <p>특징</p>
            <p>상태</p>
            <p>공고기간</p>
            </div>
        </div>
    )
}

export default PetDetail;