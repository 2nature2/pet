import React,{useState, useEffect } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetMain = () => {
    const navigate = useNavigate();

    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setisLoadeing] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const apiKey = process.env.REACT_APP_API_KEY;
    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

    // const {
    //     noticeNo,
    //     processState
    // } = pet;

    const fetchData = async() => {
        try{
            setError(null);
            setData(null);
            setisLoadeing(true);

            const response = await axios.get(URL, {
                params:{

                    serviceKey: process.env.REACT_APP_SERVICE_KEY,
                    numOfRows:1000,
                    pageNo:1
                }
            });

            setData(response.data);
        } catch(e){
            setError(e);
        }
        setisLoadeing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error...</div>
    if(!data || !data.response || !data.response.body || !data.response.body.items || !data.response.body.items.item){
        return null;
    } 
    
    const {noticeNo, processState} = data.response.body.items.item;

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
                <p>공고번호 : {noticeNo}</p>
                <p>{processState}</p>
            </div>
            
        </div>
    )
}

export default PetMain;