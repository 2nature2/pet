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

    const [data, setData] = useState([]); // 요청의 결과

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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filterDataByCategory = (category) => {
        return data.response.body.items.item.filter(item => {
            if(category === '기타축종'){
                return !item.kindCd.includes('[개]') && !item.kindCd.includes('[고양이]');
            } else if(category === null) {
                return item;
            } else {
                return item.kindCd.includes(`[${category}]`);
            }
        });
    }

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
        <div className='card-list-container'>
            {/* <h2>아이들이 당신을 기다리고 있어요!</h2> */}
            {/* 카테고리 선택 UI */}
            <div className='card-button-container'>
                <button onClick={() => setSelectedCategory(null)}><img src='data:image/png;base64,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' /></button>
                <button onClick={() => selectedCategory('[개]')}><img src='data:image/png;base64,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' /></button>
                <button onClick={() => setSelectedCategory('고양이')}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGjElEQVR4nO2Z+VMTZxjHsdcf0P4C9HfbTqdTddqp7Si/OGNbOSVElgiCgCKEK4Qr3DeIIiAgEMBkl6ICIygeLcbWo7UWTGrHikcr7NIZ23oBGXtANu23866SQgPk2jj9gWfmGbLL7vu+n332Od5nPTyWZVmWZVn+DzJ51muNUeeZNqnzXv1MJwYKnwOreZ1ntZvNHJNoHmeyBOWYRHKO/I9cY2ucKZ3XKQIxpfPijWe9MKXzMk0Oeq9y7+L1rS/yY3SgmWV6eJZ5aOYYLKXkGp6lu/nxzgBy72LjGs96KgmERXWeae4BuN7zkpmjk3iO+cnW4heF4phxYq2FgCZ13quJJWYtMvH5q2+LDmEa71zPc8wNZwGsrUSPmMbpdVYwg96rjDpPhegQAFaYWTqXZ2mzCIvHVz0FUEVLEb5hHR7faufNLKMic4i6aGuInud5lm4XwwJTI23IiZYiLyMPB7SnkBUZMhewjcw1d+6JdRK/CR+JcWK91NdFCKwgE4gBMX1Hg7StQahr6QVz4goaOo4jfkswatK3Y3pUOxsQmLmWIQAE5JFP8Ca7F23cEPTKw3USxdRa6cuz58jrJJY/aCoSUFnVJEDM1eqaDtRlRf97LUtnu/T0H/lI0yZ8QkBgLI4tgk8Q/fNHDRIpiRXErMopCWYsVqF5E8d84DQIscTk+pBU8peEWDGj09DRIhTklFoB5GSVob37PHLSMjEyWDUvmi2Va+wWkifEgiDaVrIL+5qOWIGE+wZClVWKfU2HUZ+9Xbj2r7sDgppZOsH1jO1CsltIK1O2obVLt+ir1cx8CtnGjejel2wB4Tmac8kqPMsEiQnBj9GQh/hB2//1oiCtXTpsXrsWl48Wz7+Xo/1cAKG7xQCYuq7GTd1udNfIkavMXhSio/ci8rMLsVcZaf0QOPqQUxCkQuVZ+oGziyeRZ6AlA8rwYKRERiBPmY2Soj1o7zlvBdDeewGx/pugitmCE+oMIeNbgbDMQ3uqZmsQln7DWYhvT5RDLg1ASVE1NH2Lv0azWtPQBXVxnM1xMdb5msMgT/cTDkMMtGQiKWIbOo5+aRPAogNDSKaCbPvYeGfAMwm7Z7QqKOMSQA8M2w/xVFMiwvD77YO25pA7DsJ25jgCMXq+BomyUGiPDzkMQTQzLg6/6huXnodlVC6DjAxWo7U0GQ+uNi84SVaUBC2fDM5bXNuRL5CdXoRcVQVaus5YisSFVBEViT9+OOgGELLfnjNIWngohi9exG6ltVOSkiJTnjy/5MguR5PmpBCRyDE9MIT8vGoUFu5dECQxdLM9lpe77OyqHdGYmZ5G/i7rGF+vikW9us+yKO2xy9hdq1lwwXm5VULZPi9qNXahMTfWPc7+3/C7FAiJOPY6uPbYN0hPybEck/vklBS/6JvcE35NBuod083C38x3njigIiIMGroPmVESqwkSqRCHHDs5Nhma/kvC7/KKBjBVctvW4Oh7Dm+BZ/Rb1pgMYTxvCANvkME82oQUWYjw9EimnjvB45vtSI2McAhEEbMTZWW1wm9S7bYW2U6GvDMliklPKZ9APNVbJUKDgNRCSZRU2G/PTvDoWguUsdEOgcSHBCAlQuZYMuQ6Hd+rzwxTq00GykQgTAbZ3+bRRpzRqFCUW4Y9tQdRmkAJlawzIGWldcJWtyiOwv62fuFcWkwsfr6yeA7hSRmPcy84DCLAXJWtMhkoBX+7qlIYbIxGalggDjCnUVJYCQXlj+H+Ynx3sgwZO3fZdvLjQyjOr0BejFRoMJB8FC8NEiJcZbUavfWpS+WPeA9XhTwJM0tfIwOSp5Yg8RdCbXPnZyjIKkRmYooAt1SUipaEIvC9d/HxW28iSeqH9Ihg6OgcnOvKgypZCU3fJcT4bcSFQwULQVwXZatLhHQASSNg9lUqSQiDYnsUyiuahG1rXUuPQ0qq3ShfX3CXalGRtFUYZ+/+Tmz76MN5r5jQfGDp9z3EFFIezH1SpC46rc4Q9uAH8mOd0rtDDTDeUKOteKdw3FywA/cM8/JJpofYImaDzh7lWUbN62V+JgNl5PWUrztapm3PAgJkLj3lK4BcCbO/u+hgEzt71mfEBaB5t7xOSwnpAJKIIhoIS38vumPbKyQskuYZSVhOW4HcyzLxooVYZ5vblkbeOOPPc/RhnmPu2148c5/UTqRX5XTGFrO5vZgPYZRe+eSbIp1g+RhKLEe+GY7SK93+IceR5rbNi5dlWZZlWTzcIP8AZP/l6lB+cc4AAAAASUVORK5CYII=' /></button>
                <button onClick={() => setSelectedCategory('기타축종')}><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEPklEQVR4nO2Yz4scRRTHB0X8hYoeRPx1EDWi8RerMdGQi6IGf2SjoqhERZKDiEElJOJFQRCjJ4/r/uj3evASNhH/AjW5ejHqRTHr1Hu9C7oejJnNVE205fV2dY+zPdM1kwgi7wMNy2zNt7/v1auqV9NoKIqiKIqiKIqiKIqiKIqiKIrSS5oeONtRtNEyPmM5fqlr8KG09emljTFJF6LznIEt1kTPyyN/y2dj6y03L+4yPmAJXhCP4lU8j6tXkJrpyyzBh5Zg2TGmvY8l6DqCzyzBbY1AVhK81hHMWoITFXp/OMbpNjWvDtWzZu7WzAODrdBbtgT7x54oR/E9lnGpX3hAIt6o0+sQPlEVeFUiOgluq/eHr1uCU3V6jjFxBjaMFvwiTFjCdmGK8Qsp1c5i8+aTJr5elkA2k4yueBHBvuHB4595gH85xvlOEk92uLkuewxsdwwH8/+lMnZYElwS7e3xJh6mxZN4E4/Z0mL4skwqti3jnUHBp8nUBY6g5cUt48uDxoqoY6A8sFOO43uryt7PvCX4vZvAg4P0uiZ6WMbkpo+3DVxVEfx9PpmO0FiKbx/oj3BXVqGrYxdSc+D82gQ4gn1l+cSvhqxDy7CSB3ikQm/Wz7zMUp1el2CrrwTH8MnaoOBIrndCZrs+nmh3GQ/sqRvfcATf51/4Jk3fOav2C6um9vuXdGjuBv+57Oz55ib/mw/RyjwwHvJVkP7w8bn+85Ot2et6Sv/9EC2JwTEezb93dPjgheiKIltJtDfUsDXx+sKYgZ1FIAa2FIlJ4slQPdkzSh+4uXwP7Cz0Ama/8EH4lv9euhRfPnhgC+/yA7sUPRL6Ajlz/VqzhO+VhvG5wjDjjaF6MrZIaALPFnqE7/r9ZpRzvsv4aJHQRZgYONBRtPG/kYDmujOZgA7HjwUloN2auTLkWBu6BAh3VS4BA9uDDRM8VbcEbAtuCdVzBG8HLQHBMfz472yCcDBEK/NA+HnAJvhBcBvP+F3u4duRNgxH0e4Rj8HDa/VgpjgGCbaOtF6rj8HDRXNj4vW18TC+OdIxmC7FFzqCn32b21vSa8QXYaJshLLmZFP/mBWeu8ZXQdYIDUmCBC+z7sfKkqwIaFPZAgMN6/AcwytlIwTHgi9czsCG3r7dMn5lCXfI0SMlLh2bI4gK8bpWOIkn+1rhQ7InZG1wEt3UoehJX/ZFK8zw+JDA9vTdRWbFk7TCsjdYxhd9w+SbJsvRHUHB97ac2UWi7vIivXjIZSjBbT1N0ZDLEB6XXbtOzxl87R8TMPhhZ+bubox/HcaPLONva41mL5+XPSBUT666sq59mfcH7hinqsp+EFKRmQfGToXeL9Itpj9NXdI4XdKvp87JrseEO+RyJBea0xGWnV2Ot+IHkQQ39+72I+v9OnNRl6P7V/3B07KEz8gPIoqiKIqiKIqiKIqiKIqiKIrS+F/xNyaHNzeEvsTiAAAAAElFTkSuQmCC' /></button>
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