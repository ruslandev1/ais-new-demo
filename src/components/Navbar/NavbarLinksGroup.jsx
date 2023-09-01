import { useState } from 'react'
import {
	Box,
	createStyles,
	rem,
	NavLink,
	Divider,
	Flex,
	getStylesRef,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { animated, useTransition } from '@react-spring/web'
import { useBoop } from '../../hooks/useBoop'

const useStyles = createStyles(theme => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	link: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		borderRadius: theme.radius.sm,
		fontWeight: 600,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,

			[`& .${getStylesRef('icon')}`]: {
				color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			},
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},

	nested: {
		paddingLeft: '1.25rem',
	},
	navlinks: {
		flexGrow: 5,
		marginTop: 20,
	},
}))

function LinksGroup({ icon: Icon, initiallyOpened, links, ...props}) {
	const { classes, theme } = useStyles()
	const items = props.items === null ? [] : props.items

	function listItemGenerator(fetchItem) {
		return fetchItem?.map(item => {
			if (item.accTypeId === 2 || item.accTypeId === 4) {
				return itemList(item)
			} else if (item.accTypeId === 5) {
				return listGroup(item, listItemGenerator(item.childsPools))
			}
		})
	}

	return <Box className={classes.navlinks}>{listItemGenerator(items)}</Box>

	function itemList(accInfo) {
		// const [style,trigger] = useBoop({x : 2})
		return (
			<Link to={accInfo.modName}>
				<ul className={classes.link} key={'list' + accInfo.label}>
					<animated.span
						class="material-symbols-rounded"
						style={{ color: 'black', paddingRight: 10 }}
					>
						{accInfo.iconName.slice(0, 1).toUpperCase() +
							accInfo.iconName.slice(1)}
					</animated.span>
					<a key={'listItem_' + accInfo.accInfoId}>{accInfo.accInfoName}</a>
				</ul>
			</Link>
		)
	}

	function listGroup(item, nodes) {
		const open = props.menuGroupState[item.accInfoId]
		return (
			<Box key={'frg_' + item.accInfoId}>
				<Divider />
				<NavLink
					key={'grpListItem_' + item.accInfoId}
					onClick={() =>
						props.onMenuItemAction({
							action: 'menuItemGroupClick',
							payload: item,
						})
					}
					label={item.accInfoName}
				>
					{nodes}
				</NavLink>
				<Divider />
			</Box>
		)
	}
}

export default LinksGroup
