import * as React from 'react'
import Home from '../components/Dashboard/Userİnfo'
import EmpSaatliqIcaze from '../components/Dashboard/PermissionPerHour'
import EmpMezuniyyet from '../components/Dashboard/MezuniyyetIcaze'
import EmpInventar from '../components/Dashboard/İnventar'
import EmpGirisCixis from '../components/Dashboard/GirisCixisIcaze'
import { Grid, Container } from '@mantine/core'
import PageContainer from './PageContainer'

export default function Dashboard(props) {
	const [open, setOpen] = React.useState(true)
	return (
		<Container my="md" size="md">
			<Grid>
				<Grid.Col xs={12} sm={6} md={5} lg={6}>
					<Home />
				</Grid.Col>
				<Grid.Col xs={12} sm={6} md={6} lg={6}>
					<EmpSaatliqIcaze empId={props.empId} />
				</Grid.Col>
				<Grid.Col xs={12} sm={12} md={6} lg={6}>
					<EmpMezuniyyet empId={props.empId} />
				</Grid.Col>
				<Grid.Col xs={12} sm={12} md={6} lg={6}>
					<EmpGirisCixis empId={props.empId} />
				</Grid.Col>
				<Grid.Col xs={12} sm={12} md={12} lg={12}>
					<EmpInventar empId={props.empId} />
				</Grid.Col>
			</Grid>
		</Container>
	)
}