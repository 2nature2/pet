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
                <p>{goAnimal.noticeNo}</p>
                <img src={goAnimal.popfile}></img>
                <p>{goAnimal.kindCd}</p>
                <p>{goAnimal.colorCd}</p>
                <p>{goAnimal.sexCd}</p>
                <p>{goAnimal.neuterYn}</p>
                <p>{goAnimal.specialMark}</p>
                <p>{goAnimal.happenDt}</p>
                <p>{goAnimal.happenPlace}</p>
                <p>{goAnimal.noticeSdt}</p>
                <p>{goAnimal.noticeEdt}</p>
                <p>{goAnimal.careNm}</p>
                <p>{goAnimal.careAddr}</p>
                <p>{goAnimal.careTel}</p>

            </div>
        </div>
    )
}

export default PetDetail;