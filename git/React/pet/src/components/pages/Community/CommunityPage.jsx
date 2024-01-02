import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import { Button, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const CommunityPage = ({lists, loadCommunityList, totalElements, totalPages, setPage}) => {
    const movePage = useNavigate();
    const [page, setPageLocal] = useState(1);
    const [userInput, setUserInput] = useState('');
    const getValue = (e) => {
        setUserInput(e.target.value.toLowerCase());
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await loadCommunityList();
    //         console.log('totalPages', totalPages);
    //     };
    //     fetchData();
    //     // eslint-disable-next-line
    // }, [page]);
    
    useEffect(()=> {
        loadCommunityList();
        // eslint-disable-next-line
    }, []);
    
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage -1);
        setPageLocal(selectedPage);
        console.log("page확인:",selectedPage);
    };

    function write(){
        movePage('/community/write');
    };

    const [searchLists, setSearchLists] = useState(lists);
    const [searchOption, setSearchOption] = useState('b_title');
    const handleSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
    }
    const search = () => {
        setSearchLists(lists.filter((item) => item[searchOption] && item[searchOption].includes(userInput)));
    }

    return (
        <div className='community'>
            <div className='cboard'>
                <div className='search'>
                    <select name='search' style={{marginRight:10, textAlign:'center', padding: 5}} value={searchOption} onChange={handleSearchOptionChange}>
                        <option value='b_title' >제목</option>
                        <option value='b_content' >내용</option>
                    </select>
                    <input type='text' placeholder='내용을 입력하세요' onChange={getValue}></input>
                    <Button style={{backgroundColor:"#1098f7", borderColor:"#1098f7"}} onClick={search}>검색</Button>
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
                            searchLists&&searchLists.map((list, index) => (
                        <tr className='tblData' key={index}>
                            <td>{list.bnum}</td>
                            <td>{list.b_category}</td>
                            <td style={{textAlign: 'justify'}}><a href={`/community/view/${list.bnum}`}>{list.b_title} <span style={{color:'gray'}}>[{list.b_comments}]</span></a></td>
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