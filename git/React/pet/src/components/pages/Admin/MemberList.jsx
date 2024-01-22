import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import SideBar from "../Navigation/SideBar";

const MemberList = ()=>{
    const[memberList, setMemberList]= useState([]);
    const[page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const[totalElements,setTotalElements]=useState(0);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const loadMemberList = await fetch(`/admin/memberList?page=${page}`);
                const Data = await loadMemberList.json();

                setMemberList(Data.content);
                setTotalPages(Data.totalPages);
                setTotalElements(Data.totalElements);
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        console.log('memberList', memberList);
       
      },[page]);
      const handlePageChange = async(selectedPage) => {
        const currentPage = Math.max(selectedPage, 1);
        setPage(currentPage-1);
      }

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
                {memberList.map((list, index)=>(
                    <tr key={index}>
                        <td>{list.userid}</td>
                        <td>{list.tel}</td>
                        <td>{list.name}</td>
                        <td>{list.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        <div className='btns'>
                <Pagination activePage={page+1} itemsCountPerPage={5} totalItemsCount={parseInt(totalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange} />
            </div>
            </Container>
        </>
    )
}

export default MemberList;