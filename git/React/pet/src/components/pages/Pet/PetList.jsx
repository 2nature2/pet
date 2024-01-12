import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetList = () => {

    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 9;

    const navigateToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    const encoded = `${URL}?numOfRows=${itemsPerPage}&pageNo=${currentPage}&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;

    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setIsLoading(true);

            const response = await axios.get(encoded);

            // console.log("Response Data:", response.data);

            setData(response.data);
            setTotalPages(Math.ceil(response.data.response.body.totalCount / itemsPerPage));
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
    }, [currentPage]); // currentPage 가 변경될 때마다 API 호출

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    // Log 추가
    console.log("Fetched Data:", data);

    return (
        <div className='community'>
            <div className='cboard'>
                <h2>아이들이 당신을 기다리고 있어요!</h2>
                
                {
                    data.response.body.items.item.map((animal) => (
                        <div key={animal.desertionNo}>
                            <a href={`/pet/detail/${animal.desertionNo}`}>
                                <img src={animal.popfile} alt={`Pet ${animal.desertionNo}`} onClick={() => goAnimal(animal)}></img>
                            </a>
                            <p>공고번호 : {animal.noticeNo}</p>
                            <p>상태 : {animal.processState}</p>
                            <p>접수일시 : {animal.noticeSdt}</p>
                            <p>발견장소 : {animal.happenPlace}</p>
                            <p>종류 : {animal.kindCd}</p>
                            <p>특징 : {animal.specialMark}</p>
                        </div>
                    ))
                }
            </div>
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={navigateToPage}
            />
        </div>
    );
}
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = currentPage - halfPagesToShow;
    let endPage = currentPage + halfPagesToShow;

    if (startPage < 1){
        startPage = 1;
        endPage = Math.min(pagesToShow, totalPages);
    }
    if (endPage > totalPages){
        startPage = Math.max(1, totalPages - pagesToShow + 1);
        endPage = totalPages;
    }
    const hasPrevious = startPage > 1;
    const hasNext = endPage < totalPages;

    return(
        <div>
            {hasPrevious && (
                <button onClick={() => onPageChange(currentPage - 1)}>
                    &lt;&lt; Previous
                </button>
            )}


            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                <button key={startPage + index} onClick={() => onPageChange(startPage + index)}>
                    {startPage + index}
                </button>
            ))}

            {hasNext && (
                <button onClick={() => onPageChange(currentPage + 1)}>
                    Next &gt;&gt;
                </button>
            )}
        </div>
    )
}
export default PetList;