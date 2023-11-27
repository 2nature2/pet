import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JoinForm from './Member/JoinForm';
import { Button, Container, Form, Row, Col } from "react-bootstrap"




function App() {
  return (
    <Container>
      <h2>회원가입</h2>
      <JoinForm></JoinForm>
    </Container>
  );
}

export default App;
