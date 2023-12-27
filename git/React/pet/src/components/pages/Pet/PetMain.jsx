import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetMain = () => {

    const [data, setData] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await fetch('/api/pet');
                if(!response.ok){
                    throw new Error(`Fetch failed with status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData.response.body.items.item);

                //로그 추가
                console.log('불러온 데이터:', response);
            } catch(error){
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Flask data in React~!</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.desertionNo}>
                        <img src={item.filename} alt="animal" />
                        <p>종류 : {item.kindCd}</p>
                        <p>색상 : {item.colorCd}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
    /*
    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const URL = "https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json";

    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setIsLoading(true);

            const response = await axios.get(URL, {
                
            });

            console.log("Response Data:", response.data);

            setData(response.data.AbdmAnimalProject);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    const items = Array.isArray(data.response.body.items.item)
        ? data.response.body.items.item
        : [data.response.body.items.item];

    // Log 추가
    console.log("Fetched Data:", data);

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
                <button onClick={fetchData}>데이터 불러오기</button>
                {data && data.length  > 0 ? (
                    data.map((item, index) => (
                        <div key={index}>
                            <p>공고번호: {item.noticeNo}</p>
                            <p>상태: {item.processState}</p>
                            <p>발견장소: {item.happenPlace}</p>
                            <p>종류: {item.kindCd}</p>
                            <p>특징: {item.specialMark}</p>
                        </div>
                    ))
                ) : (
                    <div>No data available</div>
                )}
            </div>
        </div>
    );*/
}
export default PetMain;