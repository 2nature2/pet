import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import { Button, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const CommunityPage = ({lists, loadCommunityList, totalElements, totalPages, setPage}) => {
    const movePage = useNavigate();
    const [page, setPageLocal] = useState(1);

    useEffect(()=> {
        loadCommunityList();
        // eslint-disable-next-line
    }, [page]);
    
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage -1);
        setPageLocal(selectedPage);
        console.log("page확인:",selectedPage);
    };

    function write(){
        movePage('/community/write');
    };

    return (
        <div className='community'>
            <div className='cboard'>
                <div className='search'>
                    <select name='search' style={{marginRight:10, textAlign:'center', padding: 5}}>
                        <option value={lists.b_title}>제목</option>
                        <option value={lists.b_content} >내용</option>
                    </select>
                    <input type='text' placeholder='내용을 입력하세요'></input>
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
                            <td>{list.b_category}</td>
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
                <Pagination activePage={page} itemsCountPerPage={20} totalItemsCount={parseInt(totalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange} />
                <Button className='btnW' onClick={write} style={{backgroundColor:"#1098f7", borderColor:"#1098f7"}}>글쓰기</Button>
            </div>
        </div>
    )
}

export default CommunityPage;