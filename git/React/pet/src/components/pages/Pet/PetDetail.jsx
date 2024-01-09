import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import '../../styles/Community.css';

const PetDetail = () => {
    const location = useLocation();
    const goAnimal = location.state;

    // console.log("loaction", location);
    // console.log("goanimal", goAnimal);

    return (
        <div className="community">
            <div className="cboard">
                <h3>1.동물정보</h3>
                <img src={goAnimal.popfile}></img>
                <p>공고번호 : {goAnimal.noticeNo}</p>
                <p>품종 : {goAnimal.kindCd}</p>
                <p>털색 : {goAnimal.colorCd}</p>
                <p>성별 : {goAnimal.sexCd}</p>
                <p>중성화 여부 : {goAnimal.neuterYn}</p>
                <p>특징 : {goAnimal.specialMark}</p>
                <br />
                <h3>2. 구조정보</h3>
                <p>구조일 : {goAnimal.happenDt}</p>
                <p>구조장소 : {goAnimal.happenPlace}</p>
                <p>공고기간 : {goAnimal.noticeSdt} ~ {goAnimal.noticeEdt}</p>
                <br />
                <h3>3. 동물보호센터 안내</h3>
                <p>관할보호센터명 : {goAnimal.careNm}</p>
                <p>주소 : {goAnimal.careAddr}</p>
                <p>전화번호 : {goAnimal.careTel}</p>

            </div>
        </div>
    )
}

export default PetDetail;