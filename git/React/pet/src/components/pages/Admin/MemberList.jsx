import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import SideBar from "../Navigation/SideBar";
import axios from 'axios';
import '../../styles/MemberList.css';


const MemberList = ()=>{
    const[memberList, setMemberList]= useState([]);
    const[page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const[totalElements,setTotalElements]=useState(0);

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userid, setUserid] = useState(null);

    const [searchOption, setSearchOption] = useState('m_name');
    const [userInput, setUserInput] = useState('');
    const [searching, setSearching] = useState(false);
    
    const getValue = (e) => {
        setUserInput(e.target.value.toLowerCase());
    }

    const handleSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
    };

    const handleModalShow = (userid) => {
        setSelectedUserId(userid);
        setUserid(userid);
        console.log("userid22: ", selectedUserId)
        setShowModal(true);
    };

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

      const handleWithdraw =  () => {
        
        fetch(`/admin/withdraw/${userid}`, {
            method: 'DELETE',
        })
            .then(() => {
                handleModalClose();
                alert("탈퇴 완료")
                // window.location = document.referrer;
            })
    }

    
    const handleSearch = () => {
        search(page);
    };

    const search = async(selectedPage) => {
        try{
            const currentPage = selectedPage -1;
            console.log("검색테스트1")
            const response = await axios.get(`/admin/member/search?&size=20&page=${currentPage}&field=${searchOption}&word=${userInput}`);
            console.log("검색테스트2")
            // setNoticeList(notices.data.content);
            // setCommunityList(response.data.content);
            // setTotalElements(response.data.totalElements);
            }catch(error){
            console.error("검색 오류:", error);
        }
    };


    return(
        <>
        <SideBar/>
        <Container style={{marginTop:'100px', margininline: '10%'}}>
        <div>
        <div className='search'>
        <select name='search' style={{marginRight:10, textAlign:'center', padding: 5}}  value={searchOption} onChange={handleSearchOptionChange}>
                        <option value='m_name'>이름</option>
                        <option value='m_userid'>아이디</option>
                        <option value='m_tel'>전화번호</option>
                    </select>
                    <input type='text' placeholder='내용을 입력하세요' 
                     onChange={getValue} 
                    // onFocus={handleInputFocus} onBlur={handleInputBlur}
                    ></input>
                    
                    <Button style={{backgroundColor:"#1098f7", borderColor:"#1098f7"}}  onClick={handleSearch}>검색</Button>
        </div>
            <Table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>관리자 권한</th>
                    </tr>
                </thead>
                <tbody>
                {memberList.map((list, index)=>(
                    <tr key={index}>
                        <td>{list.memberid}</td>
                        <td>{list.userid}</td>
                        <td>{list.name}</td>
                        <td>{list.tel}</td>
                        <td><Button variant="danger" size="sm" onClick={() => handleModalShow(list.userid)}>
                                            탈퇴
                        </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        <div className='btns'>
                <Pagination activePage={page+1} itemsCountPerPage={5} totalItemsCount={parseInt(totalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange} />
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>회원 탈퇴</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        회원 탈퇴를 진행하시겠습니까?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            취소
                        </Button>
                        <Button variant="danger" onClick={handleWithdraw}>
                            확인
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default MemberList;