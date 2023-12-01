import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';

const CommunityPage = ({lists}) => {
    const movePage = useNavigate();

    function write(){
        movePage('/write');
    }

    return (
        <div className='community'>
            <div className='cboard'>
                <input type='text' className='search' placeholder='내용을 입력하세요'></input>
                <button>검색</button>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>등록일</th>
                            <th>좋아요</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists&&lists.map((list, index) => (
                        <tr key={index}>
                            <td>{list.bnum}</td>
                            <td><a href={`community/view/${list.bnum}`}>{list.b_title}</a></td>
                            <td>{list.b_writer}</td>
                            <td>{list.b_date}</td>
                            <td>{list.b_like}</td>
                            <td>{list.hitcount}</td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <br/><button onClick={write}>글쓰기</button>
        </div>
    )
}

export default CommunityPage;