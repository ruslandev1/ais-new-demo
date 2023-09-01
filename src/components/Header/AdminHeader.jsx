'use client'

import {
	ActionIcon,
	Avatar,
	Box,
	Group,
	Header,
	Image,
	Menu,
	Title,
	UnstyledButton,
	createStyles,
	rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Logo from '../../assets/img/logo.png'
import { useState } from 'react'
import {
	IconLogout,
	IconSettings,
} from '@tabler/icons-react'
import { connect } from 'react-redux'
import { useMediaQuery } from '@mantine/hooks'
import { animated, useSpring } from '@react-spring/web'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/loginAction'
import useBoop from '../../hooks/useBoop'

const useStyles = createStyles(theme => ({
	header: {
		padding: `${theme.spacing.md} ${theme.spacing.lg}`,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		gap: theme.spacing.md,
		display: 'flex',
		alignItems: 'center',
	},

	left: {
		marginLeft: 'auto',
	},

	logo: {
		maxWidth: 150,
	},
}))

function AdminHeader({ burger, ...props }) {
	const { classes, cx } = useStyles()
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const [open, setOpen] = useState(true)
	const matches = useMediaQuery('(min-width: 56.25em)')
	const mobileMatches = useMediaQuery('(max-width: 56.25em)')
  const [anchorEl, setAnchorEl] = useState(null)

  // handling logout process
  const handleLogout = () => {
    setAnchorEl({ anchorEl: null });
    props.logOut(props.user);
  };

	// animation
	const spring = useSpring({
		config: { mass: 5, tension: 2000, friction: 200 },
		opacity: open ? 1 : 0,
		x: open ? 0 : 20,
	})

	const [style, trigger] = useBoop({ x: 2, y :10  })

	return (
		<Header height={70} withBorder={false} className={classes.header}>
			{burger && burger}
			<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
				<animated.img
					className={classes.logo}
					radius="md"
					src={Logo}
					alt="Header logo"
					style={style}
          onClick={trigger}
				/>
				{matches && (
					<Title
						order={3}
						mx="auto"
						onMouseEnter={() => setOpen(!open)}
						onMouseLeave={() => setOpen(true)}
					>
						<animated.p style={{ ...spring }}>{props.moduleTitle}</animated.p>
					</Title>
				)}
				<Menu
					width={matches ? 220 : 150}
					position="bottom-end"
					transitionProps={{ transition: 'pop-top-right' }}
					onClose={() => setUserMenuOpened(false)}
					onOpen={() => setUserMenuOpened(true)}
					withinPortal
					className={mobileMatches && classes.left}
				>
					<Menu.Target>
						<UnstyledButton
							className={cx(classes.user, {
								[classes.userActive]: userMenuOpened,
							})}
						>
							<Group spacing={7}>
								<ActionIcon
									radius="xl"
									variant="transparent"
									size={matches ? 30 : 20}
								>
									<IconSettings />
								</ActionIcon>
							</Group>
						</UnstyledButton>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Ayarlar</Menu.Label>
						<Link to="/settings">
							<Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
								Tənzimləmə
							</Menu.Item>
						</Link>
						<Menu.Item
               onClick={handleLogout}
							icon={
								<IconLogout
									size="0.9rem"
									stroke={1.5}
								/>
							}
						>
							Çıxış
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Box>
		</Header>
	)
}
const mapStateToProps = state => {
	return {
		moduleTitle: state.appState.moduleTitle,
		drawerOpen: state.drawerState.drawerOpen,
		isAuthenticated: state.loginState.isAuthenticated,
		user: state.loginState.user,
	}
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (usrname) => {
      dispatch(logout(usrname));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
