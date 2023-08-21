import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import { Avatar as MuiAvatar, Container, Typography } from "@mui/material";
import { CardMedia as MuiCardMedia } from "@mui/material";
import { Address } from "../AdressSelector";
import { isEmpty } from "../../utils";
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
const PREFIX = 'EmpProfile';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  container: `${PREFIX}-container`,
  textField: `${PREFIX}-textField`,
  dense: `${PREFIX}-dense`,
  menu: `${PREFIX}-menu`
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`& .${classes.root}`]: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  // ... (other styling classes)
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
const Avatar = styled(MuiAvatar)(({ theme }) => ({
  '& .profile-image': {
    maxWidth: "100%",
  },
}));
// add plugin to dayjs

const CardMedia = styled(MuiCardMedia)(({ theme}) => ({
  '& .card-text': {
    paddingBottom : "20px"
  },
}))

dayjs.extend(utc)

function EmpProfile(props) {
  const [empData, setEmpData] = useState({
    empId: props.empId,
    username: "",
    // ... (initialize other properties)
  });


  const [empPos, setEmpPos] = useState([]);
  const [empContact, setEmpContact] = useState([]);
  const [empChildren, setEmpChildren] = useState([]);
  const [empWorkExperience, setEmpWorkExperience] = useState([]);

  const [empEdu, setEmpEdu] = useState({
    empInst: [],
    empCourse: [],
    empCertificate: [],
  });
  const [langSkills, setLangSkills] = useState([]);
  const [compSkills, setCompSkills] = useState([]);

  // ... (other state variables)

  const [empCurrentPos, setEmpCurrentPos] = useState({
    empPosId: 0,
    depTitle: "",
    posTitle: "",
    startDate: 0,
  });


  const a = dayjs();
  const imgRef = useRef(null);




  const [open, setOpen] = useState(true)
  // handle \
  const handleClose = () => {
    setOpen(false);
  };

  const loadProfileImg = () => {
    avrFetch(BACKEND_URL + "/api/User/imgbyid/" + empData.empId)
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then((myBlob) => {
        const file = new Blob([myBlob], { type: "image/jpeg" });
        let fileUrl = (window.URL || window.webkitURL).createObjectURL(file);
        imgRef.current.src = fileUrl;
      })
      .catch((reason) =>
        setEmpData((prevEmpData) => ({
          ...prevEmpData,
          loading: false,
          errors: reason.message,
        }))
      );
  };
  const loadEmpData = () => {
    avrFetch(BACKEND_URL + "/api/Employee/GetProfileData/" + empData.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const employeeData = { ...value.data };
          if (empData.empId > 0) {
            setEmpData((prevEmpData) => ({
              ...prevEmpData,
              employeeData,
            }));
          }
        } else {
          // Handle error or update state accordingly
          // For example: setErrorState(value.ResponseMessage);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      }
      )
  };


  const loadEmpPos = () => {
    avrFetch(
      BACKEND_URL + "/api/EmpPosition/GetPositionsByEmpId?empId=" + empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpPos = value.data.map((item) => ({
            empPosId: item.empPosId,
            depTitle: item.dep.label,
            posTitle: item.pos.label,
            startDate: item.startDate,
          }));
          setEmpPos(updatedEmpPos);
        } else {
          // Handle error or update state accordingly
          // For example: setErrorState(value.responseMessage);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };

  const loadEmpContact = () => {
    avrFetch(BACKEND_URL + "/api/Contact/GetContactByEmpId?empId=" + empData.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpContact = value.data.map((item) => ({
            contactId: item.contactId,
            contactType: item.contactType.label,
            contactText: item.contactText,
            note: item.note,
          }));
          setEmpContact(updatedEmpContact);
        } else {
          // Handle error or update state accordingly
          // For example: setErrorState(value.message);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };


  const loadEmpChildren = () => {
    avrFetch(
      BACKEND_URL +
      "/api/EmpChildren/GetChildrenByMotherEmpId?empId=" +
      empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpChildren = value.data.map((item) => ({
            empChildId: item.empChildId,
            gender: item.gender.label,
            birthDate: item.birthDate,
            yash: item.yash,
            isSaglamMehdudiyyet: item.isSaglamMehdudiyyet,
          }));
          setEmpChildren(updatedEmpChildren);
        } else {
          // Handle error or update state accordingly
          // For example: setErrorState(value.responseMessage);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };

  const loadEmpWorkExperience = () => {
    avrFetch(
      BACKEND_URL +
      "/api/EmpWorkExperience/GetWorkExperienceByEmpId?empId=" +
      empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpWorkExperience = value.data.map((item) => ({
            empWorkExpId: item.empWorkExpId,
            startDate: item.startDate,
            endDate: item.endDate,
            ymd: item.ymd,
          }));
          setEmpWorkExperience(updatedEmpWorkExperience);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };

  const loadEmpEdu = () => {
    avrFetch(
      BACKEND_URL + "/api/Education/GetEducationByEmpId?empId=" + empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpInst = value.data.map((item) => ({
            empEduInfoId: item.empEduInfoId,
            eduInstName: item.eduInstName,
            eduInstType:
              item.eduInstType === null ? "" : item.eduInstType.label,
            startDate: item.startDate,
            endDate: item.endDate,
            score: item.score,
            ixtisas: item.ixtisas,
          }));

          setEmpEdu((prevEmpEdu) => ({
            ...prevEmpEdu,
            empInst: [...updatedEmpInst],
          }));
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };
  const loadEmpCourse = () => {
    avrFetch(BACKEND_URL + "/api/EmpCource/GetCourcesEmpId?empId=" + empData.empId)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpCourse = value.data.map((item) => ({
            courseId: item.id,
            title: item.title,
            beginDate: item.beginDate,
            endDate: item.endDate,
          }));

          setEmpEdu((prevEmpEdu) => ({
            ...prevEmpEdu,
            empCourse: [...prevEmpEdu.empCourse, ...updatedEmpCourse],
          }));
          console.log(empCourse)
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };
  const loadLangSkills = () => {
    avrFetch(
      BACKEND_URL + "/api/LangSkill/GetLangSkillsEmpId?empId=" + empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedLangSkills = value.data.map((item) => ({
            langId: item.id,
            lang: item.lang.label,
            langLevel: item.langLevel.label,
          }));

          setLangSkills((prevLangSkills) => [
            ...prevLangSkills,
            ...updatedLangSkills,
          ]);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };

  const loadEmpCertificate = () => {
    avrFetch(
      BACKEND_URL +
      "/api/EmpCertificate/GetCertificatesByEmpId?empId=" +
      empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedEmpCertificate = value.data.map((item) => ({
            certificateId: item.id,
            orgTitle: item.orgTitle,
            title: item.title,
            grade: item.grade,
            date: item.date,
          }));

          setEmpEdu((prevEmpEdu) => ({
            ...prevEmpEdu,
            empCertificate: [...prevEmpEdu.empCertificate, ...updatedEmpCertificate],
          }));
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };
  const loadCompSkills = () => {
    avrFetch(
      BACKEND_URL + "/api/CompSkill/GetCompSkillsByEmpId?empId=" + empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          const updatedCompSkills = value.data.map((item) => ({
            compId: item.id,
            comp: item.comp.label,
            compLevel: item.compLevel.label,
          }));

          setCompSkills((prevCompSkills) => [
            ...prevCompSkills,
            ...updatedCompSkills,
          ]);
        }
      })
      .catch((reason) => {
        // Handle error
        // For example: setErrorState(reason.message);
      });
  };
  const loadCurrentEmpPos = () => {
    avrFetch(
      BACKEND_URL + "/api/EmpPosition/GetEmpPosIsLast?empId=" + empData.empId
    )
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((value) => {
        if (!isEmpty(value) && value.success === true) {
          setEmpCurrentPos({
            empPosId: value.data.empPosId,
            depTitle: value.data.dep.label,
            posTitle: value.data.pos.label,
            startDate: value.data.startDate,
          });
        } else {
          // Handle error
          // For example: setErrorState(value.responseMessage);
        }
      })
      .catch((err) => {
        // Handle error
        // For example: setErrorState(err.message);
      });
  };

  useEffect(() => {
    loadEmpData();
    loadProfileImg();
    loadEmpPos();
    loadEmpEdu();
    loadEmpCourse();
    loadEmpCertificate();
    loadEmpContact();
    loadLangSkills();
    loadCompSkills();
    loadEmpChildren();
    loadCurrentEmpPos();
    loadEmpWorkExperience();
  }, []);

  const empCourse = empEdu.empCourse;
  const empCertificate = empEdu.empCertificate;
  const empInst = empEdu.empInst
  const { employeeData: emp_data } = empData;
  return (
    <>
      <Card style={{ marginTop: 50 }}>
        <Grid style={{ flexGrow: 1, padding: 30 }} item>
          <Grid
            item
            xs={12}
            container
            spacing={0}
            alignItems={"flex-start"}
            direction={"row"}
            justifyContent={"flex-start"}
          >
            <Grid item xs={6}  lg={2} />
            <Grid item xs={6} lg={10}>
              <Typography variant="h4">
                {emp_data?.firstName} {emp_data?.lastName}{" "}
              </Typography>{" "}
              {/*style={{color: '#0052cc'}}*/}
              <h2 style={{ color: "" }}>
                {isEmpty(empCurrentPos)
                  ? ""
                  : empCurrentPos.posTitle}
              </h2>
              <p style={{ color: "red" }}>
                {emp_data?.stateId === 2 ? "işdən azad olunub" : ""}
              </p>
            </Grid>
            <Grid item xs={12} lg={2} >
              <Avatar profile square="true" sx={{ width: 130, height: 130, bottom: 50, textAlign: "center" }}>
                <a href="#" onClick={(e) => handleClickOpen(e)}>
                  <img
                    ref={imgRef}
                    className="profile-image"
                    src="http://www.markweb.in/primehouseware/images/noimage.png"
                    alt="..."
                  />
                </a>
              </Avatar>
              <CardMedia
                profile
                square="true"
                // sx={{padding : 2}}
              >
                <Typography className="card-text">İstifadəçi adı: {emp_data?.username}</Typography>
                <Typography className="card-text">
                  Doğum tarixi:{" "}
                  {emp_data?.birthDate === 0
                    ? ""
                    : new Date(emp_data?.birthDate * 1000)
                      .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
                </Typography>
                <Typography className="card-text">
                  Struktur qurum:{" "}
                  {isEmpty(empCurrentPos)
                    ? ""
                    : empCurrentPos.depTitle}
                </Typography>
                <Typography className="card-text">
                  İşə başladığı tarix:{" "}
                  {empCurrentPos.startDate === 0
                    ? ""
                    : new Date(empCurrentPos.startDate * 1000)
                      .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
                </Typography>
                <Typography className="card-text">
                  Elektron poçt:{" "}
                  {empContact.map((item) =>
                    item.contactType === "Elektron poçt"
                      ? item.contactText
                      : ""
                  )}
                </Typography>
                <Typography className="card-text">
                  Mobil telefon:
                  {empContact?.map((contact, idx) => {
                    return <p>{contact.contactText}</p>
                  })}
                </Typography>
              </CardMedia>
            </Grid>
            <Grid item xs={12} lg={10}  >
              <CardMedia profile square="true">
                <Accordion defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "#0047b3" }}> Şəxsi məlumatlar </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <label htmlFor="fname">Adı</label>
                        <input
                          disabled="disabled"
                          value={emp_data?.firstName}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="lname">Soyadı</label>
                        <input
                          disabled="disabled"
                          value={emp_data?.lastName}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="fname">Ata adı</label>
                        <input
                          disabled="disabled"
                          value={emp_data?.fatherName}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="username">İstifadəçi adı</label>
                        <input
                          disabled="disabled"
                          value={
                            isEmpty(emp_data?.username)
                              ? ""
                              : emp_data?.username
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label htmlFor="citizenship">Vətəndaşlığı</label>
                        <input
                          disabled="disabled"
                          value={
                            isEmpty(emp_data?.citizenship)
                              ? ""
                              : emp_data?.citizenship
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <label htmlFor="regAddress">Qeydiyyat ünvanı</label>
                        <input
                          disabled="disabled"
                          value={
                            isEmpty(emp_data?.regAddress)
                              ? ""
                              : emp_data?.regAddress.addressTitle
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="birthDate">Doğum tarixi</label>
                        <input
                          disabled="disabled"
                          value=
                          {emp_data?.birthDate === 0
                            ? ""
                            : new Date(emp_data?.birthDate * 1000)
                              .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
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
                            emp_data?.identityDoc
                              ? emp_data?.identityDoc
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
                            emp_data?.cardNo
                              ? emp_data?.cardNo
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
                            emp_data?.fin
                              ? emp_data?.fin
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
                            isEmpty(emp_data?.c1Code)
                              ? ""
                              : emp_data?.c1Code
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="authority">ŞV verən orqan</label>
                        <input
                          disabled="disabled"
                          value={
                            emp_data?.authority
                              ? emp_data?.authority
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
                            emp_data?.dateOfIssue === 0
                              ? ""
                              : new Date(emp_data?.dateOfIssue * 1000)
                                .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="dateOfExpiry">ŞV Bitmə Tarixi</label>
                        <input
                          disabled="disabled"
                          value={
                            emp_data?.dateOfExpiry === 0
                              ? ""
                              : new Date(emp_data?.dateOfExpiry * 1000)
                                .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <label htmlFor="gender">Cinsiyyəti</label>
                        <input
                          disabled="disabled"
                          value={
                            emp_data?.gender
                              ? emp_data?.gender
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
                            isEmpty(emp_data?.maritalStatus)
                              ? ""
                              : emp_data?.maritalStatus
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
                            emp_data?.militaryObliged
                              ? emp_data?.militaryObliged
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
                            isEmpty(emp_data?.dsmfCardNo)
                              ? ""
                              : emp_data?.dsmfCardNo
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label htmlFor="placeOfBirth">Doğulduğu yer</label>
                        <input
                          disabled="disabled"
                          value={
                            isEmpty(emp_data?.placeOfBirth)
                              ? ""
                              : emp_data?.placeOfBirth.addressTitle
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
                            isEmpty(emp_data?.curAddress)
                              ? ""
                              : emp_data?.curAddress.addressTitle
                          }
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <label htmlFor="kvotaStatus">Kvota status</label>
                        <input
                          disabled="disabled"
                          value={
                            isEmpty(emp_data?.kvotaStatus)
                              ? []
                              : emp_data?.kvotaStatus.map(
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
                            isEmpty(emp_data?.xusMezStatus)
                              ? ""
                              : emp_data?.xusMezStatus
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
                            {empChildren.map((item) =>
                              getChildrenList(item)
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "#0047b3", marginTop: 30 }}>
                      {" "}
                      İş məlumatları{" "}
                    </Typography>
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
                            {empPos.map((row) => getPosList(row))}
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
                          {empWorkExperience.map((item) =>
                            getWorkExperienceList(item)
                          )}
                        </TableBody>
                      </Table>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "#0047b3", marginTop: 30 }}>
                      {" "}
                      Təhsil{" "}
                    </Typography>
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
                            {empInst.map((row) => getEduList(row))}
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
                            {empCourse?.map((row) => getCourseList(row))}
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
                              getCertificateList(row)
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "#0047b3", marginTop: 30 }}>
                      {" "}
                      Əlaqə{" "}
                    </Typography>
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
                            getContactList(item)
                          )}
                        </TableBody>
                      </Table>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "#0047b3", marginTop: 30 }}>
                      {" "}
                      Əlavə Biliklər{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid container item xs={5}>
                        <Grid item xs={12}>
                          <h4>Dil bilikləri</h4>
                        </Grid>
                        <Table>
                          <TableBody>
                            {langSkills.map((item) =>
                              getLangList(item)
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
                            {compSkills.map((item) =>
                              getCompList(item)
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
      {/* <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Şəklin dəyişdirilməsi
        </DialogTitle>
        <DialogContent>
          <ImageUpload
            empId={emp_data?.empId}
            whenUploaded={() => {
              console.log("img uploaded");
              loadProfileImg();
              handleClose();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Bağla
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}


function getEduList(value) {
  const tarixs =
    value.startDate === 0
      ? ""
      : new Date(value.startDate * 1000)
        .toDateString() + " / ";
  const tarixe =
    value.endDate === 0
      ? ""
      : new Date(value.endDate * 1000)
        .toDateString();
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

function getCourseList(value) {
  const tarixs =
    value.beginDate === 0
      ? ""
      : new Date(value.beginDate * 1000)
        .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })
    ;
  const tarixe =
    value.endDate === 0
      ? ""
      : new Date(value.endDate * 1000)
        .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })
    ;
  return (
    <TableRow key={value.courseId}>
      <TableCell component="th" scope="row">
        {value.title}
      </TableCell>
      <TableCell align="right">{tarixs + tarixe}</TableCell>
    </TableRow>
  );
}

function getCertificateList(value) {
  const tarix =
    value.date === 0
      ? ""
      : new Date(value.date * 1000)
        .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" });
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

function getContactList(value) {
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

function getLangList(value) {
  return (
    <TableRow key={value.langId}>
      <TableCell component="th" scope="row">
        {value.lang}
      </TableCell>
      <TableCell align="right">{value.langLevel}</TableCell>
    </TableRow>
  );
}

function getCompList(value) {
  return (
    <TableRow key={value.compId}>
      <TableCell component="th" scope="row">
        {value.comp}
      </TableCell>
      <TableCell align="right">{value.compLevel}</TableCell>
    </TableRow>
  );
}

function getChildrenList(value) {
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
          : new Date(value.birthDate * 1000)
            .toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
      </TableCell>
      <TableCell align="right">{ageTitle}</TableCell>
      <TableCell align="right">
        {value.isSaglamMehdudiyyet ? "VAR" : "YOXDUR"}
      </TableCell>
    </TableRow>
  );
}

function getPosList(value) {
  return (
    <TableRow key={value.empPosId}>
      <TableCell component="th" scope="row">
        {value.depTitle}
      </TableCell>
      <TableCell align="right">{value.posTitle}</TableCell>
      <TableCell align="right">
        {value.startDate === 0
          ? "..."
          : new Date(value.startDate * 1000).
            toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
      </TableCell>
    </TableRow>
  );
}

function getWorkExperienceList(value) {
  return (
    <TableRow key={value.empWorkExpId}>
      <TableCell component="th" scope="row">
        {value.startDate === 0
          ? ""
          : new Date(value.startDate * 1000).
            toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
      </TableCell>
      <TableCell align="right">
        {value.endDate === 0
          ? ""
          : new Date(value.endDate * 1000).
            toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })}
      </TableCell>
      <TableCell align="right">{value.ymd.year}</TableCell>
      <TableCell align="right">{value.ymd.month}</TableCell>
      <TableCell align="right">{value.ymd.day}</TableCell>
    </TableRow>
  );
}



export default EmpProfile;
