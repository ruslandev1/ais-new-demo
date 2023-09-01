import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	AppShell,
	Burger,
	MediaQuery,
	Text,
	useMantineTheme,
	Header as MantineHeader,
	Aside,
	Navbar,
	Group,
	Container,
	Title,
} from '@mantine/core'

import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import AppHeader from '../components/Header/AppHeader'
import { Space } from 'tabler-icons-react'


const PageContainer = ({ component, ...props }) => {
	console.log('component', component)
	const theme = useMantineTheme()
	const [opened, toggle] = useDisclosure(false)

	return (
		<Container px={0} fluid={true}>
			<Title order={4}>
				{props.moduleTitle}
			</Title>
			{component}
		</Container>
	)

	// return (
	// 	<>
	// 	<AppShell
	// 		styles={{
	// 			main: {
	// 				background:
	// 					theme.colorScheme === 'dark'
	// 						? theme.colors.dark[8]
	// 						: theme.colors.gray[0],
	// 						paddingLeft : 0
	// 			},
	// 		}}
	// 		navbar={
	// 			<Navbar
	// 				fixed={false}
	// 				p="md"
	// 				hiddenBreakpoint="md"
	// 				hidden={!opened}
	// 				maw={{ lg: "1rem", }}
	// 			>
	// 				<Header empId={props.user.empId} />
	// 			</Navbar>
	// 		}
	// 		// aside={
	// 		//   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
	// 		//     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
	// 		//       <Text>Application sidebar</Text>
	// 		//     </Aside>
	// 		//   </MediaQuery>
	// 		// }
	// 		footer={<Footer />}
	// 		header={
	// 			<HeaderTabs>
	// 				{/* <div
	// 					style={{ display: 'flex', alignItems: 'center', height: '100%' }}
	// 				>
	// 					<MediaQuery largerThan="md" styles={{ display: 'none' }}>
	// 						<Burger
	// 							opened={opened}
	// 							onClick={() => setOpened(o => !o)}
	// 							size="sm"
	// 							color={theme.colors.gray[6]}
	// 							mr="xl"
	// 						/>
	// 					</MediaQuery>
	// 				</div> */}
	// 			</HeaderTabs >
	// 		}
	// 	>
	// 		{component}
	// 	</AppShell>

	//  </>
	// )
}

function mapStateToProps(state) {
	return {
		user: state.loginState.user,
	}
}

export default connect(mapStateToProps)(PageContainer)
