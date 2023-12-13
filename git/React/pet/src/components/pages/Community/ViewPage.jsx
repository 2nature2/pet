import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/Community.css';
import { Button, Col, Form, Row } from "react-bootstrap";

const ViewPage = () => {
    const movePage = useNavigate();
    const prevBnum = useRef(null);
    const prev = () => {
       movePage('/community');
    }
    const updateForm = () => {
        movePage(`/community/update`, { state: { viewData: view } });
    }
    const {bnum} = useParams();
    const [view, setView] = useState({
        b_category: '',
        b_title: '',
        b_content: '',
        b_writer: '',
        b_date: '',
        b_like: '',
        hitcount: '',
        bnum:''
    })
    
    //setView는 객체 업데이트 => concat은 배열에 쓰는 메서드
    useEffect(()=> {
        const viewList = () => {
            fetch(`/community/view/${bnum}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then((resp)=> {
                if(!resp.ok){
                    throw new Error(`Network response was not ok: ${resp.status}`);
                }
                return resp.json();
            })
            .then((data)=> {
                console.log("data확인",data);
                setView((prevView) => (
                    {
                        ...prevView,
                        b_category: data.b_category,
                        b_title: data.b_title, 
                        b_content: data.b_content,
                        b_writer: data.b_writer,
                        b_date: data.b_date,
                        b_like: data.b_like,
                        hitcount: data.hitcount,
                        bnum: data.bnum
                    }
                ))
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                console.error('Response:', error.response);
            });
        }
        console.log('useEffect called');
        if(bnum!==prevBnum.current){
            viewList();
            prevBnum.current = bnum;
        }
        
    },[bnum])

    const deleteBoard = () => {
        fetch(`/community/delete/${bnum}`, {
            method: 'DELETE',
        })
        .then(()=> {
            window.location = '/community';
            // window.location = document.referrer;
        })
    }

    const blike = () => {
        fetch(`/community/like/${bnum}`, {
            method: 'GET'
        })
        .then(()=> {
            window.location.reload();
        })
    }
    return(
        <>
        <div className="vboard">
        <Button variant="outline-secondary" style={{marginBottom:10}} onClick={prev}>{`<-`}</Button>
            <Form>
                <Form.Group className="mb-3" controlId="b_title">
                    <Form.Control plaintext readOnly type="text" name="b_title" value={view.b_title} style={{fontSize:30}} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group style={{borderRight:'1px gray solid'}} className="mb-3" controlId="b_writer">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control plaintext readOnly type="text" name="b_writer" value={view.b_writer}/>
                        </Form.Group>
                    </Col>
                    <Col>          
                        <Form.Group style={{borderRight:'1px gray solid'}} className="mb-3" controlId="b_date">
                            <Form.Label>등록일</Form.Label>
                            <Form.Control plaintext readOnly type="text" name="b_date" value={view.b_date} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group style={{borderRight:'1px gray solid'}} className="mb-3" controlId="b_category">
                            <Form.Label>분류</Form.Label>
                            <Form.Control plaintext readOnly type="text" name="b_category" value={view.b_category} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="hitcount">
                            <Form.Label>조회수</Form.Label>
                            <Form.Control plaintext readOnly type="text" name="hitcount" value={view.hitcount} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="b_content">
                    <Form.Control plaintext readOnly as='textarea' name="b_content" rows={20} value={view.b_content}/>
                </Form.Group>
            </Form>
            <div className="vBtns">
                <div className="lBtn">
                    <Button id="lBtn1" onClick={blike}>♥ 좋아요({view.b_like})</Button>
                    <Button id="lBtn2" >신고</Button>
                </div>
            <div className="rBtn">
                <Button style={{marginRight:5, backgroundColor:"#1098f7", borderColor:"#1098f7"}} onClick={updateForm}>수정</Button>
                <Button style={{marginRight:5, backgroundColor:"#d80000", borderColor:"#d80000"}} onClick={deleteBoard}>삭제</Button>
            </div>
            </div> 
        </div>
        </>
    )
}

export default ViewPage;