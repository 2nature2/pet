import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { agoDate33 } from '../../../util/DateFormat';
import '../../styles/Pet.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PetSlider() {

    const [ data, setData ] = useState(null);

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
    const encoded = `${URL}?noticeEdt=${agoDate33(new Date(), -1)}&_type=json&serviceKey=${process.env.REACT_APP_API_KEY}`;

    const threeDaysAnimal = async () => {
        try {
            const response = await axios.get(encoded);
            console.log('rerererer', response);
            setData(response.data);
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
        console.log("afafafafefefeefe", agoDate33(new Date(), -1));
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
            {data && data.response && data.response.body && data.response.body.items && data.response.body.items.item && (
                <Slider {...settings}>
                    {data.response.body.items.item.map((animal) => (
                        <div className='flex-list-container' key={animal.desertionNo}>
                            <div className='flex-list-img'>
                                <a href={`/pet/detail/${animal.desertionNo}`}>
                                    <img
                                        className='flex-list-img'
                                        src={animal.popfile}
                                        alt={`Pet ${animal.desertionNo}`}
                                        onClick={() => goAnimal(animal)}
                                    ></img>
                                </a>
                            </div>
                            <div className='flex-list-item'>
                                <p>공고번호 : {animal.noticeNo}</p>
                                <p>상태 : {animal.processState}</p>
                                <p>접수일시 : {animal.noticeSdt}</p>
                                <p>발견장소 : {animal.happenPlace}</p>
                                <p>종류 : {animal.kindCd}</p>
                                <p>특징 : {animal.specialMark}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};