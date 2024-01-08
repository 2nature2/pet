import React from "react";

const Pet = ({ noticeNo, popfile, kindCd, colorCd, sexCd, neuterYn, specialMark, happenDt, happenPlace, noticeSdt, noticeEdt, careNm, careAddr, careTel }) => {
    return (
        <div>
            <h2>{noticeNo}</h2>
            <img>{popfile}</img>
            <p>{kindCd}</p>
            <p>{colorCd}</p>
            <p>{sexCd}</p>
            <p>{neuterYn}</p>
            <p>{specialMark}</p>
            <hr />
            <p>{happenDt}</p>
            <p>{happenPlace}</p>
            <p>{noticeSdt}{noticeEdt}</p>
            <hr />
            <p>{careNm}</p>
            <p>{careAddr}</p>
            <p>{careTel}</p>

            {/* 1. 동물 정보
            공고번호 // noticeNo
            품종 : 보더 콜리 // kindCd
            털색 : 검 흰  // colorCd
            성별 : f = 암컷 // sexCd
            중성화 여부 : 미상? // neuterYn
            특징 : 목줄 + 리드줄 ~~ // specialMark

            2. 구조정보
            구조일: 2024-01-08 // happenDt
            구조장소 : 내서업 산책로 // happenPlace
            공고기간 : 2024-01-08 ~ 2024-01-18 // noticeSdt // noticeEdt

            3. 동물보호센터 안내
            관할보호센터명 : 마산유기동물보호소  // careNm
            주소 : 경상남도 창원시 지산2길 139-112 // careAddr
            전화번호 : 055-225- // careTel */}
        </div>

    );
};

export default Pet;