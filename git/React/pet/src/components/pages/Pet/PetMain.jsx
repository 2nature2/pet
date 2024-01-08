import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import PetList from './PetList';

const PetMain = () => {

    return(
        <div className='community'>
            <h2>전체 리스트</h2>
            <PetList />
        </div>
    )
}
export default PetMain;