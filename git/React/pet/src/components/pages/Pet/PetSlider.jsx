import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from '../../../util/DateFormat';
import styled from "styled-components";
import Slider from "react-slick";
import '../../styles/PetSlider.css';
import { Card, Col, ListGroup } from 'react-bootstrap';

export default function PetSlider() {

    const [ data, setData ] = useState([]);
    const navigate = useNavigate();
    const [endAnimal, setEndAnimal] = useState([]);
    const [URL, setURL] = useState("");
    const [totalCount, setTotalCount] = ("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date();
                const startDay = new Date(today);
                startDay.setDate(today.getDate() - 13);
                const endDay = new Date(today);
                endDay.setDate(today.getDate() + 1);
                const startAnimal = formatDate(startDay);
                const endAnimal = formatDate(endDay);
                setEndAnimal(endAnimal);

                const generatedURL = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;
                setURL(generatedURL);

                const response = await axios.get(generatedURL);
                setTotalCount(response.data.response.body.totalCount);
                // const filteredData = response.data.response.body.items.item
                // console.log("filteredData", filteredData);
                // setData(response.data.response.body.items.item);
                // console.log("종료일로부터 -14일 항목 : ", startAnimal);
                // console.log("오늘로 부터 종료일 하루 전 항목 : ", endAnimal);


            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // const endAnimalFilteredData = data.filter(animal => animal.noticeEdt === endAnimal);
    // const filteredData = data.filter((animal)=> animal.noticeEdt === endAnimal);

    // console.log('filteredData', filteredData);

    console.log('url 확인: ', URL);

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

    const settings = {
        dots:false,
        infinite:true,
        slidesToShow:4,
        slideToScroll:1,
        speed:1000,
        arrows:true,
        nextArrow:(
            <img className="Div" src={process.env.PUBLIC_URL + '/img/arrow_40_r.png'} alt="right" />
        ),
        prevArrow:(
            <img className="DivPre" src={process.env.PUBLIC_URL + '/img/arrow_40_l.png'} alt="left" />
        ),
        autoplay:true,
        autoplaySpeed:4000,
        cssEase:"linear"
    };

    return (
        <div className='StyledContainer'>
            <h2>공고기간이 하루 남은 아이들이에요!</h2>
            <div>
                <Slider className="StyledSlider" {...settings}>
                    {
                        data.map((animal) => (
                            <Col className="StyledCol " key={animal.desertionNo}>
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
                    }
                </Slider>    
            </div> 
        </div>
    );
};