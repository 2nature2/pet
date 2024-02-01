import React from 'react';
import { Container } from 'react-bootstrap';


const Enjoy=()=>{

    
    return(
        <Container>
        <a href='/enjoy/shooting' style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
        <img src='../../gameimg/shooting.png' style={{width:'200px', height:'200px'}}/>
        <span style={{ marginTop: '10px' }}>SHOOTING 게임 하러가기</span>
        </a>
     
        </Container>
    )
}

export default Enjoy;