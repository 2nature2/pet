import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { agoDate } from '../../../util/DateFormat';
import '../../styles/Pet.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PetSlider() {

    const [ data, setData ] = useState([]);

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    const encoded = `${URL}?_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;

    const threeDaysAnimal = async () => {
        try {
            const response = await axios.get(encoded);
            setData(response.data.response.body.items.item);

            console.log('response 확인', response.data.response.body.items.item);

        } catch (error) {
            console.error("Error fetching ThreeDaysData : ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () =>{
            try {
                await threeDaysAnimal();
            } catch (error) {
                console.error("Error fetching ThreesDDDDDDData : ", error);
            }
        };
        fetchData();
        console.log("기한", agoDate(new Date(), -1));
    }, []);

    // console.log("Animal333Days", encoded);

    const location = useLocation();
    const goAnimal = location.state;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='pet-list-container'>
            {/* {
                data&&(
                    <Slider {...settings}>
                    {
                        data.map((item) => (
                            <div className='flex-list-container' key={item.desertionNo}>
                                <div className='flex-list-img'>
                                    <a href={`/pet/detail/${item.desertionNo}`}>
                                        <img
                                            className='flex-list-img'
                                            src={item.popfile}
                                            alt={`Pet ${item.desertionNo}`}
                                            onClick={() => goAnimal(item)}
                                        ></img>
                                    </a>
                                </div>
                                <div className='flex-list-item'>
                                    <p>공고번호 : {item.noticeNo}</p>
                                    <p>상태 : {item.processState}</p>
                                    <p>접수일시 : {item.noticeSdt}</p>
                                    <p>발견장소 : {item.happenPlace}</p>
                                    <p>종류 : {item.kindCd}</p>
                                    <p>특징 : {item.specialMark}</p>
                                </div>
                            </div>
                        ))}
                </Slider>
                )
            } */}
            {
                data
                .map((item) => (
                    <div className='flex-list-container' key={item.desertionNo}>
                        <div className='flex-list-img'>
                            <a href={`/pet/detail/${item.desertionNo}`}>
                                <img
                                    className='flex-list-img'
                                    src={item.popfile}
                                    alt={`Pet ${item.desertionNo}`}
                                    onClick={() => goAnimal(item)}
                                ></img>
                            </a>
                     </div>
                    <div className='flex-list-item'>
                        <p>공고번호 : {item.noticeNo}</p>
                        <p>상태 : {item.processState}</p>
                        <p>접수일시 : {item.noticeSdt}</p>
                        <p>발견장소 : {item.happenPlace}</p>
                        <p>종류 : {item.kindCd}</p>
                        <p>특징 : {item.specialMark}</p>
                    </div>
                    </div>
                    ))
            }
        </div>
    );
};