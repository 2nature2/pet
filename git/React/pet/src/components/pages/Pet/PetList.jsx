import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import '../../styles/Pet.css';

const PetList = () => {

    const [data, setData] = useState([]); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSido, setSelectedSido] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const itemsPerPage = 12;

    const navigateToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSidoChange = (event) => {
        setSelectedSido(event.target.value);
        setSelectedCity('');  
    };
    
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const getCityOptions = (selectedSido) => {
        switch (selectedSido) {
            case '6110000':
                return (
                    <>
                        <option value='6119999'>가정보호</option>
                        <option value='3220000'>강남구</option>
                        <option value='3240000'>강동구</option>
                        <option value='3080000'>강북구</option>
                        <option value='3150000'>강서구</option>
                        <option value='3200000'>관악구</option>
                        <option value='3040000'>광진구</option>
                        <option value='3160000'>구로구</option>
                        <option value='3170000'>금천구</option>
                        <option value='3100000'>노원구</option>
                        <option value='3090000'>도봉구</option>
                        <option value='3050000'>동대문구</option>
                        <option value='3190000'>동작구</option>
                        <option value='3130000'>마포구</option>
                        <option value='3120000'>서대문구</option>
                        <option value='6119998'>서울특별시</option>
                        <option value='3210000'>서초구</option>
                        <option value='3030000'>성동구</option>
                        <option value='3070000'>성북구</option>
                        <option value='3230000'>송파구</option>
                        <option value='3140000'>양천구</option>
                        <option value='3180000'>영등포구</option>
                        <option value='3020000'>용산구</option>
                        <option value='3110000'>은평구</option>
                        <option value='3000000'>종로구</option>
                        <option value='3010000'>중구</option>
                        <option value='3060000'>중랑구</option>
                    </>
                )
            // 부산
            case '6260000':
                return (
                    <>
                        <option value='3360000'>강서구</option>
                        <option value='3350000'>금정구</option>
                        <option value='3400000'>기장군</option>
                        <option value='3310000'>남구</option>
                        <option value='3270000'>동구</option>
                        <option value='3300000'>동래구</option>
                        <option value='3290000'>부산진구</option>
                        <option value='3320000'>북구</option>
                        <option value='3390000'>사상구</option>
                        <option value='3340000'>사하구</option>
                        <option value='3260000'>서구</option>
                        <option value='3380000'>수영구</option>
                        <option value='3370000'>연제구</option>
                        <option value='3280000'>영도구</option>
                        <option value='3250000'>중구</option>
                        <option value='3330000'>해운대구</option>
                    </>
                )
            // 대구
            case '6270000':
                return (
                    <>
                        <option value='5141000'>군위군</option>
                        <option value='3440000'>남구</option>
                        <option value='3470000'>달서구</option>
                        <option value='3480000'>달성군</option>
                        <option value='3420000'>동구</option>
                        <option value='3450000'>북구</option>
                        <option value='3430000'>서구</option>
                        <option value='3460000'>수성구</option>
                        <option value='3410000'>중구</option>
                    </>
                )
            // 인천광역시
            case '6280000':
                return (
                    <>
                        <option value='3570000'>강화군</option>
                        <option value='3550000'>계양구</option>
                        <option value='3530000'>남동구</option>
                        <option value='3500000'>동구</option>
                        <option value='3150000'>미추홀구</option>
                        <option value='3540000'>부평구</option>
                        <option value='3560000'>서구</option>
                        <option value='3520000'>연수구</option>
                        <option value='3580000'>옹진군</option>
                        <option value='3490000'>중구</option>
                    </>
                )        
            // 광주광역시
            case '6290000':
                return (
                    <>
                        <option value='3630000'>광산구</option>
                        <option value='6299998'>광주광역시</option>
                        <option value='3610000'>남구</option>
                        <option value='3590000'>동구</option>
                        <option value='3620000'>북구</option>
                        <option value='3600000'>서구</option>
                    </>
                )
            // 세종특별자치시
            case '5690000':
                return (
                    <>
                        <option value=''>없음</option>
                    </>
                );
            // 대전광역시
            case '6300000':
                return (
                    <>
                        <option value='3680000'>대덕구</option>
                        <option value='3640000'>동구</option>
                        <option value='3660000'>서구</option>
                        <option value='3670000'>유성구</option>
                        <option value='3650000'>중구</option>
                    </>
                )
            // 울산광역시
            case '6310000':
                return (
                    <>
                        <option value='3700000'>남구</option>
                        <option value='3710000'>동구</option>
                        <option value='3720000'>북구</option>
                        <option value='3730000'>울주군</option>
                        <option value='3690000'>중구</option>
                    </>
                )
            // 경기도
            case '6410000':
                return (
                    <>
                        <option value='4160000'>가평군</option>
                        <option value='3940000'>고양시</option>
                        <option value='3970000'>과천시</option>
                        <option value='3900000'>광명시</option>
                        <option value='5540000'>광주시</option>
                        <option value='3980000'>구리시</option>
                        <option value='4020000'>군포시</option>
                        <option value='5630000'>기흥구</option>
                        <option value='4090000'>김포시</option>
                        <option value='3990000'>남양주시</option>
                        <option value='3920000'>동두천시</option>
                        <option value='3860000'>부천시</option>
                        <option value='3780000'>성남시</option>
                        <option value='3740000'>수원시</option>
                        <option value='4010000'>시흥시</option>
                        <option value='3930000'>안산시</option>
                        <option value='4080000'>안성시</option>
                        <option value='3830000'>안양시</option>
                        <option value='5590000'>양주시</option>
                        <option value='4170000'>양평군</option>
                        <option value='5700000'>여주시</option>
                        <option value='4140000'>연천군</option>
                        <option value='4000000'>오산시</option>
                        <option value='4050000'>용인시</option>
                        <option value='4030000'>의왕시</option>
                        <option value='3820000'>의정부시</option>
                        <option value='4070000'>이천시</option>
                        <option value='4060000'>파주시</option>
                        <option value='3910000'>평택시</option>
                        <option value='5600000'>포천시</option>
                        <option value='4040000'>하남시</option>
                        <option value='5530000'>화성시</option>
                    </>
                )
            // 강원특별자치도
            case '6530000':
                return (
                    <>
                        <option value='4201000'>강릉시</option>
                        <option value='4341000'>고성군</option>
                        <option value='4211000'>동해시</option>
                        <option value='4241000'>삼척시</option>
                        <option value='4231000'>속초시</option>
                        <option value='4321000'>양주군</option>
                        <option value='4351000'>양양군</option>
                        <option value='4271000'>영월군</option>
                        <option value='4191000'>원주시</option>
                        <option value='4331000'>인제군</option>
                        <option value='4291000'>정선군</option>
                        <option value='4301000'>철원군</option>
                        <option value='4181000'>춘천시</option>
                        <option value='4221000'>태백시</option>
                        <option value='4281000'>평창군</option>
                        <option value='4251000'>홍천군</option>
                        <option value='4311000'>화천군</option>
                        <option value='4261000'>횡성군</option>
                    </>
                )
            // 충청북도
            case '6430000':
                return (
                    <>
                        <option value='4460000'>괴산군</option>
                        <option value='4480000'>단양군</option>
                        <option value='4420000'>보은군</option>
                        <option value='4440000'>영동군</option>
                        <option value='4430000'>옥천군</option>
                        <option value='4470000'>음성군</option>
                        <option value='4400000'>제천시</option>
                        <option value='5570000'>증평군</option>
                        <option value='4450000'>진천군</option>
                        <option value='5710000'>청주시</option>
                        <option value='4390000'>충주시</option>
                    </>
                )
            // 충청남도
            case '6440000':
                return (
                    <>
                        <option value='5580000'>계룡시</option>
                        <option value='4500000'>공주시</option>
                        <option value='4550000'>금산군</option>
                        <option value='4540000'>논산시</option>
                        <option value='5680000'>당진시</option>
                        <option value='4510000'>보령시</option>
                        <option value='4570000'>부여군</option>
                        <option value='4530000'>서산시</option>
                        <option value='4580000'>서천군</option>
                        <option value='4520000'>아산시</option>
                        <option value='4560000'>연기군</option>
                        <option value='4610000'>예산군</option>
                        <option value='4490000'>천안시</option>
                        <option value='4590000'>청양군</option>
                        <option value='4620000'>태안군</option>
                        <option value='4600000'>홍성군</option>
                    </>
                )
            // 전북특별자치도
            case '6540000':
                return (
                    <>
                        <option value='4781000'>고창군</option>
                        <option value='4671000'>군산시</option>
                        <option value='4711000'>김제시</option>
                        <option value='4701000'>남원시</option>
                        <option value='4741000'>무주군</option>
                        <option value='4791000'>부안군</option>
                        <option value='4771000'>순창군</option>
                        <option value='4721000'>완주군</option>
                        <option value='4681000'>익산시</option>
                        <option value='4761000'>임실군</option>
                        <option value='4751000'>장수군</option>
                        <option value='4641000'>전주시</option>
                        <option value='4691000'>정읍시</option>
                        <option value='4731000'>진안군</option>
                    </>
                )
            // 전라남도
            case '6460000':
                return (
                    <>
                        <option value='4920000'>강진군</option>
                        <option value='4880000'>고흥군</option>
                        <option value='4860000'>곡성군</option>
                        <option value='4840000'>광양시</option>
                        <option value='4870000'>구례군</option>
                        <option value='4830000'>나주시</option>
                        <option value='4850000'>담양군</option>
                        <option value='4800000'>목포시</option>
                        <option value='4950000'>무안군</option>
                        <option value='4890000'>보성군</option>
                        <option value='4820000'>순천시</option>
                        <option value='5010000'>신안군</option>
                        <option value='4810000'>여수시</option>
                        <option value='4970000'>영광군</option>
                        <option value='4940000'>영암군</option>
                        <option value='4990000'>완도군</option>
                        <option value='4980000'>장성군</option>
                        <option value='4910000'>장흥군</option>
                        <option value='5000000'>진도군</option>
                        <option value='4960000'>함평군</option>
                        <option value='4930000'>해남군</option>
                        <option value='4900000'>화순군</option>
                    </>
                )
            // 경상북도
            case '6470000':
                return (
                    <>
                        <option value='5130000'>경산시</option>
                        <option value='6479998'>경상북도</option>
                        <option value='5050000'>경주시</option>
                        <option value='5200000'>고령군</option>
                        <option value='5080000'>구미시</option>
                        <option value='5060000'>김천시</option>
                        <option value='5120000'>문경시</option>
                        <option value='5240000'>봉화군</option>
                        <option value='5110000'>상주시</option>
                        <option value='5210000'>성주군</option>
                        <option value='5070000'>안동시</option>
                        <option value='5180000'>영덕군</option>
                        <option value='5170000'>영양군</option>
                        <option value='5090000'>영주시</option>
                        <option value='5100000'>영천시</option>
                        <option value='5230000'>예천군</option>
                        <option value='5260000'>울릉군</option>
                        <option value='5250000'>울진군</option>
                        <option value='5150000'>의성군</option>
                        <option value='5190000'>청도군</option>
                        <option value='5160000'>청송군</option>
                        <option value='5220000'>칠곡군</option>
                        <option value='5020000'>포항시</option>
                    </>
                )
            // 경상남도
            case '6480000':
                return (
                    <>
                        <option value='5370000'>거제시</option>
                        <option value='5470000'>거창군</option>
                        <option value='5420000'>고성군</option>
                        <option value='5350000'>김해시</option>
                        <option value='5430000'>남해군</option>
                        <option value='5360000'>밀양시</option>
                        <option value='5340000'>사천시</option>
                        <option value='5450000'>산청군</option>
                        <option value='5380000'>양산시</option>
                        <option value='5390000'>의령군</option>
                        <option value='5310000'>진주시</option>
                        <option value='5410000'>창녕군</option>
                        <option value='5320000'>창원시</option>
                        <option value='5280000'>창원시</option>
                        <option value='5670000'>창원시</option>
                        <option value='5330000'>통영시</option>
                        <option value='5440000'>하동군</option>
                        <option value='5400000'>함안군</option>
                        <option value='5460000'>함양군</option>
                        <option value='5460000'>합천군</option>

                    </>
                )
            // 제주특별자치도
            case '6500000':
                return (
                    <>
                        <option value='6520000'>서귀포시</option>
                        <option value='6510000'>제주시</option>
                        <option value='6500000'>제주특별자치도</option>
                    </>
                )
            default:
                return (
                    null
                )
        }   
    };

    const navigate = useNavigate();
    const goAnimal = (animal) => {
        navigate(`/pet/detail/${animal.desertionNo}`, {
            state: {
                noticeNo: animal.noticeNo,
                popfile: animal.popfile,
                kindCd: animal.kindCd,
                colorCd: animal.colorCd,
                sexCd: animal.sexCd,
                neuterYn: animal.neuterYn,
                specialMark: animal.specialMark,
                happenDt: animal.happenDt,
                happenPlace: animal.happenPlace,
                noticeSdt: animal.noticeSdt,
                noticeEdt: animal.noticeEdt,
                careNm: animal.careNm,
                careAddr: animal.careAddr,
                careTel: animal.careTel
            },
            key: animal.desertionNo
        });
    };

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    // const sidoURL = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?&numOfRows=17&pageNo=1&serviceKey=${process.env.REACT_APP_API_KEY}`;
    // const sigunguURL = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=6260000&numOfRows=100&pageNo=1&serviceKey=${process.env.REACT_APP_API_KEY}`;

    // console.log('시도 확인', sidoURL);
    // console.log('시군구 확인', sigunguURL);

    const filterDataByCategory = (category, regionCode, cityCode) => {
        if (!data.response.body.items.item) {
            return null;
        } else {
            return data.response.body.items.item.filter(item => {
                const categoryFilter =
                    category === '기타축종'
                        ? !item.kindCd.includes('[개]') && !item.kindCd.includes('[고양이]')
                        : !item.kindCd.includes(`[${category}]`);
        
                const sidoSplit = item.orgNm.split(' ')[0];
                const siGunguSplit = item.orgNm.split(' ')[1];

                const sidoReplacements = 
                    sidoSplit.replace("서울특별시", "6110000")
                        .replace("부산광역시", "6260000")
                        .replace("대구광역시", "6270000")
                        .replace("인천광역시", "6280000")
                        .replace("광주광역시", "6290000")
                        .replace("세종특별자치시", "5690000")
                        .replace("대전광역시", "6300000")
                        .replace("울산광역시", "6310000")
                        .replace("경기도", "6410000")
                        .replace("강원특별자치도", "6530000")
                        .replace("충청북도", "6430000")
                        .replace("충청남도", "6440000")
                        .replace("전북특별자치도", "6540000")
                        .replace("전라남도", "6460000")
                        .replace("경상북도", "6470000")
                        .replace("경상남도", "6480000")
                        .replace("제주특별자치도", "6500000");
                
                function siGunguReplacements(sidoReplacements, siGunguSplit){
                    // 서울특별시
                    if (sidoReplacements === "6110000" && siGunguSplit === "가정보호"){
                        return "6119999"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "강남구") {
                        return "3220000"
                    } else if (sidoReplacements === "3240000" && siGunguSplit === "강동구") {
                        return "3240000"
                    } else if (sidoReplacements === "3080000" && siGunguSplit === "강북구") {
                        return "3080000"
                    } else if (sidoReplacements === "3150000" && siGunguSplit === "강서구") {
                        return "3150000"
                    } else if (sidoReplacements === "3200000" && siGunguSplit === "관악구") {
                        return "3200000"
                    } else if (sidoReplacements === "3040000" && siGunguSplit === "광진구") {
                        return "3040000"
                    } else if (sidoReplacements === "3160000" && siGunguSplit === "구로구") {
                        return "3160000"
                    } else if (sidoReplacements === "3170000" && siGunguSplit === "금천구") {
                        return "3170000"
                    } else if (sidoReplacements === "3100000" && siGunguSplit === "노원구") {
                        return "3100000"
                    } else if (sidoReplacements === "3090000" && siGunguSplit === "도봉구") {
                        return "3090000"
                    } else if (sidoReplacements === "3050000" && siGunguSplit === "동대문구") {
                        return "3050000"
                    } else if (sidoReplacements === "3190000" && siGunguSplit === "동작구") {
                        return "3190000"
                    } else if (sidoReplacements === "3130000" && siGunguSplit === "마포구") {
                        return "3130000"
                    } else if (sidoReplacements === "3120000" && siGunguSplit === "서대문구") {
                        return "3120000"
                    } else if (sidoReplacements === "6119998" && siGunguSplit === "서울특별시") {
                        return "6119998"
                    } else if (sidoReplacements === "3210000" && siGunguSplit === "서초구") {
                        return "3210000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "성동구") {
                        return "3030000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "성북구") {
                        return "3070000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "송파구") {
                        return "3230000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "양천구") {
                        return "3140000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "영등포구") {
                        return "3180000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "용산구") {
                        return "3020000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "은평구") {
                        return "3110000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "종로구") {
                        return "3000000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "중구") {
                        return "3010000"
                    } else if (sidoReplacements === "6110000" && siGunguSplit === "중랑구") {
                        return "3060000"
                    // 부산광역시
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "강서구") {
                        return "3360000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "금정구") {
                        return "3350000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "기장군") {
                        return "3400000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "남구") {
                        return "3310000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "동구") {
                        return "3270000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "동래구") {
                        return "3300000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "부산진구") {
                        return "3290000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "북구") {
                        return "3320000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "사상구") {
                        return "3390000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "사하구") {
                        return "3340000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "서구") {
                        return "3260000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "수영구") {
                        return "3380000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "연제구") {
                        return "3370000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "영도구") {
                        return "3280000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "중구") {
                        return "3250000"
                    } else if (sidoReplacements === "6260000" && siGunguSplit === "해운대구") {
                        return "3330000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "군위군") {
                        return "5141000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "남구") {
                        return "3440000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "달서구") {
                        return "3470000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "달성군") {
                        return "3480000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "동구") {
                        return "3420000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "북구") {
                        return "3450000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "서구") {
                        return "3430000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "수성구") {
                        return "3460000"
                    } else if (sidoReplacements === "6270000" && siGunguSplit === "중구") {
                        return "3410000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "강화군") {
                        return "3410000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "계양구") {
                        return "3550000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "남동구") {
                        return "3530000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "동구") {
                        return "3500000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "미추홀구") {
                        return "3150000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "부평구") {
                        return "3540000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "서구") {
                        return "3560000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "연수구") {
                        return "3520000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "웅진군") {
                        return "3580000"
                    } else if (sidoReplacements === "6280000" && siGunguSplit === "중구") {
                        return "3490000"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "광산구") {
                        return "3630000"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "광주광역시") {
                        return "6299998"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "남구") {
                        return "3610000"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "동구") {
                        return "3590000"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "북구") {
                        return "3620000"
                    } else if (sidoReplacements === "6290000" && siGunguSplit === "서구") {
                        return "3600000"
                    } else if (sidoReplacements === "5690000" && siGunguSplit === " ") {
                        return "5690000"  // 세종특별자치시 리턴 확인 필요!
                    } else if (sidoReplacements === "6300000" && siGunguSplit === "대덕구") {
                        return "3680000"
                    // 대전 시작~!
                    } else if (sidoReplacements === "6300000" && siGunguSplit === "동구") {
                        return "3640000"
                    } else if (sidoReplacements === "6300000" && siGunguSplit === "서구") {
                        return "3660000"
                    } else if (sidoReplacements === "6300000" && siGunguSplit === "유성구") {
                        return "3670000"
                    } else if (sidoReplacements === "6300000" && siGunguSplit === "중구") {
                        return "3650000"
                    } else if (sidoReplacements === "6310000" && siGunguSplit === "남구") {
                        return "3700000"
                    } else if (sidoReplacements === "6310000" && siGunguSplit === "동구") {
                        return "3710000"
                    } else if (sidoReplacements === "6310000" && siGunguSplit === "북구") {
                        return "3720000"
                    } else if (sidoReplacements === "6310000" && siGunguSplit === "울주군") {
                        return "3730000"
                    } else if (sidoReplacements === "6310000" && siGunguSplit === "중구") {
                        return "3690000"
                    // 경기도 시작
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "가평군") {
                        return "4160000" 
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "고양시") {
                        return "3940000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "과천시") {
                        return "3970000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "광명시") {
                        return "3900000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "광주시") {
                        return "5540000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "구리시") {
                        return "3980000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "군포시") {
                        return "4020000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "기흥구") {
                        return "5630000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "김포시") {
                        return "4090000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "남양주시") {
                        return "3990000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "동두천시") {
                        return "3920000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "부천시") {
                        return "3860000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "성남시") {
                        return "3780000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "수원시") {
                        return "3740000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "시흥시") {
                        return "4010000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "안산시") {
                        return "3930000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "안성시") {
                        return "4080000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "안양시") {
                        return "3830000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "양주시") {
                        return "5590000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "양평군") {
                        return "4170000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "여주시") {
                        return "5700000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "연천군") {
                        return "4140000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "오산시") {
                        return "4000000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "용인시") {
                        return "4050000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "의왕시") {
                        return "4030000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "의정부시") {
                        return "3820000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "이천시") {
                        return "4070000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "파주시") {
                        return "4060000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "평택시") {
                        return "3910000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "포천시") {
                        return "5600000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "하남시") {
                        return "4040000"
                    } else if (sidoReplacements === "6410000" && siGunguSplit === "화성시") {
                        return "5530000"
                    // 강원특별자치도
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "강릉시") {
                        return "4201000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "고성군") {
                        return "4341000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "강릉시") {
                        return "4201000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "동해시") {
                        return "4211000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "삼척시") {
                        return "4241000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "속초시") {
                        return "4231000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "양주군") {
                        return "4321000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "양양군") {
                        return "4351000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "영월군") {
                        return "4271000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "원주시") {
                        return "4191000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "인제군") {
                        return "4331000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "정선군") {
                        return "4291000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "철원군") {
                        return "4301000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "춘천시") {
                        return "4181000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "태백시") {
                        return "4221000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "평창군") {
                        return "4281000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "홍천군") {
                        return "4251000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "화천군") {
                        return "4311000"
                    } else if (sidoReplacements === "6530000" && siGunguSplit === "횡성군") {
                        return "4261000"
                    // 충청북도
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "괴산군") {
                        return "4460000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "단양군") {
                        return "4480000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "보은군") {
                        return "4420000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "영동군") {
                        return "4440000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "옥천군") {
                        return "4430000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "음성군") {
                        return "4470000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "제천시") {
                        return "4400000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "증평군") {
                        return "5570000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "진천군") {
                        return "4450000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "청주시") {
                        return "5710000"
                    } else if (sidoReplacements === "6430000" && siGunguSplit === "충주시") {
                        return "4390000"
                    // 충청남도
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "계룡시") {
                        return "5580000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "공주시") {
                        return "4500000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "금산군") {
                        return "4550000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "논산시") {
                        return "4540000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "당진시") {
                        return "5680000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "보령시") {
                        return "4510000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "부여군") {
                        return "4570000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "서산시") {
                        return "4530000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "서천군") {
                        return "4580000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "아산시") {
                        return "4520000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "연기군") {
                        return "4560000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "예산군") {
                        return "4610000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "천안시") {
                        return "4490000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "청양군") {
                        return "4590000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "태안군") {
                        return "4620000"
                    } else if (sidoReplacements === "6440000" && siGunguSplit === "홍성군") {
                        return "4600000"
                    // 전북특별자치도
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "고창군") {
                        return "4781000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "군산시") {
                        return "4671000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "김제시") {
                        return "4711000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "남원시") {
                        return "4701000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "무주군") {
                        return "4741000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "부안군") {
                        return "4791000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "순창군") {
                        return "4771000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "완주군") {
                        return "4721000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "익산시") {
                        return "4681000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "임실군") {
                        return "4761000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "장수군") {
                        return "4751000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "전주시") {
                        return "4641000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "정읍시") {
                        return "4691000"
                    } else if (sidoReplacements === "6540000" && siGunguSplit === "진안군") {
                        return "4731000"
                    // 전라남도
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "강진군") {
                        return "4920000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "고흥군") {
                        return "4880000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "곡성군") {
                        return "4860000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "광양시") {
                        return "4840000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "구례군") {
                        return "4870000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "나주시") {
                        return "4830000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "담양군") {
                        return "4850000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "목포시") {
                        return "4800000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "무안군") {
                        return "4950000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "보성군") {
                        return "4890000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "순천시") {
                        return "4820000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "신안시") {
                        return "5010000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "여수시") {
                        return "4810000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "영광군") {
                        return "4970000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "영암군") {
                        return "4940000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "완도군") {
                        return "4990000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "장성군") {
                        return "4980000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "자흥군") {
                        return "4910000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "진도군") {
                        return "5000000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "함평군") {
                        return "4960000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "해남군") {
                        return "4930000"
                    } else if (sidoReplacements === "6460000" && siGunguSplit === "화순군") {
                        return "4900000"
                    // 경상북도
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "경산시") {
                        return "5130000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "경상북도") {
                        return "6479998"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "경주시") {
                        return "5050000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "고령군") {
                        return "5200000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "구미시") {
                        return "5080000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "김천시") {
                        return "5060000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "문경시") {
                        return "5120000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "봉화군") {
                        return "5240000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "상주시") {
                        return "5110000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "성주군") {
                        return "5210000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "안동시") {
                        return "5070000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "영덕군") {
                        return "518000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "영양군") {
                        return "5170000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "영주시") {
                        return "5090000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "영천시") {
                        return "5100000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "예천군") {
                        return "5230000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "울릉군") {
                        return "5260000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "울진군") {
                        return "5250000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "의성군") {
                        return "5150000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "청도군") {
                        return "5190000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "청송군") {
                        return "5160000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "칠곡군") {
                        return "5220000"
                    } else if (sidoReplacements === "6470000" && siGunguSplit === "포항시") {
                        return "5020000"
                    // 경상남도
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "거제시") {
                        return "5370000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "거창군") {
                        return "5470000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "고성군") {
                        return "5420000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "김해시") {
                        return "5350000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "남해군") {
                        return "5430000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "밀양시") {
                        return "5360000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "사천시") {
                        return "5340000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "산청군") {
                        return "5450000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "양산시") {
                        return "5380000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "의령군") {
                        return "5390000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "진주시") {
                        return "5310000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "창녕군") {
                        return "5410000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "창원시") {
                        return "5320000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "창원시") {
                        return "5280000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "창원시") {
                        return "5670000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "통영시") {
                        return "5330000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "하동군") {
                        return "5440000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "함안군") {
                        return "5400000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "함양군") {
                        return "5460000"
                    } else if (sidoReplacements === "6480000" && siGunguSplit === "합천군") {
                        return "5460000"
                    // 제주특별자치도
                    } else if (sidoReplacements === "6500000" && siGunguSplit === "서귀포시") {
                        return "6520000"
                    } else if (sidoReplacements === "6500000" && siGunguSplit === "제주시") {
                        return "6510000"
                    } else if (sidoReplacements === "6500000" && siGunguSplit === "제주특별자치도") {
                        return "6500000"
                    };


                };
                const siGunguResult = siGunguReplacements;

                const regionFilter = !regionCode || sidoReplacements === regionCode;
                const cityFilter = !cityCode || siGunguResult === cityCode;
        
                const result = categoryFilter && regionFilter  && cityFilter;
                console.log(
                    `Item: ${item.desertionNo}, split_1: ${sidoSplit}, split_2: ${siGunguSplit},
                     split_result_1: ${sidoReplacements}, split_result_2: ${siGunguResult}, Category: ${categoryFilter},
                     Region: ${regionFilter}, City: ${cityFilter}, Result: ${result}`
                    )
                return result;
            });
        }
    };
        
    useEffect(() => {
        window.scrollTo(0,0);
        let isMounted = true;

        const allEncodedUrl = (category, regionCode, cityCode) => {

            const encoded = `${URL}?numOfRows=${itemsPerPage}&pageNo=${currentPage}&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;
    
            let categoryFilter = '';
            if (category === '개'){
                categoryFilter =`&upkind=417000`; 
                return `${encoded}&upkind=417000`;
            }
            else if (category === '고양이'){
                categoryFilter = `&upkind=422400`;
                return `${encoded}&upkind=422400`;
            } 
            else if (category === '기타축종'){
                categoryFilter = `&upkind=429900`;
                return `${encoded}&upkind=429900`;
            }
            // 시도
            let regionFilter = '';
            if (regionCode) {
                regionFilter=`&upr_cd=${regionCode}`;
                // console.log('rrrrrrrrrrr', regionFilter);
            }
            // 시군구
            let cityFilter = '';
            if (cityCode) {
                cityFilter = `&org_cd=${cityCode}`;
            }
            
            if(cityCode===''){
                return `${encoded}${categoryFilter}${regionFilter}`;
            }else{
                return `${encoded}${categoryFilter}${regionFilter}${cityFilter}`;
            }
            // return `${encoded}${categoryFilter}${regionFilter}${cityFilter}`;

        };

        const fetchData = async (encodedUrl) => {
            try {
                setError(null);
                setData(null);
                setIsLoading(true);
    
                const response = await axios.get(encodedUrl);
    
                if (isMounted) {
                    setData(response.data);
                    setTotalPages(Math.ceil(response.data.response.body.totalCount / itemsPerPage));
                }
            } catch (e) {
                if (isMounted) {
                    setError(e);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        
        const encodedUrl = allEncodedUrl(selectedCategory, selectedSido, selectedCity);
        fetchData(encodedUrl);

        return () => {
            isMounted = false;
        };
    }, [currentPage, selectedCategory, selectedSido, selectedCity]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    // Log 추가
    console.log("Fetched Data:", data);

    return (
        <div className='card-list-container'>
            {/* <h2>아이들이 당신을 기다리고 있어요!</h2> */}
            {/* 지역 선택 UI */}
            <div>
                <select value={selectedSido} onChange={handleSidoChange}>
                    <option value=''>시/도</option>
                    <option value='6110000'>서울특별시</option>
                    <option value='6260000'>부산광역시</option>
                    <option value='6270000'>대구광역시</option>
                    <option value='6280000'>인천광역시</option>
                    <option value='6290000'>광주광역시</option>
                    <option value='5690000'>세종특별자치시</option>
                    <option value='6300000'>대전광역시</option>
                    <option value='6310000'>울산광역시</option>
                    <option value='6410000'>경기도</option>
                    <option value='6530000'>강원특별자치도</option>
                    <option value='6430000'>충청북도</option>
                    <option value='6440000'>충청남도</option>
                    <option value='6540000'>전북특별자치도</option>
                    <option value='6460000'>전라남도</option>
                    <option value='6470000'>경상북도</option>
                    <option value='6480000'>경상남도</option>
                    <option value='6500000'>제주특별자치도</option>
                </select>
                <select value={selectedCity} onChange={handleCityChange}>
                    <option value=''>시/군/구</option>
                    {getCityOptions(selectedSido)}
                </select>
            </div>
            {/* 카테고리 선택 UI */}
            <div className='card-button-container'>
                <button onClick={() => setSelectedCategory(null)}><img alt='all' src={process.env.PUBLIC_URL + '/img/all_50.png'} /></button>
                <button onClick={() => setSelectedCategory('개')}><img alt='puppy' src={process.env.PUBLIC_URL + '/img/puppy_50.png'} /></button>
                <button onClick={() => setSelectedCategory('고양이')}><img alt='cat' src={process.env.PUBLIC_URL + '/img/cat_50.png'} /></button>
                <button onClick={() => setSelectedCategory('기타축종')}><img alt='etc' src={process.env.PUBLIC_URL + '/img/etc_64.png'} /></button>
            </div>
            <Row xs={1} md={3} className='g-4'>
                {
                    filterDataByCategory(selectedCategory, selectedSido, selectedCity) !== null &&
                        filterDataByCategory(selectedCategory, selectedSido, selectedCity).length > 0 ? (
                            filterDataByCategory(selectedCategory, selectedSido, selectedCity).map((animal) => (
                                <Col key={animal.desertionNo}>
                                    <Card border='warning'>
                                        <a href={`/pet/detail/${animal.desertionNo}`}>
                                        <Card.Img className='card-img' 
                                            src={animal.popfile} alt={`Pet ${animal.desertionNo}`} onClick={() => goAnimal(animal)}
                                            variant="top" />
                                        </a>
                                            <Card.Body>
                                                <Card.Title>{animal.processState}</Card.Title>
                                                <Card.Text>
                                                    {animal.kindCd }<br />
                                                    {animal.sexCd === 'F' ? '여아' : '남아'} · {animal.neuterYn === 'Y' ? '중성화 완료' : '중성화 미완료'}
                                                </Card.Text>
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item>보호센터 : {animal.careNm}</ListGroup.Item>
                                            </ListGroup>
                                    </Card>
                                </Col>
                    ))
                ) : (
                    <p>해당 지역에는 아이들이 없습니다.</p>
                )}
            </Row>
            <Stack direction='row' spacing={2} justifyContent='center' marginTop={5} marginBottom={5}>
                <Pagination color='primary'
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => navigateToPage(page)}
                />
            </Stack>
        </div>
    );
}
export default PetList;