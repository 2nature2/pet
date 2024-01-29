import React, { useEffect } from 'react';
import '../../styles/Main.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import PetSlider from '../Pet/PetSlider.jsx';
import { Button, Table } from 'react-bootstrap';

const MainPage = ({bests}) => {
    console.log('bests', bests);
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
                                <div key={`Img ${index +1}`}>
                                <img style={{height: '35vh', width:'98%', objectFit:'cover'}} src={image} alt={`Img ${index +1}`}/>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
               
            </div>
            <div className='bestCommunity'>
                <span className='sub'>인기글</span>
                <Table className='best'>
                    <tbody>
                        {
                            bests.map((best, index)=> (
                                index%2 == 0 
                                ?
                                <tr>
                                    <td style={{borderBottomColor:'#b80042'}} key={index}><span className='emj'>덍 </span><a href={`/community/view/${best.bnum}`}><span>[{best.b_category}] </span>{best.b_title} <span style={{color:'gray'}}>{`\n`}[{best.b_comments}]</span></a></td>
                                </tr>
                                :
                                <tr>
                                    <td style={{borderBottomColor:'#b80042'}} key={index}><span className='emj'>넁 </span><a href={`/community/view/${best.bnum}`}><span>[{best.b_category}] </span>{best.b_title} <span style={{color:'gray'}}>{`\n`}[{best.b_comments}]</span></a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                
            </div>
            {/* <PetSlider /> */}
            
            <button className='testbtn' onClick={() => window.open('https://AlwayWithAnimalmbti.waveon.io', '_blank')}>
                <img src='../img/mbtitest.png' style={{width:'100%', height:'100%'}}/>
            </button>

        </div>
       
    );
};

export default MainPage;