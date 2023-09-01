'use client';

import { AppShell, Burger, Container, Footer, MediaQuery, Text, Header as MantineHeader } from '@mantine/core';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import AppHeader from "../../components/Header/AppHeader"
import  AdminHeader  from '../../components/Header/AdminHeader';

export default function DashboardLayout({ children }) {
	const [opened, setOpened] = useState(false);

	return (
  <AppShell
			fixed
			navbar={<Header hidden={!opened} />}
			navbarOffsetBreakpoint="md"
			header={
				<AdminHeader
					burger={
						<MediaQuery largerThan="md" styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size="sm"
								mr="xl"
							/>
						</MediaQuery>
					}
				/>
			}
			footer={
				<Footer height={50} p="md">
					<Text w="full" size="sm" align="center" color="gray">
						CopyRight © 2023
					</Text>
				</Footer>
			}
			sx={theme => ({
				backgroundColor:
					theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
				minHeight: '100vh',
			})}
		>
			<Container fluid>{children}</Container>
		</AppShell>
	);
}