import { useEffect, useState } from "react";
import '../../styles/Report.css';
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

const ReportList = () => {
   
  const [boardReports, setBoardReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);
  const [bPage, setBPage] = useState(1);
  const [cPage, setCPage] = useState(1);
  const [bTotalPages, setBTotalPages] = useState(0);
  const [cTotalPages, setCTotalPages] = useState(0);
  const [bTotalElements, setBTotalElements] = useState(0);
  const [cTotalElements, setCTotalElements] = useState(0);

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
    const currentPage = Math.max(selectedPage, 1);
    setBPage(currentPage);
  }

  const handleCPageChange = async(selectedPage) => {
    const currentPage = Math.max(selectedPage, 1);
    setCPage(currentPage);
  }

  const [show ,setShow] = useState(false);
  const reportOpen = () => setShow(true);
  const reportClose = () => setShow(false);

    return(
        <div className="reports">
          <div className="rboard">
            <div className="bReport">
            <legend>게시글 신고내역</legend>
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
                        <td>{report.b_reason}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Pagination activePage={bPage} itemsCountPerPage={10} totalItemsCount={parseInt(bTotalElements)} pageRangeDisplayed={5} prevPageText={"<"} nextPageText={">"} onChange={handleBPageChange}/>
            </div>
            <div className="cReport">
            <legend>댓글 신고내역</legend>
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
          </div>
          
        </div>
    )
}

export default ReportList;