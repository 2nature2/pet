import { Button, Form, Col, Row } from 'react-bootstrap';
import '../../styles/Community.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UpdatePage = () => {
    const movePage = useNavigate();
    const location = useLocation();
    const viewData = location.state?.viewData || {};
    const [formContent, setFormContent] = useState({
        b_category:'',
        b_title: '',
        b_content: '',
        b_writer: '',
    })
    const getValue = (e) => {
        setFormContent({
            ...formContent,
            [e.target.name] : e.target.value
        })
    }
    const back = () => {
        movePage(-1);
    }
    
    return (
        <>
        <p className='pTitle'>빂Modify빂</p>
        <div className="uboard">
            <Form>
                <Form.Group className="mb-3" controlId="b_title">
                    <Form.Control type="text" name="b_title" defaultValue={viewData.b_title} style={{fontSize:30}} onChange={getValue}/>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group style={{borderRight:'1px gray solid', paddingRight:'10px'}} className="mb-3" controlId="b_writer">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control disabled type="text" name="b_writer" value={viewData.b_writer}/>
                        </Form.Group>
                    </Col>
                    <Col>          
                        <Form.Group style={{borderRight:'1px gray solid', paddingRight:'10px'}} className="mb-3" controlId="b_date">
                            <Form.Label>등록일</Form.Label>
                            <Form.Control disabled type="text" name="b_date" value={viewData.b_date} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group style={{borderRight:'1px gray solid', paddingRight:'10px'}} className="mb-3" controlId="b_category">
                            <Form.Label>분류</Form.Label>
                            <Form.Select name="b_category" defaultValue={viewData.b_category} onChange={getValue}>
                                <option>==선택==</option>
                                <option disabled>공지사항</option>
                                <option>질문</option>
                                <option>후기</option>
                                <option>기타</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group style={{paddingRight:'10px'}} className="mb-3" controlId="hitcount">
                            <Form.Label>조회수</Form.Label>
                            <Form.Control disabled type="text" name="hitcount" value={viewData.hitcount}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="b_content">
                    <Form.Control as='textarea' name="b_content" rows={20} defaultValue={viewData.b_content} onChange={getValue}/>
                </Form.Group>
            </Form>
            <Button style={{marginRight:5, backgroundColor:"#1098f7", borderColor:"#1098f7"}} >확인</Button>
            <Button style={{backgroundColor:"#828282", borderColor:"#828282"}} onClick={back}>취소</Button>
        </div>
        </>
    )
}

export default UpdatePage;