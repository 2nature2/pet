import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';


const PetMain = () => {
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
            console.log("api 응답:",response.data)
            setData(response.data);
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
    if (error) return <div>Error...</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    const items = Array.isArray(data.response.body.items.item)
        ? data.response.body.items.item
        : [data.response.body.items.item];

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
        <div>
            <div>
                <h2>기간이 얼마 남지 않은 아이들이에요.</h2>
                <button onClick={fetchData}>데이터 불러오기</button>
                {items.map((item, index) => (
                    <div key={index}>
                        <p>공고번호: {item.noticeNo}</p>
                        <p>상태: {item.processState}</p>
                        <p>발견장소: {item.happenPlace}</p>
                        <p>종류: {item.kindCd}</p>
                        <p>특징: {item.specialMark}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PetMain;