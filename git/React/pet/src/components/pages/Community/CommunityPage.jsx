import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Community.css';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';

const CommunityPage = ({lists, loadCommunityList, setCommunityList, totalElements, setTotalElements}) => {
    const movePage = useNavigate();
    const [page, setPageLocal] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [searching, setSearching] = useState(false);
    
    const getValue = (e) => {
        setUserInput(e.target.value.toLowerCase());
    }

    const handleInputFocus = () => {
        setSearching(true);
    };
    
    const handleInputBlur = () => {
        setSearching(false);
    };

    useEffect(() => {
        const fetchData = async() => {
            if(userInput.trim()===''){
                await loadCommunityList(page - 1);
            } 
            if(!searching){
                await search(page);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [page, userInput, searching]);
    
    useEffect(()=> {
        setSearchLists(lists);
        console.log("sessionStorage", sessionStorage);
    }, [lists]);

    const handlePageChange = async(selectedPage) => {
        try{
            const currentPage = Math.max(selectedPage, 1);
            setPageLocal(currentPage);
            // await search(currentPage);
        } catch(error) {
            console.error("페이지 변경 오류", error);
        }
    };

    function write(){
        if(sessionStorage.length!==0){
            movePage('/community/write');
        }else{
            Swal.fire({
                icon: "warning",
                iconColor: "red",
                title: "로그인 해주세요.",
                confirmButtonColor:"#b80042"
            })
        }
    };

    const [searchLists, setSearchLists] = useState(lists);
    const [searchOption, setSearchOption] = useState('b_title');

    const handleSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
    };
    const search = async(selectedPage) => {
        try{
            const currentPage = selectedPage -1;
            const response = await axios.get(`/community/search?&size=20&page=${currentPage}&field=${searchOption}&word=${userInput}`);
            setCommunityList(response.data.content);
            setTotalElements(response.data.totalElements);
            }catch(error){
            console.error("검색 오류:", error);
        }
    };

    const handleSearch = () => {
        search(page);
    };

    return (
        <div className='community'>
            <div className='cboard'>
                <div className='search'>
                    <select name='search' style={{marginRight:10, textAlign:'center', padding: 5}} value={searchOption} onChange={handleSearchOptionChange}>
                        <option value='b_title' >제목</option>
                        <option value='b_content' >내용</option>
                    </select>
                    <input type='text' placeholder='내용을 입력하세요' onChange={getValue} onFocus={handleInputFocus} onBlur={handleInputBlur}></input>
                    <Button style={{backgroundColor:"#1098f7", borderColor:"#1098f7"}} onClick={handleSearch}>검색</Button>
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