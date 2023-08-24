import { useState } from 'react';
import {
  Box,
  createStyles,
  rem,
  NavLink,
  Text,
  Divider,
  Flex
} from '@mantine/core';
import { ChevronLeft, ChevronRight, Home2 } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },

  root: {
    width: '100%',
    maxWidth: 360,
  },
  nested: {
    paddingLeft: '1.25rem'
  }
  ,
  navlinks: {
    flexGrow: 5,
    // height: 700,
    marginTop: 20
  }

}));

function LinksGroup({ icon: Icon, initiallyOpened, links, ...props }) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;

  const items = props.items === null ? [] : props.items;

  function listItemGenerator(fetchItem) {
    return fetchItem?.map(item => {
      if (item.accTypeId === 2 || item.accTypeId === 4) {
        return itemList(item);
      }
      else if (item.accTypeId === 5) {
        return listGroup(item, listItemGenerator(item.childsPools));
      }
    });
  }

  return (
    <Box className={classes.navlinks} >{listItemGenerator(items)}</Box>
  );

  function itemList(accInfo) {
    // console.log("ACCINFO", accInfo)
    return (
      <Link to={accInfo.modName}>
        <Flex wrap="nowrap" direction="row-reverse" justify="center" align="center" sx={{ marginLeft: 20, }}>
          <NavLink key={'listItem_' + accInfo.accInfoId} label={accInfo.accInfoName} />
          {/* <ListItemIcon style={{ minWidth: 35 }}>
          <span className='material-icons'>{accInfo.iconName}</span>
        </ListItemIcon> */}
          <Home2 />
        </Flex>
      </Link>
    );
  }

  function listGroup(item, nodes) {
    const open = props.menuGroupState[item.accInfoId];
    return (
      <Box key={'frg_' + item.accInfoId} >
        <Divider />
        <NavLink
          key={'grpListItem_' + item.accInfoId}
          onClick=
          {() => props.onMenuItemAction
            ({
              action: 'menuItemGroupClick',
              payload: item
            }
            )}
          label={item.accInfoName}
          
        >
          {nodes}
        </NavLink>
        <Divider />
      </Box>
    );
  }



  // return (
  //   <>
  //     <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
  //       <Group position="apart" spacing={0}>
  //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //           <ThemeIcon variant="light" size={30}>
  //             <Icon size="1.1rem" />
  //           </ThemeIcon>
  //           <Box ml="md">{label}</Box>
  //         </Box>
  //         {hasLinks && (
  //           <ChevronIcon
  //             className={classes.chevron}
  //             size="1rem"
  //             stroke={1.5}
  //             style={{
  //               transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
  //             }}
  //           />
  //         )}
  //       </Group>
  //     </UnstyledButton>
  //     {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
  //   </>
  // );
}

export default LinksGroup