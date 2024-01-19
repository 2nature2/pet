import { useEffect, useState } from "react";
import SideBar from "../Navigation/SideBar";
import axios from "axios";

const ReportList = () => {
    const [bReport, setBReport] = useState([]);
    const [rpage, setRPage] = useState(0);
    const [rTotalPages, setRTotalPages] = useState(0);
    const [rTotalElements, setRTotalElements] = useState(0);
  
    // const loadBoardReport = async() => {
    //   try{
    //     const response = await axios.get(`/admin/report/?page=${rpage}`);
    //     setBReport(response.data.content);
    //     setRTotalPages(response.data.totalPages);
    //     setRTotalElements(response.data.totalElements);
    //     console.log('ReportReponse', response);
    //     return response.data;
    //   } catch(error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     await loadBoardReport(rpage);
    //   };
    //   fetchData();
    //   // eslint-disable-next-line
    // }, [rpage]);


    return(
        <div>
            <SideBar/>
            
        </div>
    )
}

export default ReportList;