import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatMain = () => {
    const movePage = useNavigate();

    function write(){
        movePage('/write');
    }

    return (
        <div>
            <button onClick={write}>글쓰기</button>
        </div>
    )
}

export default PatMain;