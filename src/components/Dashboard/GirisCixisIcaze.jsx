import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import ApiHelper from '../../utils/ApiHelper'
import ToastHelper from '../../utils/ToastHelper'
import { BACKEND_URL } from '../../utils/Constants'
import { ScrollArea, Table, createStyles, rem } from '@mantine/core'
import { randomId } from '@mantine/hooks'
const GET_IN_OUT_TIME = BACKEND_URL + '/api/Employee/GetGirisCixisSaatByEmpId/'

const useStyles = createStyles(theme => ({
	header: {
		position: 'sticky',
		top: 0,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `${rem(1)} solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[3]
					: theme.colors.gray[2]
			}`,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},
}))

const EmpGirisCixis = props => {
	const [results, setResults] = useState([])
	const [scrolled, setScrolled] = useState(false)

	const loadInOutTimeList = id => {
		ApiHelper.getMethod(
			GET_IN_OUT_TIME + id,
			() => {},
			ToastHelper.error,
			data => {
				setResults(data ?? [])
			},
		)
	}
	useEffect(() => {
		loadInOutTimeList(props.empId)
	}, [])
	const { classes, cx } = useStyles()
	return (
		<ScrollArea>
			<Table highlightOnHover>
				<thead className={classes.header}>
					<tr>
						<th>Giriş</th>
						<th>Çıxış</th>
					</tr>
				</thead>
				<tbody>
					{results.map(row => (
						<tr key={randomId()}>
							<td>{dayjs(row.giris).format('YYYY.MM.DD HH:mm A')}</td>
							<td>
								{row.cixis === null
									? ''
									: dayjs(row.cixis).format('YYYY.MM.DD HH:mm A')}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</ScrollArea>
	)
	// return (
	//   <TableContainer  style={{ height: "220px" }}>
	//     <Title> Giriş/Çıxış məlumatları</Title>
	//     <Table size="small">
	//       <TableHead>
	//         <TableRow>
	//           <TableCell>Giriş</TableCell>
	//           <TableCell>Çıxış</TableCell>
	//         </TableRow>
	//       </TableHead>
	//       <TableBody>
	//         {results
	//           .map((row) => (
	//             <TableRow>
	//               <TableCell>{dayjs(row.giris).format('YYYY.MM.DD HH:mm A')}</TableCell>
	//               <TableCell>{row.cixis === null ? '' : dayjs(row.cixis).format('YYYY.MM.DD HH:mm A')}</TableCell>
	//             </TableRow>
	//           ))}
	//       </TableBody>
	//     </Table>
	//   </TableContainer>
	// );
}

export default EmpGirisCixis
