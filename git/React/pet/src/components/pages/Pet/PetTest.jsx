import React,{useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const PetTest = () =>{
    const [animalData, setAnimalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/');  // Flask 서버 주소에 맞게 수정
                const result = await response.json();

                setAnimalData(result.body?.items?.item || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return(
        <div>
            <h1>동물 정보 입니다~!</h1>
            <ul>
                {animalData.map(animal => (
                    <li key={animal.desertionNo}>
                        <img src={animal.filename} alt='Animal'></img>
                        <p>Kind : {animal.kindCd}</p>
                        <p>Color : {animal.colorCd}</p>
                        <p>Age : {animal.age}</p>
                        <p>Weight : {animal.weight}</p>


                    </li>
                ))}
            </ul>
        </div>
    )

}
export default PetTest;