import { Button, Container, Form, Row, Col } from "react-bootstrap"
import { useState } from "react";
import axios from 'axios'


const JoinForm =({join}) =>{

    const[joinContent,setJoinContent] = useState({
        name:'',
        userid:'',
        password:'',
        address:'',
        tel:'',
        email:''
    })

    const getValue = (e) => {
      setJoinContent({
          ...joinContent,
          [e.target.name]: e.target.value
        })
      }

      const memberInsert =()=>{
        join(joinContent);
        setJoinContent({
            name:'',
            userid:'',
            password:'',
            address:'',
            tel:'',
            email:''
        })
      }

      const submitMember =() =>{
        axios.post('/member/join',{
            name:joinContent.name,
            userid:joinContent.userid,
            password:joinContent.password,
            address:joinContent.address,
            tel:joinContent.tel,
            email:joinContent.email
        }).then((resp)=>{
            alert("등록성공");
            setJoinContent({
            name:'',
            userid:'',
            password:'',
            address:'',
            tel:'',
            email:''
            })
        })
      }

    return(
        <Container>
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" onChange={getValue} value={joinContent.name} placeholder="Enter Name"/>
          </Form.Group>
  
          <Form.Group as={Col} controlId="userid">
            <Form.Label>Id</Form.Label>
            <Form.Control name="userid" onChange={getValue} value={joinContent.userid} placeholder="Enter Id"/>
          </Form.Group>

          <Form.Group as={Col} controlId="btn" style={{ marginTop: '6px' }}>
            <br/>
             <Button variant="primary" type="submit">
                중복확인
             </Button>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="Password" name="password" onChange={getValue} value={joinContent.password} placeholder="Enter Password" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="passwordcheck">
            <Form.Label>Password Check</Form.Label>
            <Form.Control type="password"  placeholder="Enter Password Check"/>
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter Address" name="address" onChange={getValue} value={joinContent.address}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="tel">
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder="Enter Phone" name="tel" onChange={getValue} value={joinContent.tel} />
        </Form.Group>

        <Form.Group  controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={getValue} value={joinContent.email}/>
        </Form.Group>
        
  
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
  
        <Button variant="primary" onClick={memberInsert}>
          회원가입
        </Button>
      </Form>
      </Container>
    )
}

export default JoinForm;