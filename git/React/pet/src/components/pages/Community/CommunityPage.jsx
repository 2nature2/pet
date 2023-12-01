import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import { Button, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const CommunityPage = ({lists}) => {
    const movePage = useNavigate();
    const [page, setPage] = useState(1);
    const handlePageChange = (page) => {
        setPage(page);
        console.log("page확인", page);
    }
    
    function write(){
        movePage('/write');
    }

    return (
        <div className='community'>
            <div className='cboard'>
            <div>
                <input className='search' type='text' placeholder='내용을 입력하세요'></input>
                <Button style={{backgroundColor: '#b89e97', borderColor: '#b89e97'}}>검색</Button>
                </div>
                <Table>
                    <thead>
                        <tr id='ctr'>
                            <th>글번호</th>
                            <th>분류</th>
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
                        <tr className='tblData' key={index}>
                            <td>{list.bnum}</td>
                            <td></td>
                            <td style={{textAlign: 'justify'}}><a href={`/community/view/${list.bnum}`}>{list.b_title}</a></td>
                            <td>{list.b_writer}</td>
                            <td>{list.b_date}</td>
                            <td>{list.b_like}</td>
                            <td>{list.hitcount}</td>
                        </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='btns'>
                
                <Pagination activePage={page} itemsCountPerPage={20} totalItemsCount={450} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange} />
                <Button className='btnW' onClick={write}>글쓰기</Button>
            </div>
        </div>
    )
}

export default CommunityPage;