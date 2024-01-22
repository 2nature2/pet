import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../styles/Pet.css';

const PetList = () => {

    const [data, setData] = useState(null); // 요청의 결과
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(false); // 에러

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 12;

    const navigateToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
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
    const encoded = `${URL}?numOfRows=${itemsPerPage}&pageNo=${currentPage}&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        window.scrollTo(0, 0);
        let isMounted = true; // 컴포넌트가 마운트된 상태인지 확인하기 위한 변수

        const fetchData = async () => {
            try {
                setError(null);
                setData(null);
                setIsLoading(true);

                const response = await axios.get(encoded);

                // console.log("Response Data:", response.data);

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

        fetchData();

        // Cleanup 함수
        return () => {
            isMounted = false;
        }
    }, [currentPage, encoded, itemsPerPage]); // currentPage 가 변경될 때마다 API 호출

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.response || !data.response.body || !data.response.body.items) {
        return <div>No data available</div>;
    }

    // Log 추가
    console.log("Fetched Data:", data);

    return (
        <div className='card-list-containe'>
            {/* <h2>아이들이 당신을 기다리고 있어요!</h2> */}
            <Row xs={1} md={3} className='g-4'>
                {data.response.body.items.item.map((animal) => (
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
                                        {animal.sexCd === 'F' ? '여아' : '남아'}<br />
                                        {animal.neuterYn === 'Y' ? '중성화 완료' : '중성화 미완료'}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>보호센터 : {animal.careNm}</ListGroup.Item>
                                </ListGroup>
                        </Card>
                    </Col>
                        // <div className='flex-list-container' key={animal.desertionNo}>
                        //     <div className='flex-list-img'>
                        //         <a href={`/pet/detail/${animal.desertionNo}`}>
                        //             <img className='flex-list-img' src={animal.popfile} alt={`Pet ${animal.desertionNo}`} onClick={() => goAnimal(animal)}></img>
                        //         </a>
                        //     </div>
                        //     <div className='flex-list-item'>
                        //         <p>공고번호 : {animal.noticeNo}</p>
                        //         <p>상태 : {animal.processState}</p>
                        //         <p>접수일시 : {animal.noticeSdt}</p>
                        //         <p>발견장소 : {animal.happenPlace}</p>
                        //         <p>종류 : {animal.kindCd}</p>
                        //         <p>특징 : {animal.specialMark}</p>
                        //     </div>
                        // </div>
                    ))}
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