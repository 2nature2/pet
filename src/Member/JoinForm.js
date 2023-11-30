import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Modal  } from 'react-bootstrap';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';

const JoinForm = ({ join }) => {
  const [joinContent, setJoinContent] = useState({
    name: '',
    userid: '',
    password: '',
    address: '',
    tel: '',
    email: '',
    passwordCheck:''
  });

  //==============우편번호찾기//아이디 중복확인=======================
    // 모달 상태
    const [showModal, setShowModal] = useState(false);
// 중복확인 결과 상태
const [isIdDuplicated, setIsIdDuplicated] = useState(false);
const [idCheckMessage, setIdCheckMessage] = useState('아이디 중복 확인을 해주세요.'); // 새로운 상태 추가
//중복확인 버튼 t/f
const [isIdChecked, setIsIdChecked] = useState(false);
const [isAddrChecked, setIsAddrChecked] = useState(false);

    // handler
    const handle = {
      // 버튼 클릭 이벤트
      clickButtonaddr: () => {
        setShowModal(true);
      },
  
      clickButton: async () => {
        // 서버로 중복확인 요청 보내기
        try {
          const response = await axios.post('/member/checkId', {
            userid: joinContent.userid,
          });
  
          // 중복되지 않으면 메시지 표시
          if (response.data === 'success') {
            setIsIdDuplicated(false);
            setIdCheckMessage('사용 가능한 아이디입니다.');
            setIsIdChecked(true); // 중복확인 수행 상태로 설정
          } else if (response.data === 'fail') {
            setIsIdDuplicated(true);
            setIdCheckMessage('이미 사용 중인 아이디입니다.');
            setIsIdChecked(false); // 중복확인 미수행 상태로 설정
          } else {
            console.error('잘못된 응답:', response.data);
          }
        } catch (error) {
          console.error('중복확인 오류:', error);
        }
      },
  
      // 주소 선택 이벤트
      selectAddress: (data) => {
        console.log(`
          주소: ${data.address},
          우편번호: ${data.zonecode}
        `);
        setJoinContent({
          ...joinContent,
          address: data.address,
        });
        setShowModal(false);
        setIsAddrChecked(true);
      },
  
      // 모달 닫기
      closeModal: () => {
        setShowModal(false);
       
      },
    };
//====================================================
  const getValue = (e) => {
    setJoinContent({
      ...joinContent,
      [e.target.name]: e.target.value,
    });
  };

  const memberInsert = () => {
    //유효성검사
    if(!joinContent.name){
      alert("이름을 입력하세요")
      return;
    }else if(!joinContent.userid){
      alert("아이디를 입력하세요")
      return;
    }else if(!isIdChecked){
      alert('아이디 중복확인을 먼저 수행하세요.');
      return;
    }else if(!joinContent.password){
      alert("비밀번호를 입력하세요")
      return;
    }else if(!joinContent.address){
      alert("주소를 입력하세요")
      return;
    }else if(!joinContent.tel){
      alert("전화번호를 입력하세요")
      return;
    }else if(!joinContent.email){
      alert("이메일을 입력하세요")
      return;
    }else if(!isAddrChecked){
      alert("우편번호 찾기를 먼저 수행하세요")
      return;
    }else if(joinContent.password!=joinContent.passwordCheck){
      alert("비밀번호가 일치하지 않습니다.")
      return;
    }
    join(joinContent);
    setJoinContent({
      name: '',
      userid: '',
      password: '',
      address: '',
      tel: '',
      email: '',
      passwordCheck:''
    });
    setIsIdChecked(false);
    setIsAddrChecked(false);

  };

  // const submitMember = () => {
  //   axios
  //     .post('/member/join', {
  //       name: joinContent.name,
  //       userid: joinContent.userid,
  //       password: joinContent.password,
  //       address: joinContent.address,
  //       tel: joinContent.tel,
  //       email: joinContent.email,
  //     })
  //     .then((resp) => {
  //       alert('등록성공');
  //       setJoinContent({
  //         name: '',
  //         userid: '',
  //         password: '',
  //         address: '',
  //         tel: '',
  //         email: '',
  //       });
  //     });
  // };

  return (
    <Container>
      <Form style={{ marginTop: '30px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={getValue}
              value={joinContent.name}
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="userid">
            <Form.Label>Id</Form.Label>
            <Form.Control
              name="userid"
              onChange={getValue}
              value={joinContent.userid}
              placeholder="Enter Id"
            />
                  <Form.Text className={isIdDuplicated ? 'text-danger' : 'text-muted'}>
            {idCheckMessage}
          </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId="btn" style={{ marginTop: '6px' }}>
            <br />
            <Button variant="primary" type="button" onClick={handle.clickButton}>
              중복확인
            </Button>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="Password"
              name="password"
              onChange={getValue}
              value={joinContent.password}
              placeholder="Enter Password"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="passwordcheck">
            <Form.Label>Password Check</Form.Label>
            <Form.Control type="password" placeholder="Enter Password Check" name="passwordCheck"  onChange={getValue}
              value={joinContent.passwordCheck}/>
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Enter Address"
            name="address"
            onChange={getValue}
            value={joinContent.address}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="btn" style={{ marginTop: '6px' }}>
            <br />
            <Button variant="primary"  onClick={handle.clickButtonaddr}>
            우편번호 찾기
            </Button>
          </Form.Group>
        </Row>
       

        <Form.Group className="mb-3" controlId="tel">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            placeholder="Enter Phone"
            name="tel"
            onChange={getValue}
            value={joinContent.tel}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={getValue}
            value={joinContent.email}
          />
        </Form.Group>
<br/>
        <Button variant="primary" onClick={memberInsert}>
          회원가입
        </Button>
      </Form>
      {/* 우편번호 찾기 모달 */}
      <Modal show={showModal} onHide={handle.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcode onComplete={handle.selectAddress} autoClose={false} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default JoinForm;
