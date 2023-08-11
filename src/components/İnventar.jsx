import * as React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Title from "./Title";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActionsWrapped from "./TablePaginationActions";
import { useState,useEffect } from "react";
import { TableContainer, TableFooter } from "@mui/material";
import { BACKEND_URL } from "../utils/Constants";
import ApiHelper from "../utils/ApiHelper";
import ToastHelper from "../utils/ToastHelper";

const GET_INV_LIST = BACKEND_URL + "/api/InvOperation/GetInvListByEmpId/";
const GET_INV_REPORT_LIST = BACKEND_URL +'/api/Report/ReportList/'
export default function EmpInventar(props) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [reportList, setReportList] = useState([]);
  const handleChangePage = (e, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, results.length - page * rowsPerPage);

  const loadInvList = (id) => {
    ApiHelper.getMethod(
      GET_INV_LIST + id,
      () => {},
      ToastHelper.error,
      (data) => {
        console.log('invdata',data);
         setResults(data??[]);
      }
    );
  };
  const loadInvReportList = (id) => {
    ApiHelper.getMethod(
      GET_INV_REPORT_LIST +id,
      () => {},
      ToastHelper.error,
      (data) => {
        console.log('invreportdata',data);
        setReportList(data??[]);
      }
    );
  };
  useEffect(()=>{
    loadInvList(props.empId)
  },[])

  return (
    <TableContainer  style={{ height: "220px", }}>
      <Title> Adında olan inventarların siyahısı</Title>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>İnventar Kodu</TableCell>
            <TableCell>İnventar Adı</TableCell>
            <TableCell>İnventar No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results 
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.faregistRef}>
                <TableCell component="th" scope="row">
                 {row.invCode}
                </TableCell>
                <TableCell>{row.invName}</TableCell>
                <TableCell>{row.invNo}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
<TableFooter>

      <TablePagination
        labelRowsPerPage={"Səhifədəki sətr sayı"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} aralığı cəmi ${count}`
        }
        rowsPerPageOptions={[1]}
        component="div"
        count={ results.length }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // ActionsComponent={TablePaginationActionsWrapped}
      />
</TableFooter>
      {/* { reportList && <Link
      component="button"
      variant="body2"
      style={{float:'right',padding:'10px',}}
      onClick={() => {
        loadInvReportList(464)
      }}
    >
      Daha çox
    </Link>} */}
    </TableContainer>
  );
}
