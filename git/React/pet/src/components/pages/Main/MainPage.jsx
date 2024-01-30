import React from 'react';
import '../../styles/Main.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import PetSlider from '../Pet/PetSlider.jsx';

const MainPage = () => {
    
    const imagePath = '/images/'

    const imageList = [
       imagePath+'1.jpeg',
       imagePath+'2.jpeg',
       imagePath+'3.jpeg',
       imagePath+'4.jpeg',
       imagePath+'5.jpeg',
       imagePath+'6.jpeg',
       imagePath+'7.jpeg',
       imagePath+'8.jpeg',
       imagePath+'9.jpeg',
       imagePath+'10.jpeg',
       imagePath+'11.jpeg',
       imagePath+'12.jpeg',
    ];

    const settings1 = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: false, 
    };

    return (
        <div className='mainBoard'>
            <div className='contest'>
                <div className='contestTxt'>반려동물을 자랑해주세요!</div>
                <div className='constestImgs'>
                    <Slider {...settings1}>
                        {
                            imageList.map((image, index)=> (
                                <div>
                                <img style={{height: '35vh', width:'98%', objectFit:'cover'}} src={image} key={index} alt={`Img ${index +1}`}/>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            <PetSlider />
            </div>
             <button className='testbtn' onClick={() => window.open('https://AlwayWithAnimalmbti.waveon.io', '_blank')}>
                 <img src='../img/mbtitest.png' style={{width:'100%', height:'100%'}}/>
             </button>
         </div>
        
       
    );
};

export default MainPage;