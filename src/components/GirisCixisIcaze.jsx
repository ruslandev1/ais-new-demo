import React, { useState,useEffect} from "react";
import dayjs from "dayjs";
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

const GET_IN_OUT_TIME = BACKEND_URL + "/api/Employee/GetGirisCixisSaatByEmpId/";

const EmpGirisCixis = (props) => {
  const [results, setResults] = useState([]);
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
                <TableCell>{dayjs(row.giris).format('YYYY.MM.DD HH:mm A')}</TableCell>
                <TableCell>{row.cixis === null ? '' : dayjs(row.cixis).format('YYYY.MM.DD HH:mm A')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpGirisCixis;
