import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { styled } from '@mui/material/styles'
import { avrFetch } from '../../utils/AvroraFetch'
import { BACKEND_URL } from '../../utils/Constants'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Avatar as MuiAvatar, Container, Typography } from '@mui/material'
import { CardMedia as MuiCardMedia } from '@mui/material'
import { Address } from '../AdressSelector'
import { isEmpty } from '../../utils'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	DialogActions,
	DialogContent,
	DialogTitle,
} from '../reportV2/DialogHelper'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@mantine/core'
const PREFIX = 'EmpProfile'

const classes = {
	root: `${PREFIX}-root`,
	table: `${PREFIX}-table`,
	container: `${PREFIX}-container`,
	textField: `${PREFIX}-textField`,
	dense: `${PREFIX}-dense`,
	menu: `${PREFIX}-menu`,
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	[`& .${classes.root}`]: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
	// ... (other styling classes)
}))

const inputStyle = {
	width: '100%',
	padding: '7px 12px',
	margin: '6px 0',
	display: 'inline-block',
	border: '1px solid #ccc',
	borderRadius: '4px',
	boxSizing: 'border-box',
	background: 'white',
}
const Avatar = styled(MuiAvatar)(({ theme }) => ({
	'& .profile-image': {
		maxWidth: '100%',
	},
}))
// add plugin to dayjs

const CardMedia = styled(MuiCardMedia)(({ theme }) => ({
	'& .card-text': {
		paddingBottom: '20px',
	},
}))

dayjs.extend(utc)

function EmpProfile(props) {
	const imgRef = useRef(null)
	const [open, setOpen] = useState(true)
	// handle \
	const handleClose = () => {
		setOpen(false)
	}

	// Adding image blob
	const fetchProfileImg = async () => {
		const response = await avrFetch(`${BACKEND_URL}/api/User/img/`, {
			cache: 'default',
		})
		const image = await response.blob()
		const file = new Blob([image], { type: 'image/jpeg' })
		let fileUrl = (window.URL || window.webkitURL).createObjectURL(file)
		imgRef.current.src = fileUrl
		return fileUrl
	}

	// for fetching all queries
	async function fetchQuery(url) {
		const response = await avrFetch(BACKEND_URL + `${url}${props.empId}`)
		const data = await response.json()
		return data
	}

	// calling image query
	const profileImgQuery = useQuery(['profileImg'], fetchProfileImg)

	// Fetching employee data
	const fetchEmployeeProfileData = async () => {
		return fetchQuery('/api/Employee/GetProfileData/')
	}
	const { data: employeeData } = useQuery(
		['employeeProfileData', props.empId],
		fetchEmployeeProfileData,
	)

	// Fetching employee positions
	const fetchEmployeePositions = async () => {
		return fetchQuery('/api/EmpPosition/GetPositionsByEmpId?empId=')
	}
	const { data: empPos } = useQuery(
		['employeePositions', props.empId],
		fetchEmployeePositions,
	)

	// Fetching employee contact
	const fetchEmployeeContact = async () => {
		return fetchQuery('/api/Contact/GetContactByEmpId?empId=')
	}
	const { data: empContact } = useQuery(
		['employeeContact', props.empId],
		fetchEmployeeContact,
	)

	//Fetching employee children
	const fetchEmployeeChildren = async () => {
		return fetchQuery('/api/EmpChildren/GetChildrenByMotherEmpId?empId=')
	}
	const { data: empChildren } = useQuery(
		['employeeChildren', props.empId],
		fetchEmployeeChildren,
	)

	// Fetching employee work experience
	const fetchEmployeeWorkExperience = async () => {
		return fetchQuery('/api/EmpWorkExperience/GetWorkExperienceByEmpId?empId=')
	}
	const { data: empWorkExperience } = useQuery(
		['employeeWorkExperience', props.empId],
		fetchEmployeeWorkExperience,
	)

	// Fetching employee education
	const fetchEmployeeEducation = async () => {
		return fetchQuery('/api/Education/GetEducationByEmpId?empId=')
	}
	const { data: empEdu } = useQuery(
		['employeeEducation', props.empId],
		fetchEmployeeEducation,
	)

	// Fetching employee courses
	const fetchEmployeeCourses = async () => {
		return fetchQuery('/api/EmpCource/GetCourcesEmpId?empId=')
	}
	const { data: empCourse } = useQuery(
		['employeeCourses', props.empId],
		fetchEmployeeCourses,
	)

	// Fetching employee language skills
	const fetchEmployeeLanguageSkills = async () => {
		return fetchQuery('/api/LangSkill/GetLangSkillsEmpId?empId=')
	}
	const { data: langSkills } = useQuery(
		['employeeLangSkills', props.empId],
		fetchEmployeeLanguageSkills,
	)

	// Fetching employee certificate
	const fetchEmployeeCertificates = async () => {
		return fetchQuery('/api/EmpCertificate/GetCertificatesByEmpId?empId=')
	}
	const { data: empCertificate } = useQuery(
		['employeeCertificates', props.empId],
		fetchEmployeeCertificates,
	)

	// Fetching computer skills
	const fetchEmployeeComputerSkills = async () => {
		return fetchQuery('/api/EmpCertificate/GetCertificatesByEmpId?empId=')
	}
	const { data: compSkills } = useQuery(
		['employeeCompSkills', props.empId],
		fetchEmployeeComputerSkills,
	)

	// Fetching current employee position
	const fetchCurrentEmployeePosition = async () => {
		return fetchQuery('/api/EmpPosition/GetEmpPosIsLast?empId=')
	}
	const { data: empCurrentPos } = useQuery(
		['currentEmployeePosition', props.empId],
		fetchCurrentEmployeePosition,
	)

	return (
		<>
			<Card style={{ marginTop: 50 }}>
				<Grid style={{ flexGrow: 1, padding: 30 }} item>
					<Grid
						item
						xs={12}
						container
						spacing={0}
						alignItems={'flex-start'}
						direction={'row'}
						justifyContent={'flex-start'}
					>
						<Grid item xs={6} lg={2} />
						<Grid item xs={6} lg={10}>
							<Typography variant="h4">
								{employeeData?.data?.firstName} {employeeData?.data?.lastName}{' '}
							</Typography>{' '}
							<h2 style={{ color: '' }}>
								{isEmpty(empCurrentPos) ? '' : empCurrentPos?.data?.dep.label}
							</h2>
							<p style={{ color: 'red' }}>
								{employeeData?.data?.stateId === 2 ? 'işdən azad olunub' : ''}
							</p>
						</Grid>
						<Grid item xs={12} lg={2}>
							<Avatar
								profile
								square="true"
								sx={{
									width: 130,
									height: 130,
									bottom: 50,
									textAlign: 'center',
								}}
							>
								<a href="#" onClick={e => handleClickOpen(e)}>
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
								<Typography className="card-text">
									İstifadəçi adı: {employeeData?.data?.username}
								</Typography>
								<Typography className="card-text">
									Doğum tarixi:{' '}
									{employeeData?.data?.birthDate === 0
										? ''
										: new Date(
												employeeData?.data?.birthDate * 1000,
										  ).toLocaleDateString('en-us', {
												year: 'numeric',
												month: 'numeric',
												day: 'numeric',
										  })}
								</Typography>
								<Text className="card-text">
									Struktur qurum:{' '}
									{isEmpty(empCurrentPos) ? '' : empCurrentPos?.data?.dep.label}
								</Text>
								<Typography className="card-text">
									İşə başladığı tarix:{' '}
									{empCurrentPos?.data?.startDate === 0
										? ''
										: new Date(
												empCurrentPos?.data?.startDate * 1000,
										  ).toLocaleDateString('en-us', {
												year: 'numeric',
												month: 'numeric',
												day: 'numeric',
										  })}
								</Typography>
								<Typography className="card-text">
									{empContact?.data.map(item =>
										item.contactType === 'Elektron poçt' ? (
											<p>{`Elektron poçt:  ${item.contactText}`}</p>
										) : (
											''
										),
									)}
								</Typography>
								<Typography className="card-text">
									Mobil telefon:
									{empContact?.data.map((contact, idx) => {
										return <p>{contact.contactText}</p>
									})}
								</Typography>
							</CardMedia>
						</Grid>
						<Grid item xs={12} lg={10}>
							<CardMedia profile square="true">
								<Accordion defaultExpanded={true}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography style={{ color: '#0047b3' }}>
											{' '}
											Şəxsi məlumatlar{' '}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid container spacing={2}>
											<Grid item xs={3}>
												<label htmlFor="fname">Adı</label>
												<input
													disabled="disabled"
													value={employeeData?.data?.firstName}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="lname">Soyadı</label>
												<input
													disabled="disabled"
													value={employeeData?.data?.lastName}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="fname">Ata adı</label>
												<input
													disabled="disabled"
													value={employeeData?.data?.fatherName}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="username">İstifadəçi adı</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.username)
															? ''
															: employeeData?.data?.username
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={4}>
												<label htmlFor="citizenship">Vətəndaşlığı</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.citizenship)
															? ''
															: employeeData?.data?.citizenship
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={8}>
												<label htmlFor="regAddress">Qeydiyyat ünvanı</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.regAddress)
															? ''
															: employeeData?.data?.regAddress.addressTitle
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="birthDate">Doğum tarixi</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.birthDate === 0
															? ''
															: new Date(
																	employeeData?.data?.birthDate * 1000,
															  ).toLocaleDateString('en-us', {
																	year: 'numeric',
																	month: 'numeric',
																	day: 'numeric',
															  })
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
														employeeData?.data?.identityDoc
															? employeeData?.data?.identityDoc
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="cardNo">Şəxsiyyət vəsiqəsi №</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.cardNo
															? employeeData?.data?.cardNo
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="fin">Fin kodu</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.fin
															? employeeData?.data?.fin
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="c1Code">1C kodu</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.c1Code)
															? ''
															: employeeData?.data?.c1Code
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="authority">ŞV verən orqan</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.authority
															? employeeData?.data?.authority
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="dateOfIssue">ŞV Verilmə Tarixi</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.dateOfIssue === 0
															? ''
															: new Date(
																	employeeData?.data?.dateOfIssue * 1000,
															  ).toLocaleDateString('en-us', {
																	year: 'numeric',
																	month: 'numeric',
																	day: 'numeric',
															  })
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="dateOfExpiry">ŞV Bitmə Tarixi</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.dateOfExpiry === 0
															? ''
															: new Date(
																	employeeData?.data?.dateOfExpiry * 1000,
															  ).toLocaleDateString('en-us', {
																	year: 'numeric',
																	month: 'numeric',
																	day: 'numeric',
															  })
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="gender">Cinsiyyəti</label>
												<input
													disabled="disabled"
													value={
														employeeData?.data?.gender
															? employeeData?.data?.gender
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="maritalStatus">Ailə vəziyyəti</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.maritalStatus)
															? ''
															: employeeData?.data?.maritalStatus
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
														employeeData?.data?.militaryObliged
															? employeeData?.data?.militaryObliged
															: ''
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={3}>
												<label htmlFor="dsmfCardNo">DSMF Kart №</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.dsmfCardNo)
															? ''
															: employeeData?.data?.dsmfCardNo
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={4}>
												<label htmlFor="placeOfBirth">Doğulduğu yer</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.placeOfBirth)
															? ''
															: employeeData?.data?.placeOfBirth.addressTitle
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
														isEmpty(employeeData?.data?.curAddress)
															? ''
															: employeeData?.data?.curAddress.addressTitle
													}
													style={inputStyle}
												/>
											</Grid>
											<Grid item xs={7}>
												<label htmlFor="kvotaStatus">Kvota status</label>
												<input
													disabled="disabled"
													value={
														isEmpty(employeeData?.data?.kvotaStatus)
															? []
															: employeeData?.data?.kvotaStatus.map(
																	item => item.familyStatusTitle,
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
														isEmpty(employeeData?.data?.xusMezStatus)
															? ''
															: employeeData?.data?.xusMezStatus
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
															<TableCell align="right">Doğum tarixi</TableCell>
															<TableCell align="right">Yaş</TableCell>
															<TableCell align="right">
																Sağlamlıq məhdudiyyəti
															</TableCell>
														</StyledTableRow>
													</TableHead>
													<TableBody>
														{empChildren?.data?.map(item =>
															getChildrenList(item),
														)}
													</TableBody>
												</Table>
											</Grid>
										</Grid>
									</AccordionDetails>
								</Accordion>
								<Accordion defaultExpanded={true}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography style={{ color: '#0047b3', marginTop: 30 }}>
											{' '}
											İş məlumatları{' '}
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
														{empPos?.data?.map(row => getPosList(row))}
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
													{empWorkExperience?.data?.map(item =>
														getWorkExperienceList(item),
													)}
												</TableBody>
											</Table>
										</Grid>
									</AccordionDetails>
								</Accordion>
								<Accordion defaultExpanded={true}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography style={{ color: '#0047b3', marginTop: 30 }}>
											{' '}
											Təhsil{' '}
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
														{empEdu?.data.map(row => getEduList(row))}
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
														{empCourse?.data?.map(row => getCourseList(row))}
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
														{empCertificate?.data?.map(row =>
															getCertificateList(row),
														)}
													</TableBody>
												</Table>
											</Grid>
										</Grid>
									</AccordionDetails>
								</Accordion>
								<Accordion defaultExpanded={true}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography style={{ color: '#0047b3', marginTop: 30 }}>
											{' '}
											Əlaqə{' '}
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
													{empContact?.data.map(item =>
														// <p>{item.contactId}</p>
														getContactList(item),
													)}
												</TableBody>
											</Table>
										</Grid>
									</AccordionDetails>
								</Accordion>
								<Accordion defaultExpanded={true}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography style={{ color: '#0047b3', marginTop: 30 }}>
											{' '}
											Əlavə Biliklər{' '}
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
														{langSkills?.data?.map(item => getLangList(item))}
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
														{compSkills?.data?.map(item => getCompList(item))}
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
            empId={employeeData?.data?.empId}
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
	)
}

function getEduList(value) {
	const tarixs =
		value.startDate === 0
			? ''
			: new Date(value.startDate * 1000).toDateString() + ' / '
	const tarixe =
		value.endDate === 0 ? '' : new Date(value.endDate * 1000).toDateString()
	return (
		<TableRow key={value.empEduInfoId}>
			<TableCell component="th" scope="row">
				{tarixs + tarixe}
			</TableCell>
			<TableCell align="right">{value.eduInstType.label}</TableCell>
			<TableCell align="right">{value.eduInstName}</TableCell>
			<TableCell align="right">{value.ixtisas}</TableCell>
			<TableCell align="right">{value.score}</TableCell>
		</TableRow>
	)
}

function getCourseList(value) {
	const tarixs =
		value.beginDate === 0
			? ''
			: new Date(value.beginDate * 1000).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
			  })
	const tarixe =
		value.endDate === 0
			? ''
			: new Date(value.endDate * 1000).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
			  })
	return (
		<TableRow key={value.courseId}>
			<TableCell component="th" scope="row">
				{value.title}
			</TableCell>
			<TableCell align="right">{tarixs + tarixe}</TableCell>
		</TableRow>
	)
}

function getCertificateList(value) {
	const tarix =
		value.date === 0
			? ''
			: new Date(value.date * 1000).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
			  })
	return (
		<TableRow key={value.certificateId}>
			<TableCell component="th" scope="row">
				{value.orgTitle}
			</TableCell>
			<TableCell align="right">{value.title}</TableCell>
			<TableCell align="right">{value.grade}</TableCell>
			<TableCell align="right">{tarix}</TableCell>
		</TableRow>
	)
}

function getContactList(value) {
	return (
		<TableRow key={value.contactId}>
			<TableCell component="th" scope="row">
				{value.contactType.label}
			</TableCell>
			<TableCell align="right">{value.contactText}</TableCell>
			<TableCell align="right">{value.note}</TableCell>
		</TableRow>
	)
}

function getLangList(value) {
	return (
		<TableRow key={value.langId}>
			<TableCell component="th" scope="row">
				{value.lang}
			</TableCell>
			<TableCell align="right">{value.langLevel}</TableCell>
		</TableRow>
	)
}

function getCompList(value) {
	return (
		<TableRow key={value.compId}>
			<TableCell component="th" scope="row">
				{value.comp}
			</TableCell>
			<TableCell align="right">{value.compLevel}</TableCell>
		</TableRow>
	)
}

function getChildrenList(value) {
	const ageTitle =
		value.yash.year > 0
			? value.yash.year + ' yaş'
			: value.yash.month > 0
			? value.yash.month + ' aylıq'
			: value.yash.day > 0
			? value.yash.day + ' gün'
			: ''
	return (
		<TableRow key={value.empChildId}>
			<TableCell component="th" scope="row">
				{value.gender}
			</TableCell>
			<TableCell align="right">
				{value.birthDate === 0
					? ''
					: new Date(value.birthDate * 1000).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
					  })}
			</TableCell>
			<TableCell align="right">{ageTitle}</TableCell>
			<TableCell align="right">
				{value.isSaglamMehdudiyyet ? 'VAR' : 'YOXDUR'}
			</TableCell>
		</TableRow>
	)
}

function getPosList(value) {
	return (
		<TableRow key={value.empPosId}>
			<TableCell component="th" scope="row">
				{value.dep.label}
			</TableCell>
			<TableCell align="right">{value.pos.label}</TableCell>
			<TableCell align="right">
				{value.startDate === 0
					? '...'
					: new Date(value.startDate * 1000).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
					  })}
			</TableCell>
		</TableRow>
	)
}

function getWorkExperienceList(value) {
	return (
		<TableRow key={value.empWorkExpId}>
			<TableCell component="th" scope="row">
				{value.startDate === 0
					? ''
					: new Date(value.startDate * 1000).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
					  })}
			</TableCell>
			<TableCell align="right">
				{value.endDate === 0
					? ''
					: new Date(value.endDate * 1000).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
					  })}
			</TableCell>
			<TableCell align="right">{value.ymd.year}</TableCell>
			<TableCell align="right">{value.ymd.month}</TableCell>
			<TableCell align="right">{value.ymd.day}</TableCell>
		</TableRow>
	)
}

export default EmpProfile
