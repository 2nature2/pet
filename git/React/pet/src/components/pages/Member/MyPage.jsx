import React, { useEffect, useState } from 'react';

import axios from "axios";
import { Button, Container, Form, Row, Col, Modal  } from 'react-bootstrap';




const MyPage=()=>{

    // React 상태를 사용하여 입력 필드의 값을 관리합니다.
    const [formData, setFormData] = useState({
      name: sessionStorage.getItem("name") || "",
      tel: sessionStorage.getItem("tel") || "",
      nickname: sessionStorage.getItem("nickname") || "",
      userid: sessionStorage.getItem("userid") || "",
      email: sessionStorage.getItem("email") || "",
    });

    // 중복확인 결과 상태
    const [isIdDuplicated, setIsIdDuplicated] = useState(false);
    const [idCheckMessage, setIdCheckMessage] = useState('아이디 중복 확인을 해주세요.'); 
    //중복확인 버튼 t/f
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    //닉네임
    const [isNickDuplicated, setIsNickDuplicated] = useState(false);
    const [nickCheckMessage, setNickCheckMessage] = useState('닉네임 중복 확인을 해주세요.');
    
    const handle = {
      checkId: async () => {
        // 서버로 중복확인 요청 보내기
        try {
          const response = await axios.post('/member/checkId', {
            userid: formData.userid,
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

      checkNickname: async () => {
        // 서버로 중복확인 요청 보내기
        try {
          const response = await axios.post('/member/checkNickname', {
            nickname: formData.nickname,
          });
  
          // 중복되지 않으면 메시지 표시
          if (response.data === 'success') {
            setIsNickDuplicated(false);
            setNickCheckMessage('사용 가능한 닉네임입니다.');
            setIsNicknameChecked(true); // 중복확인 수행 상태로 설정
          } else if (response.data === 'fail') {
            setIsNickDuplicated(true);
            setNickCheckMessage('이미 사용 중인 닉네임입니다.');
            setIsNicknameChecked(false); // 중복확인 미수행 상태로 설정
          } else {
            console.error('잘못된 응답:', response.data);
          }
        } catch (error) {
          console.error('중복확인 오류:', error);
        }
      },
    }
    


    // 입력 필드의 값이 변경될 때 상태를 업데이트합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   // 폼을 제출할 때 세션 스토리지에 새로운 값을 저장합니다.
   const handleSubmit = (e) => {
    e.preventDefault();

    // 세션 스토리지에 새로운 값 저장
    
    // 추가적인 수정 로직 또는 서버에 전송 등의 작업 수행 가능
    axios.post("/member/memberupdate", formData)
    .then((response)=>{
      if(response.data=="success"){
        alert("회원정보 수정 완료")
        sessionStorage.setItem("name", formData.name);
         sessionStorage.setItem("tel", formData.tel);
         sessionStorage.setItem("nickname", formData.nickname);
        sessionStorage.setItem("userid", formData.userid);
        sessionStorage.setItem("email", formData.email);

        window.location.href = '/'
      }else{
        alert("회원정보 수정 실패")
      }
    })
    .catch((error) => {
      console.error('AxiosError:', error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    });
  };

    return(
        <Container className="panel" style={{ marginTop: "50px", width: "700px"}}>
          <h4>회원정보 수정</h4>
        <Form style={{border:"3px solid #ccc", padding: "20px", borderRadius:"10px"}}  onSubmit={handleSubmit}>
          <Form.Group as={Form.Row} className="mb-3" >
            <Form.Label column sm="2">
              이름
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label column sm="3">
              아이디
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.userid}
              name="userid"
              onChange={handleChange}
              style={{ width: '500px' }} 
            />
              <Form.Text className={isIdDuplicated ? 'text-danger' : 'text-muted'}>
            {idCheckMessage}
          </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="btn" style={{ marginTop: '10px' }}>
            <br />
            <Button variant="primary" type="button" onClick={handle.checkId}>
              중복확인
            </Button>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label column sm="2">
              닉네임
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.nickname}
              name="nickname"
              onChange={handleChange}
              style={{ width: '500px' }}
            />
             <Form.Text className={isNickDuplicated ? 'text-danger' : 'text-muted'}>
            {nickCheckMessage}
          </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="btn" style={{ marginTop: '10px' }}>
            <br />
            <Button variant="primary" type="button" onClick={handle.checkNickname}>
              중복확인
            </Button>
          </Form.Group>
          </Row>
          <Form.Group as={Form.Row} className="mb-3" >
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.tel}
              name="tel"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Form.Row} className="mb-3" >
            <Form.Label column sm="2">
              이메일
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

         
          <Button variant="secondary"  type="submit">
              수정
            </Button>
          </Form>

          </Container>
    )
}
export default MyPage;