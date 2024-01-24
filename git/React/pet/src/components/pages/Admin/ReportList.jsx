import { useEffect, useState } from "react";
import '../../styles/Report.css';
import { Button, FormControl, FormGroup, Modal, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from "react-router-dom";

const ReportList = () => {
   
  const [boardReports, setBoardReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);
  const [bPage, setBPage] = useState(1);
  const [cPage, setCPage] = useState(1);
  const [bTotalPages, setBTotalPages] = useState(0);
  const [cTotalPages, setCTotalPages] = useState(0);
  const [bTotalElements, setBTotalElements] = useState(0);
  const [cTotalElements, setCTotalElements] = useState(0);

  const [boardReport, setBoardReport] = useState({
    brid: '',
    b_reporter: '',
    b_reason: '',
    community: '',
    reportStatus: ''
  })
  const [commentReport, setCommentReport] = useState({
    c_reporter: '',
    c_reason: '',
    community: '',
    comment: ''
  })

  useEffect(() => {
    const fetchData = async() => {
      try {
        const bResponse = await fetch('/admin/boardReport');
        const cResponse = await fetch('/admin/commentReport');
        const bData = await bResponse.json();
        const cData = await cResponse.json();

        setBoardReports(bData.content);
        setCommentReports(cData.content);

        setBTotalPages(bData.totalPages);
        setBTotalElements(bData.totalElements);
        setCTotalPages(cData.totalPages);
        setCTotalElements(cData.totalElements);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log('boardReports', boardReports);
    console.log('commentReports', commentReports);
  }, []);

  const handleBPageChange = async(selectedPage) => {
    try{
      const currentPage = Math.max(selectedPage, 1);
      setBPage(currentPage);
      console.log('bPage:', bPage);
    } catch(error) {
      console.error("페이지 변경 오류", error);
    }
  }

  const handleCPageChange = (selectedPage) => {
    try{
      const currentPage = Math.max(selectedPage, 1);
      setCPage(currentPage);
      console.log('cPage:', cPage);
    } catch(error) {
      console.error("페이지 변경 오류", error);
    }
  }

  const [reportState, setReportState] = useState('boardReport');
  
  const [show ,setShow] = useState(false);
  const reportOpen = (brid) => {
    console.log("brid확인" , brid);
    viewBoardReport(brid);
    setShow(true);
  }
  const reportClose = () => setShow(false);

  const { brid } = useParams(); //필요여부 확인
  const viewBoardReport = (brid) => {
    fetch(`/admin/boardReport/view/${brid}`, {
      method: 'GET',
      headers: {
        'Content-type' : 'application/json'
      },
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Network response was not ok: ${resp.status}`);
      }
      return resp.json();
    })
    .then((data) => {
      setBoardReport((prevBoardReport) => ({
        ...prevBoardReport,
        brid: data.boardReport.br_id,
        b_reporter: data.boardReport.b_reporter,
        b_reason: data.boardReport.b_reason,
        community: data.boardReport.community,
        reportStatus: data.boardReport.reportStatus
      }));
      console.log("data 확인: ", data);
      console.log("BOARDREPORT 확인:", boardReport);
    })
  }
  
  const movePage = useNavigate();
  const stausChange = (brid) => {
   fetch(`/admin/status/${brid}`, {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
   })
   .then(()=> {
    reportClose();
    window.location.reload();
   })
  }

  return(
      <div className="reports">
        <div className="rMenu">
          <Button onClick={()=>setReportState('boardReport')} style={reportState === 'boardReport'? {backgroundColor: '#B89E97', color: 'white', fontWeight:'500'} : {backgroundColor: 'transparent', color: 'black', border: '1px solid black'}}>게시글 신고내역</Button>
          <Button onClick={()=>setReportState('commentReport')} style={reportState === 'commentReport'? {backgroundColor: '#B89E97', color: 'white',fontWeight:'500'} : {backgroundColor: 'transparent', color: 'black', border: '1px solid black'}}>댓글 신고내역</Button>
        </div>
        <div className="rboard">
          {
            reportState === 'boardReport'
            ?
              <div className="bReport">
                <Table bgcolor="transparent">
                  <thead>
                    <tr>
                      <th>신고번호</th>
                      <th>신고자</th>
                      <th>신고사유</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      boardReports.map((report, index) => (
                        <tr key={index}>
                          <td>{report.br_id}</td>
                          <td>{report.b_reporter}</td>
                          {
                            report.reportStatus === "no"
                            ?<td onClick={()=>reportOpen(report.br_id)}>{report.b_reason}</td>
                            :<td style={{textDecoration:'line-through', cursor: 'default'}}>{report.b_reason}</td>
                          }
                          
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                <Pagination activePage={bPage} itemsCountPerPage={10} totalItemsCount={parseInt(bTotalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handleBPageChange}/>
              </div>
           :
              <div className="cReport">
                <Table>
                  <thead>
                    <tr>
                      <th>신고번호</th>
                      <th>신고자</th>
                      <th>신고사유</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      commentReports.map((report, index) => (
                        <tr key={index}>
                          <td>{report.cr_id}</td>
                          <td>{report.c_reporter}</td>
                          <td>{report.c_reason}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                <Pagination activePage={cPage} itemsCountPerPage={10} totalItemsCount={parseInt(cTotalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handleCPageChange}/>
              </div>
          }
        </div>
        <div className="reportView">
          <Modal show={show} onHide={reportClose}>
            <Modal.Header closeButton>
              <Modal.Title>상세 신고 내역</Modal.Title>
            </Modal.Header>
              {
                reportState === 'boardReport'
                ?
                <>
                <Modal.Body>
                  <FormGroup className="mb-3">
                    <FormControl type="text" plaintext readOnly value={boardReport.b_reporter}/>
                    <FormControl as="textarea" plaintext readOnly value={boardReport.b_reason} style={{ resize: "none" }} rows={5} minLength={10}/>
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-dark" onClick={()=>movePage(`/community/view/${boardReport.community.bnum}`)}>원글가기</Button>
                  <Button variant="outline-dark" onClick={()=>stausChange(boardReport.brid)}>처리완료</Button>
                </Modal.Footer>
                </>
                :
                <Modal.Body>
                  <FormGroup className="mb-3">
                    <FormControl as='textarea'readOnly style={{ resize: "none" }} rows={5} minLength={10} name='b_reason'/>
                  </FormGroup>
                </Modal.Body>
              }
          </Modal>
        </div>
      </div>
  )
}

export default ReportList;