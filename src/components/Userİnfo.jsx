import React from "react";
import { styled } from '@mui/material/styles';
import { withStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import Card from "./Card";
import CardAvatar from "./CardAvatar";
import CardBody from "./CardBody";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import {
  avrFetch,
  readResponseAsBlob,
  readResponseAsJSON,
  validateResponse,
} from "../utils/AvroraFetch";

import { BACKEND_URL } from "../utils/Constants";
import { isEmpty } from "../utils";

const PREFIX = 'Home';

const classes = {
  cardCategory: `${PREFIX}-cardCategory`,
  cardTitle: `${PREFIX}-cardTitle`,
  cardTitleWhite: `${PREFIX}-cardTitleWhite`,
  tableCellLabel: `${PREFIX}-tableCellLabel`,
  tableCellValue: `${PREFIX}-tableCellValue`
};

const StyledGrid = styled(Grid)({
  [`& .${classes.cardCategory}`]: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  [`& .${classes.cardTitle}`]: {
    color: "#3C4858",
    marginTop: "2px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  [`& .${classes.cardTitleWhite}`]: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  [`& .${classes.tableCellLabel}`]: {
    width: "40%",
    color: "#777",
    fontSize: "0.75rem",
    fontWeight: "500",
    textAlign: "left",
    padding: "10px",
  },
  [`& .${classes.tableCellValue}`]: {
    width: "60%",
    fontSize: "0.75rem",
    fontWeight: "500",
    textAlign: "left",
    padding: "10px",
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        fatherName: "",
        email: "",
        bdate: "",
        lastLogin: "",
        lastIp: "",
        empPosTitle: "",
        depTitle: "",
        username: "",
      },
    };
    this.imgRef = React.createRef();
  }

  componentWillMount() {
    this.loadProfileImg();
    this.fetchUserInfo();
  }

  loadProfileImg() {
    avrFetch(BACKEND_URL + "/api/User/img/", {
      cache: "default",
    })
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then((myBlob) => {
        const file = new Blob([myBlob], { type: "image/jpeg" });
        let fileUrl = (window.URL || window.webkitURL).createObjectURL(file);
        console.log("fileUrlfileUrl: ", fileUrl);
        this.imgRef.current.src = fileUrl;
      })
      .catch((reason) =>
        this.setState(
          Object.assign({}, this.state, {
            loading: false,
            errors: reason.message,
          })
        )
      );
  }

  fetchUserInfo() {
    avrFetch(BACKEND_URL + "/api/User/Get/")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        if (!isEmpty(response) && response.success === true) {
          this.setState(Object.assign({}, this.state, { user: response.data }));
        }
      })
      .catch((reason) => {});

    // fetchHelper.fetchCustom('/api/User/Get/').then(value => {
    //     this.setState({user: value.data});
    // }).catch(reason => {
    //     console.log(reason)
    // });
  }

  render() {
    // return (<TreeDataTest/>)
    // return (<DevExpressDataGrid/>)

    const { } = this.props;
    const { user } = this.state;
    if (isEmpty(user)) return <div />;
    return (
      // <Grid container >
        // <Grid item xs={12} >
        //   <Grid
        //     container
        //     spacing={1}
        //     alignItems={"center"}
        //     direction={"row"}
        //     justifyContent={"center"}
        //   >
        //     {/* <Grid item xs={4} /> */}
        //     <Grid>
              <Card profile style={{ minWidth: "30%" ,borderRadius:'12px'}}>
                <CardAvatar profile>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      ref={this.imgRef}
                      src="http://www.markweb.in/primehouseware/images/noimage.png"
                      alt="profile picture"
                    />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>
                    {user.empPosTitle} / {user.depTitle}
                  </h6>
                  <h4 className={classes.cardTitle}>
                    {user.firstName} {user.lastName}
                  </h4>
                  <Table className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCellLabel} />
                        <TableCell className={classes.tableCellValue} />
                      </TableRow>
                      {/* <TableRow>
                        <TableCell className={classes.tableCellLabel}>
                          Ata Adı:{" "}
                        </TableCell>
                        <TableCell className={classes.tableCellValue}>
                          {user.fatherName}
                        </TableCell>
                      </TableRow> */}
                      {/* <TableRow>
                        <TableCell className={classes.tableCellLabel}>
                          Doğum tarixi:{" "}
                        </TableCell>
                        <TableCell className={classes.tableCellValue}>
                          {user.bdate}
                        </TableCell>
                      </TableRow> */}
                      {/* <TableRow>
                        <TableCell className={classes.tableCellLabel}>
                          Elektron Poçt:
                        </TableCell>
                        <TableCell className={classes.tableCellValue}>
                          {user.email}
                        </TableCell>
                      </TableRow> */}
                      {/* <TableRow>
                        <TableCell className={classes.tableCellLabel}>
                          Sisteme son daxil olduğu tarix:{" "}
                        </TableCell>
                        <TableCell className={classes.tableCellValue}>
                          {user.lastLogin}
                        </TableCell>
                      </TableRow> */}
                      {/* <TableRow>
                        <TableCell className={classes.tableCellLabel}>
                          Sisteme son daxil olduğu ip:{" "}
                        </TableCell>
                        <TableCell className={classes.tableCellValue}>
                          {user.lastIp}
                        </TableCell>
                      </TableRow> */}
                      {/* <TableRow>
                        <TableCell colSpan={2} />
                      </TableRow> */}
                      <TableRow>
                        <TableCell
                          className={classes.tableCellLabel}
                          colSpan={2}
                          style={{ textAlign: "center" }}
                        >
                          <a
                            href={"/shortcut-links"}
                            style={{ color: "#0000EE", textDecoration: "none" }}
                          >
                            Çox istifadə edilən keçidlər üçün buraya klik edin
                          </a>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {/*<p className={classes.description}>*/}
                  {/*qısa məlumat.....*/}
                  {/*</p>*/}
                </CardBody>
              </Card>
        //     </Grid>
        //     <Grid item xs={4} />
        //   </Grid>
        // </Grid>
      // </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (Home);
