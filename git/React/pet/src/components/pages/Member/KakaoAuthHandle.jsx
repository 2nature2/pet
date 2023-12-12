import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import { KAKAO_ADD_PROPERTIES } from './kakaoAuth';

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    const kakaoLogin = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/kakao/callback?code=${code}`);
        localStorage.setItem('token', res.headers.authorization);
        window.location.href = '/';
      } catch (error) {
        console.error('Kakao login error:', error);
        // 여기서 에러 처리를 원하는 대로 수행할 수 있습니다.
      }
    };
    kakaoLogin();
  }, [props.history]);

  return <Container></Container>;
};

export default KakaoAuthHandle;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
