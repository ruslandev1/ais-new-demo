import { Navbar, Group, Text, ScrollArea, createStyles, rem, getStylesRef, Button, UnstyledButton } from '@mantine/core';
import { SwitchHorizontal, Logout, User } from 'tabler-icons-react';
import LinksGroup from './NavbarLinksGroup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchMenuListInfoIfNeeded,
  setMenuList,
  setMenuGroupShow,
} from "../reducers/MenuReducer";
import { isEmpty } from '../utils';
import { avrFetch, validateResponse } from '../utils/AvroraFetch';
import { BACKEND_URL } from '../utils/Constants';
import { useQuery } from '@tanstack/react-query';



export class AccInfo {
  accInfoId = 0;
  accInfoName = "";
  accInfoPid = 0;
  accTypeId = 0;
  childsPools = [];
  iconName = "";
  modName = "";
  weight = 0;
}


const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    justifyContent : "space-between"
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 10,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer2: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    //  backgroundColor : 'black',
     marginBottom : 40
  },
   
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 700,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },
}));


export function NavbarNested(props) {
  
  
  const dispatch = useDispatch()

  const { drawerOpen, menuList, accessState, loginState, menuGroupShow } = useSelector((state) => ({
    drawerOpen: state.drawerState.drawerOpen,
    menuList: state.menuList,
    accessState: state.accessState,
    loginState: state.loginState,
    menuGroupShow: state.menuList.menuGroupShow,
  }));



  const handleMenuItemAction = (data) => {
    if (data.action === "menuItemGroupClick") {
      setMenuGroupShow(data.payload);
    }
  };


  useEffect(() => {
    if (loginState.isAuthenticated && !loginState.logInProgress) {
      console.log("Fetching menu list...");
      dispatch(fetchMenuListInfoIfNeeded());
    }
  }, [dispatch, loginState]);



  const fetchMenuList = async () => {
    const response = await avrFetch(BACKEND_URL + '/api/AccPool/GetMenuList');
    const data = await response.json();
    return data;
  };

  const { data: fetchedMenuList, isLoading, isError } = useQuery('menuList', fetchMenuList);


  useEffect(() => {
    if (fetchedMenuList && fetchedMenuList.success === true) {
      dispatch(setMenuList(fetchedMenuList.data));
    }
  }, [fetchedMenuList, dispatch]);


  if (
    !accessState ||
    !accessState.loaded ||
    accessState.isFetching ||
    accessState.didInvalidate ||
    !menuList ||
    menuList.didInvalidate ||
    !menuList.loaded
  ) {
    if (loginState.isAuthenticated && !loginState.logInProgress) {
      fetchMenuListInfoIfNeeded();
    }
  }



  const mapStateToProps = (state) => {
    return {
      moduleTitle: state.appState.moduleTitle,
      drawerOpen: state.drawerState.drawerOpen,
      isAuthenticated: state.loginState.isAuthenticated,
      user: state.loginState.user,
    };
  };

  const { classes } = useStyles();

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar} sx={{ zIndex: 0 }} >
      <Navbar.Section className={classes.header} >
        <Group position="apart">
          <Text fz="lg">{props.moduleTitle}</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} display="flex">
        <LinksGroup
          items={menuList.childsPools}
          onMenuItemAction={handleMenuItemAction}
          menuGroupState={menuGroupShow}
        />
      </Navbar.Section>

      <Navbar.Section  className={classes.footer}>
      <Link to="/profile" className={classes.link}>
          <Group>
          <User />
          <span>Profil</span>
          </Group>
        </Link>

        <Link to="/settings" className={classes.link}>
          <Group>
          <SwitchHorizontal />
          <span>Tənzimləmə</span>
          </Group>
        </Link>

        <UnstyledButton className={classes.link} sx={{ width: "100%" }} onClick={props.handleLogout}>
          <Group >
          <Logout />
          <span>Çıxış</span>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}