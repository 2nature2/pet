import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const WritePage = ({ insertCommunity, loadCommunityList, resetForm }) => {
    const movePage = useNavigate();

    const [formContent, setFormContent] = useState({
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

    const communityInsert = async() => {
        try{
            await insertCommunity(formContent);
            loadCommunityList();
            resetForm();
            alert('작성완료');
            movePage('/community');
        } catch (error) {
            console.error('오류발생:', error);
        }
    }

    const submitCommunity = () => {
        axios.post('/community/insert', {
            b_title: formContent.b_title,
            b_content: formContent.b_content,
            b_writer: formContent.b_writer
        }).then(()=> {
            alert('작성완료');
            loadCommunityList();
            resetForm();
            movePage('/community');
        })
        .catch(error => {
            console.error('오류발생:', error);
        });
    }

    return(
        <div>
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="b_title">
                    <Form.Label>TITLE</Form.Label>
                    <Form.Control type="text" name="b_title" value={formContent.b_title} onChange={getValue} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="b_writer">
                    <Form.Label>WRITER</Form.Label>
                    <Form.Control type="text" name="b_writer" value={formContent.b_writer} onChange={getValue} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="b_content">
                    <Form.Label>CONTENT</Form.Label>
                    <Form.Control as='textarea' name="b_content" rows={3} value={formContent.b_content} onChange={getValue} />
                </Form.Group>
                <Button onClick={communityInsert}>등록</Button>
            </Form>
        </Container>
        </div>
    )
}

export default WritePage;