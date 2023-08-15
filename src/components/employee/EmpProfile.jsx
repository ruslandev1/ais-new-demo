import React, { Fragment } from "react";
import { styled } from '@mui/material/styles';
import {
  avrFetch,
  readResponseAsBlob,
  readResponseAsJSON,
  validateResponse,
} from "../../utils/AvroraFetch";
import { BACKEND_URL } from "../../utils/Constants";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Avatar as CardAvatar } from "@mui/material";
import {CardMedia} from "@mui/material";
import { Address } from "../AdressSelector";
import { isEmpty } from "../../utils";
import * as moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../reportV2/DialogHelper";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ImageUpload from "../imageUpload";
import { UserHasAccessInfoId } from "../../utils/common";

const PREFIX = 'EmpProfile';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  container: `${PREFIX}-container`,
  textField: `${PREFIX}-textField`,
  dense: `${PREFIX}-dense`,
  menu: `${PREFIX}-menu`
};

const StyledTableRow = styled(TableRow)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },

  [`& .${classes.table}`]: {
    minWidth: 700,
    marginBottom: theme.spacing(3),
  },

  [`& .${classes.container}`]: {
    display: "flex",
    flexWrap: "wrap",
  },

  [`& .${classes.textField}`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  [`& .${classes.dense}`]: {
    marginTop: 16,
  },

  [`& .${classes.menu}`]: {
    width: 200,
  }
}));

const inputStyle = {
  width: "100%",
  padding: "7px 12px",
  margin: "6px 0",
  display: "inline-block",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
  background: "white",
};

class EmpProfile extends React.Component {
  constructor(props) {
    super(props);
    this.empId = this.props.empId;
    this.state = {
      empData: {
        empId: this.empId,
        cardNo: "",
        firstName: "",
        lastName: "",
        fatherName: "",
        stateId: 0,
        placeOfBirth: new Address(),
        regAddress: new Address(),
        curAddress: new Address(),
        birthDate: 0,
        fin: "",
        maritalStatus: "",
        gender: "",
        authority: "",
        dateOfIssue: 0,
        dateOfExpiry: 0,
        citizenship: "",
        identityDoc: "",
        kvotaStatus: [],
        dsmfCardNo: "",
        militaryObliged: "",
        c1Code: "", // BIR CE KODU :-)
        xusMezStatus: "",
      },
      empPos: [],
      empCurrentPos: {
        empPosId: 0,
        depTitle: "",
        posTitle: "",
        startDate: 0,
      },
      empEdu: {
        empInst: [],
        empCourse: [],
        empCertificate: [],
      },
      empContact: [],
      langSkills: [],
      compSkills: [],
      empChildren: [],
      empWorkExperience: [],
      open: false,
    };
    console.log("EMPPROFILEIDCHECK",this.state);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    this.loadProfileImg();
    this.loadEmpData();
    this.loadEmpPos();
    this.loadEmpEdu();
    this.loadEmpCourse();
    this.loadEmpCertificate();
    this.loadEmpContact();
    this.loadLangSkills();
    this.loadCompSkills();
    this.loadEmpChildren();
    this.loadCurrentEmpPos();
    this.loadEmpWorkExperience();
  }

  render() {
    const empInst = this.state.empEdu.empInst;
    const empCourse = this.state.empEdu.empCourse;
    const empCertificate = this.state.empEdu.empCertificate;
    const empContact = this.state.empContact;
    const empPos = this.state.empPos;
    return (
      <Fragment>
        <Card style={{ marginTop: 0 }}>
          <Grid style={{ flexGrow: 1, padding: 0 }}>
            <Grid
              item
              xs={12}
              container
              spacing={0}
              alignItems={"flex-start"}
              direction={"row"}
              justifyContent={"flex-start"}
            >
              <Grid item xs={2} />
              <Grid item xs={10}>
                <h1 style={{ color: "" }}>
                  {this.state.empData.firstName} {this.state.empData.lastName}{" "}
                </h1>{" "}
                {/*style={{color: '#0052cc'}}*/}
                <h2 style={{ color: "" }}>
                  {isEmpty(this.state.empCurrentPos)
                    ? ""
                    : this.state.empCurrentPos.posTitle}
                </h2>
                <p style={{ color: "red" }}>
                  {this.state.empData.stateId === 2 ? "işdən azad olunub" : ""}
                </p>
              </Grid>
              <Grid item xs={2}>
                <CardAvatar profile square="true">
                  <a href="#pablo" onClick={(e) => this.handleClickOpen(e)}>
                    <img
                      ref={this.imgRef}
                      src="http://www.markweb.in/primehouseware/images/noimage.png"
                      alt="..."
                    />
                  </a>
                </CardAvatar>
                <CardMedia
                  profile
                  square="true"
                  style={{ justifyContent: "center" }}
                >
                  <h5>İstifadəçi adı: {this.state.empData.username}</h5>
                  <h5>
                    Doğum tarixi:{" "}
                    {this.state.empData.birthDate === 0
                      ? ""
                      : moment
                          .utc(this.state.empData.birthDate * 1000)
                          .format("DD-MM-YYYY")
                          .toString()}
                  </h5>
                  <h5>
                    Struktur qurum:{" "}
                    {isEmpty(this.state.empCurrentPos)
                      ? ""
                      : this.state.empCurrentPos.depTitle}
                  </h5>
                  <h5>
                    İşə başladığı tarix:{" "}
                    {this.state.empCurrentPos.startDate === 0
                      ? ""
                      : moment
                          .utc(this.state.empCurrentPos.startDate * 1000)
                          .format("DD-MM-YYYY")
                          .toString()}
                  </h5>
                  <h5>
                    Elektron poçt:{" "}
                    {empContact.map((item) =>
                      item.contactType === "Elektron poçt"
                        ? item.contactText
                        : ""
                    )}
                  </h5>
                  <h5>
                    Mobil telefon:
                    {/* {empContact.map((item) =>

                    
                      item.contactType === "Mobil" ? item.contactText : ""
                  )} */}
                  empContact.map((item))
                  </h5>
                  {/* <p>
                                        qısa məlumat.....
                                    </p> */}
                </CardMedia>
              </Grid>
              <Grid item xs={10}>
                <CardMedia profile square="true">
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h3 style={{ color: "#0047b3" }}> Şəxsi məlumatlar </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <label htmlFor="fname">Adı</label>
                          <input
                            disabled="disabled"
                            value={this.state.empData.firstName}
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="lname">Soyadı</label>
                          <input
                            disabled="disabled"
                            value={this.state.empData.lastName}
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="fname">Ata adı</label>
                          <input
                            disabled="disabled"
                            value={this.state.empData.fatherName}
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="username">İstifadəçi adı</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.username)
                                ? ""
                                : this.state.empData.username
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <label htmlFor="citizenship">Vətəndaşlığı</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.citizenship)
                                ? ""
                                : this.state.empData.citizenship
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <label htmlFor="regAddress">Qeydiyyat ünvanı</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.regAddress)
                                ? ""
                                : this.state.empData.regAddress.addressTitle
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="birthDate">Doğum tarixi</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.birthDate === 0
                                ? ""
                                : moment
                                    .utc(this.state.empData.birthDate * 1000)
                                    .format("DD-MM-YYYY")
                                    .toString()
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="identityDoc">
                            Vətəndaşlığı təsdiq edən sənəd
                          </label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.identityDoc
                                ? this.state.empData.identityDoc
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="cardNo">Şəxsiyyət vəsiqəsi №</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.cardNo
                                ? this.state.empData.cardNo
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="fin">Fin kodu</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.fin
                                ? this.state.empData.fin
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="c1Code">1C kodu</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.c1Code)
                                ? ""
                                : this.state.empData.c1Code
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="authority">ŞV verən orqan</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.authority
                                ? this.state.empData.authority
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="dateOfIssue">ŞV Verilmə Tarixi</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.dateOfIssue === 0
                                ? ""
                                : moment
                                    .utc(this.state.empData.dateOfIssue * 1000)
                                    .format("DD-MM-YYYY")
                                    .toString()
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="dateOfExpiry">ŞV Bitmə Tarixi</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.dateOfExpiry === 0
                                ? ""
                                : moment
                                    .utc(this.state.empData.dateOfExpiry * 1000)
                                    .format("DD-MM-YYYY")
                                    .toString()
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="gender">Cinsiyyəti</label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.gender
                                ? this.state.empData.gender
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="maritalStatus">Ailə vəziyyəti</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.maritalStatus)
                                ? ""
                                : this.state.empData.maritalStatus
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="militaryObliged">
                            Hərbi mükəlləfiyyəti
                          </label>
                          <input
                            disabled="disabled"
                            value={
                              this.state.empData.militaryObliged
                                ? this.state.empData.militaryObliged
                                : ""
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <label htmlFor="dsmfCardNo">DSMF Kart №</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.dsmfCardNo)
                                ? ""
                                : this.state.empData.dsmfCardNo
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <label htmlFor="placeOfBirth">Doğulduğu yer</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.placeOfBirth)
                                ? ""
                                : this.state.empData.placeOfBirth.addressTitle
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <label htmlFor="curAddress">
                            Faktiki yaşadığı ünvan
                          </label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.curAddress)
                                ? ""
                                : this.state.empData.curAddress.addressTitle
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <label htmlFor="kvotaStatus">Kvota status</label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.kvotaStatus)
                                ? []
                                : this.state.empData.kvotaStatus.map(
                                    (item) => item.familyStatusTitle
                                  )
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <label htmlFor="xusMezStatus">
                            Xüsusi məzuniyyət statusu
                          </label>
                          <input
                            disabled="disabled"
                            value={
                              isEmpty(this.state.empData.xusMezStatus)
                                ? ""
                                : this.state.empData.xusMezStatus
                            }
                            style={inputStyle}
                          />
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={12}>
                            <h4>Uşaqları haqqında məlumat</h4>
                          </Grid>
                          <Table>
                            <TableHead>
                              <StyledTableRow>
                                <TableCell>Cinsiyyyəti</TableCell>
                                <TableCell align="right">
                                  Doğum tarixi
                                </TableCell>
                                <TableCell align="right">Yaş</TableCell>
                                <TableCell align="right">
                                  Sağlamlıq məhdudiyyəti
                                </TableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {this.state.empChildren.map((item) =>
                                this.getChildrenList(item)
                              )}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h3 style={{ color: "#0047b3", marginTop: 30 }}>
                        {" "}
                        İş məlumatları{" "}
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid container item xs={12} spacing={2}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Struktur qurum</TableCell>
                                <TableCell align="right">Vəzifə</TableCell>
                                <TableCell align="right">
                                  Başladığı tarix
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {empPos.map((row) => this.getPosList(row))}
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid item xs={12}>
                          <h4>Staj məlumatları</h4>
                        </Grid>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Başladığı tarix</TableCell>
                              <TableCell align="right">Son tarix</TableCell>
                              <TableCell align="right">İl</TableCell>
                              <TableCell align="right">Ay</TableCell>
                              <TableCell align="right">Gün</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.empWorkExperience.map((item) =>
                              this.getWorkExperienceList(item)
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h3 style={{ color: "#0047b3", marginTop: 30 }}>
                        {" "}
                        Təhsil{" "}
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={12}>
                            <h4>Təhsil məlumatları</h4>
                          </Grid>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Tarix</TableCell>
                                <TableCell align="right">Növü</TableCell>
                                <TableCell align="right">
                                  Təhsil müəssisəsinin adı
                                </TableCell>
                                <TableCell align="right">İxtisas</TableCell>
                                <TableCell align="right">Bal</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {empInst.map((row) => this.getEduList(row))}
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={12}>
                            <h4>Keçdiyi kurslar</h4>
                          </Grid>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kursun adı</TableCell>
                                <TableCell align="right">Tarix</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {empCourse.map((row) => this.getCourseList(row))}
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={12}>
                            <h4>Aldığı sertifikatlar</h4>
                          </Grid>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Qurum</TableCell>
                                <TableCell align="right">
                                  Sertifikatın adı
                                </TableCell>
                                <TableCell align="right">Bal</TableCell>
                                <TableCell align="right">Tarix</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {empCertificate.map((row) =>
                                this.getCertificateList(row)
                              )}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h3 style={{ color: "#0047b3", marginTop: 30 }}>
                        {" "}
                        Əlaqə{" "}
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Kontakt növü</TableCell>
                              <TableCell align="right">Kontakt</TableCell>
                              <TableCell align="right">Qeyd</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {empContact.map((item) =>
                              this.getContactList(item)
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h3 style={{ color: "#0047b3", marginTop: 30 }}>
                        {" "}
                        Əlavə Biliklər{" "}
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid container item xs={5}>
                          <Grid item xs={12}>
                            <h4>Dil bilikləri</h4>
                          </Grid>
                          <Table>
                            <TableBody>
                              {this.state.langSkills.map((item) =>
                                this.getLangList(item)
                              )}
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid container item xs={5}>
                          <Grid item xs={12}>
                            <h4>Kompyuter bacarıqları</h4>
                          </Grid>
                          <Table>
                            <TableBody>
                              {this.state.compSkills.map((item) =>
                                this.getCompList(item)
                              )}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </CardMedia>
                {/*</Card>*/}
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Dialog
          maxWidth={"sm"}
          fullWidth={true}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Şəklin dəyişdirilməsi
          </DialogTitle>
          <DialogContent>
            <ImageUpload
              empId={this.empId}
              whenUploaded={() => {
                console.log("img uploaded");
                this.loadProfileImg();
                this.handleClose();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Bağla
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }

  showHideSnackbar = (message, variant, show) => {
    if (show === undefined) show = true;
    if (variant === undefined) variant = "error";
    this.setState(
      Object.assign({}, this.state, {
        snackBar: Object.assign({}, this.state.snackBar, {
          show,
          message,
          variant,
        }),
        dataLoaded: true,
      })
    );
  };

  handleClickOpen = (e) => {
    e.preventDefault();
    if (!UserHasAccessInfoId([172])) return;
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadProfileImg() {
    avrFetch(BACKEND_URL + "/api/User/imgbyid/" + this.empId)
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then((myBlob) => {
        const file = new Blob([myBlob], { type: "image/jpeg" });
        let fileUrl = (window.URL || window.webkitURL).createObjectURL(file);
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

  loadEmpData = () => {
    avrFetch(BACKEND_URL + "/api/Employee/GetProfileData/" + this.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          //console.log('value: ', value);
          //const masterData = value.data.masterData;
          const employeeData = value.data;

          //this.dataLoaded = true;
          if (this.empId > 0)
            this.setState(
              Object.assign({}, this.state, { empData: employeeData })
            );
        } else {
          this.setState4SnackBarData(value.ResponseMessage, "error");
        }
      })
      .catch((reason) => {
        //console.log(reason);
      });
  };

  loadCurrentEmpPos = () => {
    avrFetch(
      BACKEND_URL + "/api/EmpPosition/GetEmpPosIsLast?empId=" + this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          this.setState(
            Object.assign({}, this.state, {
              empCurrentPos: Object.assign({}, this.state.empCurrentPos, {
                empPosId: value.data.empPosId,
                depTitle: value.data.dep.label,
                posTitle: value.data.pos.label,
                startDate: value.data.startDate,
              }),
            })
          );
        } else {
          this.showHideSnackbar(value.responseMessage, "error", true);
        }
      })
      .catch((err) => {
        this.showHideSnackbar(err.message, "error", true);
      });
  };

  loadEmpEdu = () => {
    avrFetch(
      BACKEND_URL + "/api/Education/GetEducationByEmpId?empId=" + this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //(item.empEduInfoId, item.eduInstType === null ? '' : item.eduInstType.label, item.eduInstName, item.ixtisas, item.score,  item.startDate, item.endDate, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empEdu: Object.assign({}, this.state.empEdu, {
                    empInst: [
                      ...prevState.empEdu.empInst,
                      {
                        empEduInfoId: item.empEduInfoId,
                        eduInstName: item.eduInstName,
                        eduInstType:
                          item.eduInstType === null
                            ? ""
                            : item.eduInstType.label,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        score: item.score,
                        ixtisas: item.ixtisas,
                      },
                    ],
                  }),
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpCourse = () => {
    avrFetch(BACKEND_URL + "/api/EmpCource/GetCourcesEmpId?empId=" + this.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //item.id, item.title, item.beginDate, item.endDate, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empEdu: Object.assign({}, this.state.empEdu, {
                    empCourse: [
                      ...prevState.empEdu.empCourse,
                      {
                        courseId: item.id,
                        title: item.title,
                        beginDate: item.beginDate,
                        endDate: item.endDate,
                      },
                    ],
                  }),
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpCertificate = () => {
    avrFetch(
      BACKEND_URL +
        "/api/EmpCertificate/GetCertificatesByEmpId?empId=" +
        this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.id, item.orgTitle, item.title, item.grade, item.date, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empEdu: Object.assign({}, this.state.empEdu, {
                    empCertificate: [
                      ...prevState.empEdu.empCertificate,
                      {
                        certificateId: item.id,
                        orgTitle: item.orgTitle,
                        title: item.title,
                        grade: item.grade,
                        date: item.date,
                      },
                    ],
                  }),
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpContact = () => {
    avrFetch(BACKEND_URL + "/api/Contact/GetContactByEmpId?empId=" + this.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.contactId, item.contactType.label, item.contactText, item.note, item.isVisible, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empContact: [
                    ...prevState.empContact,
                    {
                      contactId: item.contactId,
                      contactType: item.contactType.label,
                      contactText: item.contactText,
                      note: item.note,
                    },
                  ],
                })
              )
          );
        } else {
          this.showHideSnackbar(value.message, "info", true);
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadLangSkills = () => {
    avrFetch(
      BACKEND_URL + "/api/LangSkill/GetLangSkillsEmpId?empId=" + this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.id, item.lang.label, item.langLevel.label, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  langSkills: [
                    ...prevState.langSkills,
                    {
                      langId: item.id,
                      lang: item.lang.label,
                      langLevel: item.langLevel.label,
                    },
                  ],
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadCompSkills = () => {
    avrFetch(
      BACKEND_URL + "/api/CompSkill/GetCompSkillsByEmpId?empId=" + this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.id, item.comp.label, item.compLevel.label, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  compSkills: [
                    ...prevState.compSkills,
                    {
                      compId: item.id,
                      comp: item.comp.label,
                      compLevel: item.compLevel.label,
                    },
                  ],
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpChildren = () => {
    avrFetch(
      BACKEND_URL +
        "/api/EmpChildren/GetChildrenByMotherEmpId?empId=" +
        this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.empChildId, item.gender.label, item.birthDate, item.yash, item.isSaglamMehdudiyyet, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empChildren: [
                    ...prevState.empChildren,
                    {
                      empChildId: item.empChildId,
                      gender: item.gender.label,
                      birthDate: item.birthDate,
                      yash: item.yash,
                      isSaglamMehdudiyyet: item.isSaglamMehdudiyyet,
                    },
                  ],
                })
              )
          );
        } else {
          this.showHideSnackbar(value.responseMessage, "error", true);
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpPos = () => {
    avrFetch(
      BACKEND_URL + "/api/EmpPosition/GetPositionsByEmpId?empId=" + this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map((item) =>
            this.setState((prevState) =>
              Object.assign({}, this.state, {
                empPos: [
                  ...prevState.empPos,
                  {
                    empPosId: item.empPosId,
                    depTitle: item.dep.label,
                    posTitle: item.pos.label,
                    startDate: item.startDate,
                  },
                ],
              })
            )
          );
        } else {
          this.showHideSnackbar(value.responseMessage, "error", true);
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  loadEmpWorkExperience = () => {
    avrFetch(
      BACKEND_URL +
        "/api/EmpWorkExperience/GetWorkExperienceByEmpId?empId=" +
        this.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          value.data.map(
            (
              item //createData(item.empWorkExpId, item.orgName, item.depName, item.posName, item.startDate, item.endDate, item.ymd, this.handleTableAction));
            ) =>
              this.setState((prevState) =>
                Object.assign({}, this.state, {
                  empWorkExperience: [
                    ...prevState.empWorkExperience,
                    {
                      empWorkExpId: item.empWorkExpId,
                      startDate: item.startDate,
                      endDate: item.endDate,
                      ymd: item.ymd,
                    },
                  ],
                })
              )
          );
        }
      })
      .catch((reason) => {
        this.showHideSnackbar(reason.message, "error", true);
      });
  };

  getEduList(value) {
    const tarixs =
      value.startDate === 0
        ? ""
        : moment
            .utc(value.startDate * 1000)
            .format("DD-MM-YYYY")
            .toString() + " / ";
    const tarixe =
      value.endDate === 0
        ? ""
        : moment
            .utc(value.endDate * 1000)
            .format("DD-MM-YYYY")
            .toString();
    return (
      <TableRow key={value.empEduInfoId}>
        <TableCell component="th" scope="row">
          {tarixs + tarixe}
        </TableCell>
        <TableCell align="right">{value.eduInstType}</TableCell>
        <TableCell align="right">{value.eduInstName}</TableCell>
        <TableCell align="right">{value.ixtisas}</TableCell>
        <TableCell align="right">{value.score}</TableCell>
      </TableRow>
    );
  }

  getCourseList(value) {
    const tarixs =
      value.beginDate === 0
        ? ""
        : moment
            .utc(value.beginDate * 1000)
            .format("DD-MM-YYYY")
            .toString() + " / ";
    const tarixe =
      value.endDate === 0
        ? ""
        : moment
            .utc(value.endDate * 1000)
            .format("DD-MM-YYYY")
            .toString();
    return (
      <TableRow key={value.courseId}>
        <TableCell component="th" scope="row">
          {value.title}
        </TableCell>
        <TableCell align="right">{tarixs + tarixe}</TableCell>
      </TableRow>
    );
  }

  getCertificateList(value) {
    const tarix =
      value.date === 0
        ? ""
        : moment
            .utc(value.date * 1000)
            .format("DD-MM-YYYY")
            .toString();
    return (
      <TableRow key={value.certificateId}>
        <TableCell component="th" scope="row">
          {value.orgTitle}
        </TableCell>
        <TableCell align="right">{value.title}</TableCell>
        <TableCell align="right">{value.grade}</TableCell>
        <TableCell align="right">{tarix}</TableCell>
      </TableRow>
    );
  }

  getContactList(value) {
    return (
      <TableRow key={value.contactId}>
        <TableCell component="th" scope="row">
          {value.contactType}
        </TableCell>
        <TableCell align="right">{value.contactText}</TableCell>
        <TableCell align="right">{value.note}</TableCell>
      </TableRow>
    );
  }

  getLangList(value) {
    return (
      <TableRow key={value.langId}>
        <TableCell component="th" scope="row">
          {value.lang}
        </TableCell>
        <TableCell align="right">{value.langLevel}</TableCell>
      </TableRow>
    );
  }

  getCompList(value) {
    return (
      <TableRow key={value.compId}>
        <TableCell component="th" scope="row">
          {value.comp}
        </TableCell>
        <TableCell align="right">{value.compLevel}</TableCell>
      </TableRow>
      // <Grid container item xs={12} spacing={16}>
      //     <Grid item xs={5}>
      //         <input disabled="disabled" value={value.comp} style={inputStyle}/>
      //     </Grid>
      //     <Grid item xs={5}>
      //         <input disabled="disabled" value={value.compLevel} style={inputStyle}/>
      //     </Grid>
      // </Grid>
    );
  }

  getChildrenList(value) {
    const ageTitle =
      value.yash.year > 0
        ? value.yash.year + " yaş"
        : value.yash.month > 0
        ? value.yash.month + " aylıq"
        : value.yash.day > 0
        ? value.yash.day + " gün"
        : "";
    return (
      <TableRow key={value.empChildId}>
        <TableCell component="th" scope="row">
          {value.gender}
        </TableCell>
        <TableCell align="right">
          {value.birthDate === 0
            ? ""
            : moment
                .utc(value.birthDate * 1000)
                .format("DD-MM-YYYY")
                .toString()}
        </TableCell>
        <TableCell align="right">{ageTitle}</TableCell>
        <TableCell align="right">
          {value.isSaglamMehdudiyyet ? "VAR" : "YOXDUR"}
        </TableCell>
      </TableRow>
    );
  }

  getPosList(value) {
    return (
      <TableRow key={value.empPosId}>
        <TableCell component="th" scope="row">
          {value.depTitle}
        </TableCell>
        <TableCell align="right">{value.posTitle}</TableCell>
        <TableCell align="right">
          {value.startDate === 0
            ? "..."
            : moment
                .utc(value.startDate * 1000)
                .format("DD-MM-YYYY")
                .toString()}
        </TableCell>
      </TableRow>
    );
  }

  getWorkExperienceList(value) {
    return (
      <TableRow key={value.empWorkExpId}>
        <TableCell component="th" scope="row">
          {value.startDate === 0
            ? ""
            : moment
                .utc(value.startDate * 1000)
                .format("DD-MM-YYYY")
                .toString()}
        </TableCell>
        <TableCell align="right">
          {value.endDate === 0
            ? ""
            : moment
                .utc(value.endDate * 1000)
                .format("DD-MM-YYYY")
                .toString()}
        </TableCell>
        <TableCell align="right">{value.ymd.year}</TableCell>
        <TableCell align="right">{value.ymd.month}</TableCell>
        <TableCell align="right">{value.ymd.day}</TableCell>
      </TableRow>
    );
  }
}

export default (EmpProfile);
