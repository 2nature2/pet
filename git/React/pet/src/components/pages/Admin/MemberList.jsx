import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import SideBar from "../Navigation/SideBar";

const MemberList = ({lists, loadMemberList, setMemberlist, mtotalElements, setMtotalElements})=>{
    const movePage = useNavigate();
    const [mpage, setMpageLocal] = useState(1);
    const [userInput, setUserInput] = useState('');

      
    const getValue = (e) => {
        setUserInput(e.target.value.toLowerCase());
    }

    useEffect(() => {
        const fetchData = async() => {
            if(userInput.trim()===''){
                await loadMemberList(mpage - 1);
            } 
          
        };
        fetchData();
    }, [mpage, userInput]);
 
    
    const handlePageChange = async(selectedPage) => {
        try{
            const currentPage = Math.max(selectedPage, 1);
            setMpageLocal(currentPage);
        } catch(error) {
            console.error("페이지 변경 오류", error);
        }
    };
    
    return(
        <>
        <SideBar/>
        <Container style={{marginTop:'100px', margininline: '10%'}}>
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
  {lists && lists.length > 0 ? (
    lists.map((list, index) => (
      <tr key={index}>
        <td>{list.memberid}</td>
        <td>{list.userid}</td>
        <td>{list.name}</td>
        <td>{list.tel}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">데이터가 없습니다.</td>
    </tr>
  )}
</tbody>
            </Table>
        </div>
        <div className='btns'>
                <Pagination activePage={mpage} itemsCountPerPage={5} totalItemsCount={parseInt(mtotalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange} />
            </div>
            </Container>
        </>
    )
}

export default MemberList;