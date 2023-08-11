import React, { useState,useEffect} from "react";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { TableContainer } from "@mui/material";
import ApiHelper from '../utils/ApiHelper';
import ToastHelper from '../utils/ToastHelper';
import { BACKEND_URL } from '../utils/Constants';
import * as moment from "moment"
const GET_IN_OUT_TIME = BACKEND_URL + "/api/Employee/GetGirisCixisSaatByEmpId/";

const EmpGirisCixis = (props) => {
  const [results, setResults] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(3);
  // const handleChangePage = (e, page) => {
  //   setPage(page);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 1));
  //   setPage(0);
  // };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, results.length - page * rowsPerPage);

    const loadInOutTimeList = (id) => {
      ApiHelper.getMethod(
        GET_IN_OUT_TIME + id,
        () => {},
        ToastHelper.error,
        (data) => {
          console.log('issat',data);
           setResults(data??[]);
        }
      );
    };
    useEffect(()=>{
      loadInOutTimeList(props.empId)
    },[])
  return (
    <TableContainer  style={{ height: "220px" }}>
      <Title> Giriş/Çıxış məlumatları</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Giriş</TableCell>
            <TableCell>Çıxış</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results
            .map((row) => (
              <TableRow>
                <TableCell>{moment(row.giris).format('YYYY.MM.DD HH:mm A')}</TableCell>  
                <TableCell>{row.cixis === null ? '' : moment(row.cixis).format('YYYY.MM.DD HH:mm A')}</TableCell>
              </TableRow>
            ))}
          {/* {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
      {/* <TablePagination
        labelRowsPerPage={"Səhifədəki sətr sayı"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} aralığı cəmi ${count}`
        }
        rowsPerPageOptions={[1]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActionsWrapped}
      /> */}
    </TableContainer>
  );
};

export default EmpGirisCixis;
