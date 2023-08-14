import * as React from "react";
import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/material/styles";
import { BACKEND_URL } from "../utils/Constants";
import ApiHelper from "../utils/ApiHelper";
import ToastHelper from "../utils/ToastHelper";
import { useState, useEffect } from "react";

const PREFIX = 'EmpSaatliqIcaze';

const classes = {
  content: `${PREFIX}-content`,
  title: `${PREFIX}-title`,
  card: `${PREFIX}-card`,
  space: `${PREFIX}-space`
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
    background: "rgb(30, 136, 229)",
    height: "220px",
    position: "relative",
    overflow: "hidden",
    transition: "boxShadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: "12px",

    "&::before": {
      content: "''",
      position: "absolute",
      width: "210px",
      height: "210px",
      background: "rgb(21, 101, 192)",
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
      background: "rgb(21, 101, 192)",
      borderRadius: "50%",
      top: "-85px",
      right: "-95px",
      zIndex: "1",
    },
  },

  [`& .${classes.space}`]: {
    margin: "6px 0 6px 0",
  }
}));

const GET_SAATLIQ_ICAZE =
  BACKEND_URL + "/api/EmpIcazeSaat/GetIcazeSaatByEmpId/";

export default function EmpSaatliqIcaze(props) {

  const [data, setData] = useState([]);

  const loadSaatliqIcaze = (id) => {
    console.log(id)
    ApiHelper.getMethod(
      GET_SAATLIQ_ICAZE + id,
      () => {},
      ToastHelper.error,
      (data) => {
        console.log("saatliqicaze", data);
        setData(data ? data[0] : []);
      }
    );
  };
  useEffect(() => {
    loadSaatliqIcaze(props.empId);
  }, []);
  
  console.log("dataaaa", data.length);
  return (
    <StyledCard className={classes.card}>
      <CardContent style={{ padding: "20px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            color: "rgb(144, 202, 249)",
            marginBottom: "20px",
            fontStyle: "italic",
            zIndex: "1000 !important",
          }}
        >
          Saatlıq İcazə Məlumatı
        </Typography>
        <Typography component={"div"}>
          <Typography variant="p" component="div" className={classes.title}>
            İstifadə edilə bilər :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data.canBeUsedIcaze} dəfə
          </Typography>
        </Typography>
        <Typography component={"div"} className={classes.space}>
          <Typography variant="p" component="div" className={classes.title}>
            İstifadə edilmiş müddət :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data.canBeUsedIcaze === '2' ? `0  ${data.usedPeriod}` : data.usedPeriod}
          </Typography>
        </Typography>

        <Typography component={"div"}>
          <Typography variant="p" component="div" className={classes.title}>
            Cari Qalıq(bu günə olan) :
          </Typography>
          <Typography
            component="span"
            variant="body2"
            className={classes.content}
          >
            {data.canBeUsedIcaze === '2' ? '6 saat': data.currentBalance}
          </Typography>
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
