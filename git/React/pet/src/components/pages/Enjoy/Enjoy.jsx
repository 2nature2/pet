import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/Enjoy.css';


const Enjoy=()=>{

    
    return(

        <>
        <Container className='enjoyTap'>
          <div className='game'>
            <a href='/enjoy/shooting'>
            <img src='../../gameimg/shooting.png' style={{width:'100%', height:'100%'}}/>
            <span>SHOOTING 게임 하러가기</span>
            </a>
          </div>
        </Container>
        <Container>
          <a href='/enjoy/merge' style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', width:'200px', height:'200px' }}>
          {/* <img src='../../gameimg/shooting.png' style={{width:'200px', height:'200px'}}/> */}
          <span style={{ marginTop: '10px' }}>Merge 게임 하러가기</span>
          </a>
        </Container>
        </>
    )
}

export default Enjoy;