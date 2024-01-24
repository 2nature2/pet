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

    const filterDataByCategory = (category) => {
        return data.response.body.items.item.filter(item => {
            if(category === '기타축종'){
                return !item.kindCd.includes('[개]') && !item.kindCd.includes('[고양이]');
            } else if (category === null){
                return true;
            } else {
                return item.kindCd.includes(`[${category}]`);
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0,0);
        let isMounted = true;

        const allEncodedUrl = (category) => {

            const encoded = `${URL}?numOfRows=${itemsPerPage}&pageNo=${currentPage}&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;
    
            if (category === '개'){
                return `${encoded}&upkind=417000`;
            } else if (category === '고양이'){
                return `${encoded}&upkind=422400`;
            } else if (category === '기타축종'){
                return `${encoded}&upkind=429900`;
            } else {
                return encoded;
            }
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
        
        const encodedUrl = allEncodedUrl(selectedCategory);
        fetchData(encodedUrl);

        return () => {
            isMounted = false;
        };
    }, [currentPage, selectedCategory]);

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
            {/* 카테고리 선택 UI */}
            <div className='card-button-container'>
                <button onClick={() => setSelectedCategory(null)}><img alt='all' src={process.env.PUBLIC_URL + '/img/all_50.png'} /></button>
                <button onClick={() => setSelectedCategory('개')}><img alt='puppy' src={process.env.PUBLIC_URL + '/img/puppy_50.png'} /></button>
                <button onClick={() => setSelectedCategory('고양이')}><img alt='cat' src={process.env.PUBLIC_URL + '/img/cat_50.png'} /></button>
                <button onClick={() => setSelectedCategory('기타축종')}><img alt='etc' src={process.env.PUBLIC_URL + '/img/etc_64.png'} /></button>
            </div>
            <Row xs={1} md={3} className='g-4'>
                {filterDataByCategory(selectedCategory).map((animal) => (
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