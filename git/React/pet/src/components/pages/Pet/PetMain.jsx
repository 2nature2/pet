import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetMain = () => {

<<<<<<< HEAD
    
=======
    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    const encoded = `${URL}?numOfRows=1000&pageNo=1&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;


    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setIsLoading(true);

            const response = await axios.get(encoded);

            // console.log("Response Data:", response.data);

            setData(response.data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // console.log('process.env.REACT_APP_API_KEY 확인',process.env.REACT_APP_API_KEY)
        // console.log('encoded확인', encoded)
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    const items = Array.isArray(data.response.body.items)
        ? data.response.body.items.item
        : [data.response.body.items.item];

    // Log 추가
    // console.log("Fetched Data:", data);
    // console.log('items확인', items);

  
    return (
        <div className='community'>
            <div className='cboard'>
                <h2>기간이 얼마 남지 않은 아이들이에요.</h2>
                {/* <button onClick={fetchData}>데이터 불러오기</button> */}
                {
                    items.map((item, index) => (
                        <div key={index}>
                            <img src={item[index].popfile}></img>
                            <p>공고번호: {item[index].noticeNo}</p>
                            <p>상태: {item[index].processState}</p>
                            <p>접수일시: {item[index].noticeSdt}</p>
                            <p>발견장소: {item[index].happenPlace}</p>
                            <p>종류: {item[index].kindCd}</p>
                            <p>특징: {item[index].specialMark}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
>>>>>>> aa7514d5f53f906996d85d07bd6a6ea39d2e95a9
}
export default PetMain;