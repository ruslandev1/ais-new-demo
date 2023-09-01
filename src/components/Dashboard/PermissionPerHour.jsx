import * as React from 'react'
import { styled } from '@mui/material/styles'
import { BACKEND_URL } from '../../utils/Constants'
import ApiHelper from '../../utils/ApiHelper'
import ToastHelper from '../../utils/ToastHelper'
import { useState, useEffect } from 'react'
import {
	createStyles,
	Text,
	Card,
	rem,
	Box,
  Title,
} from '@mantine/core'

const GET_SAATLIQ_ICAZE = BACKEND_URL + '/api/EmpIcazeSaat/GetIcazeSaatByEmpId/'

const PREFIX = 'EmpSaatliqIcaze'

const classes = {
	content: `${PREFIX}-content`,
	title: `${PREFIX}-title`,
	card: `${PREFIX}-card`,
	space: `${PREFIX}-space`,
}

const StyledCard = styled(Card)(() => ({
	[`& .${classes.content}`]: {
		color: 'white',
		marginLeft: '5px',
		fontSize: '16px',
		opacity: '0.8',
	},

	[`& .${classes.title}`]: {
		color: 'white',
		display: 'inline-block',
		fontSize: '16px',
		opacity: '0.8',
	},

	[`&.${classes.card}`]: {
		background: 'rgb(30, 136, 229)',
		height: 'max-content',
		position: 'relative',
		overflow: 'hidden',
		transition: 'boxShadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		borderRadius: '12px',

		'&::before': {
			content: "''",
			position: 'absolute',
			width: '210px',
			height: '210px',
			background: 'rgb(21, 101, 192)',
			borderRadius: '50%',
			top: '-125px',
			right: '-15px',
			opacity: '0.5',
		},
		'&::after': {
			content: "''",
			position: 'absolute',
			width: '160px',
			height: '210px',
			background: 'rgb(21, 101, 192)',
			borderRadius: '50%',
			top: '-85px',
			right: '-95px',
			zIndex: '1',
		},
	},

	[`& .${classes.space}`]: {
		margin: '6px 0 6px 0',
	},
}))

export default function EmpSaatliqIcaze(props) {
	const [data, setData] = useState([])
	console.log('SAATLIG', props)

	const loadSaatliqIcaze = id => {
		console.log('ID', id)
		ApiHelper.getMethod(
			GET_SAATLIQ_ICAZE + id,
			() => {},
			ToastHelper.error,
			data => {
				console.log('saatliqicaze', data)
				setData(data ? data[0] : [])
			},
		)
	}
	useEffect(() => {
		loadSaatliqIcaze(props.empId)
	}, [])

	console.log('dataaaa', data)
	// return (
	//   <StyledCard className={classes.card}>
	//     <CardContent style={{ padding: "20px" }}>
	//       <Typography
	//         gutterBottom
	//         variant="h5"
	//         component="div"
	//         style={{
	//           color: "rgb(144, 202, 249)",
	//           marginBottom: "20px",
	//           fontStyle: "italic",
	//           zIndex: "1000 !important",
	//         }}
	//       >
	//         Saatlıq İcazə Məlumatı
	//       </Typography>
	//       <Typography component={"div"}>
	//         <Typography variant="p" component="div" className={classes.title}>
	//           İstifadə edilə bilər :
	//         </Typography>
	//         <Typography
	//           component="span"
	//           variant="body2"
	//           className={classes.content}
	//         >
	//           {data.canBeUsedIcaze} dəfə
	//         </Typography>
	//       </Typography>
	//       <Typography component={"div"} className={classes.space}>
	//         <Typography variant="p" component="div" className={classes.title}>
	//           İstifadə edilmiş müddət :
	//         </Typography>
	//         <Typography
	//           component="span"
	//           variant="body2"
	//           className={classes.content}
	//         >
	//           {data.canBeUsedIcaze === '2' ? `0  ${data.usedPeriod}` : data.usedPeriod}
	//         </Typography>
	//       </Typography>

	//       <Typography component={"div"}>
	//         <Typography variant="p" component="div" className={classes.title}>
	//           Cari Qalıq(bu günə olan) :
	//         </Typography>
	//         <Typography
	//           component="span"
	//           variant="body2"
	//           className={classes.content}
	//         >
	//           {data.canBeUsedIcaze === '2' ? '6 saat': data.currentBalance}
	//         </Typography>
	//       </Typography>
	//     </CardContent>
	//   </StyledCard>
	// );

	const useStyles = createStyles(theme => ({
		card: {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
			height: '100%',
		},

		label: {
			// fontWeight: 700,
			lineHeight: 1,
			paddingBottom : 20
		},

		lead: {
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,
			fontWeight: 700,
			fontSize: rem(22),
			lineHeight: 1,
		},

		inner: {
			display: 'flex',
			height: '100%',
      flexDirection : "column",
			[theme.fn.smallerThan('xs')]: {
				flexDirection: 'column',
			},
		},

		ring: {
			flex: 1,
			display: 'flex',
			justifyContent: 'flex-end',

			[theme.fn.smallerThan('xs')]: {
				justifyContent: 'center',
				marginTop: theme.spacing.md,
			},
		},
	}))

	const { theme, classes } = useStyles()

	// const items = stats.map((stat) => (
	//   <div key={stat.label}>
	//     <Text className={classes.label}>{stat.value}</Text>
	//     <Text size="xs" color="dimmed">
	//       {stat.label}
	//     </Text>
	//   </div>
	// ));

	return (
		<Card
			withBorder
			p="xl"
			radius="md"
			className={classes.card}
      display="flex"
		>
			<div className={classes.inner}>
        <Title  order={3} size="h2" color='dimmed'>
        Saatlıq İcazə Məlumatı
        </Title>
				<Box sx={{marginTop : 30}}>
					<Text fz={{md: "lg", lg: "xl"}} className={classes.label}>
						İstifadə edilə bilər : {data.canBeUsedIcaze}
					</Text>
					<Text fz={{md: "lg", lg: "xl"}} className={classes.label}>
						İstifadə edilmiş müddət : {data.canBeUsedIcaze === '2' ? `0  ${data.usedPeriod}` : data.usedPeriod}
					</Text>
					<Text fz={{md: "lg", lg: "xl"}} className={classes.label}>
						Cari Qalıq(bu günə olan) : {data.canBeUsedIcaze === '2' ? '6 saat': data.currentBalance}
					</Text>
				</Box>

				{/* <div className={classes.ring}>
					<RingProgress
						roundCaps
						thickness={6}
						size={150}
						sections={[
							{ value: data.canBeUsedIcaze * 100, color: theme.primaryColor },
						]}
						label={
							<div>
								<Text ta="center" fz="lg" className={classes.label}>
									{(data.canBeUsedIcaze * 100).toFixed(0)}%
								</Text>
								<Text ta="center" fz="xs" c="dimmed">
									Completed
								</Text>
							</div>
						}
					/>
				</div> */}
			</div>
		</Card>
	)
}
