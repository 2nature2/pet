import { Button } from 'react-bootstrap';
import '../../styles/Community.css';

const UpdatePage = () => {

    return (
        <div className="uboard">
            <p>글번호: </p>
            <p>분류: </p>
            <p>제목: </p>
            <p>내용: </p>
            <p>작성자: </p>
            <p>날짜: </p>
            <p>좋아요: </p>
            <p>조회수: </p>
            <Button>확인</Button>
        </div>
    )
}

export default UpdatePage;