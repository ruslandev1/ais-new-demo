import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BACKEND_URL } from "../utils/Constants";
import ApiHelper from "../utils/ApiHelper";
import ToastHelper from "../utils/ToastHelper";

const PREFIX = 'EmpMezuniyyet';

const classes = {
  content: `${PREFIX}-content`,
  title: `${PREFIX}-title`,
  card: `${PREFIX}-card`,
  space: `${PREFIX}-space`,
  cardContent: `${PREFIX}-cardContent`
};

const StyledCard = styled(Card)(() => ({
  [`& .${classes.content}`]: {
    color: "white",
    marginLeft: "5px",
    fontSize: "16px",
    opacity: "0.8",
  },

  [`& .${classes.title}`]: {
    color: "white",
    display: "inline-block",
    fontSize: "16px",
    opacity: "0.8",
  },

  [`&.${classes.card}`]: {
    height: "max-content",
    backgroundColor: "rgb(94, 53, 177)",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    transition: "boxShadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "210px",
      height: "210px",
      background: "rgb(69, 39, 160)",
      borderRadius: "50%",
      top: "-125px",
      right: "-15px",
      opacity: "0.5",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      width: "160px",
      height: "210px",
      background: "rgb(69, 39, 160)",
      borderRadius: "50%",
      top: "-85px",
      right: "-95px",
      zIndex: "1",
    },
  },

  [`& .${classes.space}`]: {
    margin: "6px 0 6px 0",
  },

  [`& .${classes.cardContent}`]: {
    padding: "20px", paddingRight: "30px"
  }
}));

const GET_VACATION_MAIN_DATA =
  BACKEND_URL + "/api/EmpVacation/VacationMainData/";

const GET_VACATION_MAIN_YEAR =
  BACKEND_URL + "/api/EmpVacation/GetEmpMezuniyyetIli/";



let vacYear = new Date().getFullYear();
export {};
const EmpMezuniyyet = (props) => {
  const [data, setData] = useState({});
  const [year, setYear] = useState(vacYear);
  const loadVacData = (id, year) => {
    ApiHelper.getMethod(
      GET_VACATION_MAIN_DATA + "?empId=" + id + "&vacYear=" + year,
      () => {},
      ToastHelper.error,
      (data) => {
        console.log("data", data);
        
        setData(data);
      }
    );
  };
  const loadVacYear= (id) => {
    ApiHelper.getMethod(
      GET_VACATION_MAIN_YEAR + "?empId=" + id ,
      () => {},
      ToastHelper.error,
      (data) => {
        
        loadVacData(props.empId, data);
      }
    );
  };

  console.log('year236',year);

  // useEffect(() => {
  //   console.log('useeffect year',year);
  //   loadVacData(props.empId, year);
  // }, [props.empId, year]);

  useEffect(() => {
    loadVacYear(props.empId);
  }, [props.empId]);



  return (
    <StyledCard className={classes.card}>
      <CardContent className="cardContent">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            color: "rgb(179, 157, 219)",
            fontStyle: "italic",
            marginBottom: "20px",
          }}
        >
          Məzuniyyət Məlumatı
        </Typography>
        <Typography component={"div"} className={classes.space}>
          <Typography variant="p" component="div" className={classes.title}>
            Bu ilə olan məzuniyyət günü :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data?.header?.tillTodayVacDay} gün
          </Typography>
        </Typography>
        <Typography component={"div"} className={classes.space}>
          <Typography variant="p" component="div" className={classes.title}>
            Ötən ildən qalan məzuniyyət günü :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data?.header?.otenIldenQalmaQaliq} gün
          </Typography>
        </Typography>
        <Typography component="div" className={classes.space}>
          <Typography variant="p" component="div" className={classes.title}>
            İstifadə edilmiş məzuniyyət günü :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data?.header?.usedVacDay} gün
          </Typography>
        </Typography>
        <Typography component="div" className={classes.space}>
          <Typography variant="p" component="div" className={classes.title}>
            Cari Qalıq(bu günə olan) :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data?.header?.balanceVacDay} gün
          </Typography>
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default EmpMezuniyyet;
