import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import Pagination from 'react-js-pagination';

const PetList = () => {

    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const [pageList, setPageList] = useState([])
    const [curPage, setCurPage] = useState(0); // 현재 페이지
    const [prevBlock, setPrevBlock] = useState(0); // 이전 페이지
    const [nextBlock, setNextBlock] = useState(0); // 다음 페이지
    const [lastPage, setLastPage] = useState(0); // 마지막 페이지

    const navigate = useNavigate();

    const goAnimal = (animal) => {
        navigate(`/pet/detail/${animal.desertionNo}`, {
            state : {
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
            }
        });
    };

    const [search, setSeacrh] = useState({
        page : 1,
        sk : '',
        sv : '',
    });

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

    // const items = Array.isArray(data.response.body.items)
    //     ? data.response.body.items.item
    //     : [data.response.body.items.item];

    // Log 추가
    console.log("Fetched Data:", data);


    return (
        <div className='community'>
            <div className='cboard'>
                <h2>아이들이 당신을 기다리고 있어요!</h2>
                {/* <button onClick={fetchData}>데이터 불러오기</button> */}
                {
                    data.response.body.items.item.map((animal) => (
                        <div key={animal.desertionNo}>
                            <a href={`/pet/detail/${animal.desertionNo}`}>
                                <img src={animal.popfile} onClick={() => goAnimal(animal)}></img>
                            </a>
                            <p>공고번호: {animal.noticeNo}</p>
                            <p>상태: {animal.processState}</p>
                            <p>접수일시: {animal.noticeSdt}</p>
                            <p>발견장소: {animal.happenPlace}</p>
                            <p>종류: {animal.kindCd}</p>
                            <p>특징: {animal.specialMark}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default PetList;