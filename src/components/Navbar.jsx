import { Navbar, Group, Text, ScrollArea, createStyles, rem} from '@mantine/core';
import {
  Notes,
  CalendarStats,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Lock,
} from "tabler-icons-react"
import { UserButton } from './UserButton';
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
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
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

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
}));
export function NavbarNested(props) {


 function loadProfileImg() {
    avrFetch(BACKEND_URL + "/api/User/img/", {
      cache: "default",
    })
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then((myBlob) => {
        const file = new Blob([myBlob], { type: "image/jpeg" });
        let fileUrl = (window.URL || window.webkitURL).createObjectURL(file);
        this.imgRef.current.src = fileUrl;
      })
      .catch((reason) =>
        this.setState(
          Object.assign({}, this.state, {
            loading: false,
            errors: reason.message,
          })
        )
      );
  }

  const dispatch = useDispatch()


  const { drawerOpen, menuList, accessState, loginState, menuGroupShow } = useSelector((state) => ({
    drawerOpen: state.drawerState.drawerOpen,
    menuList: state.menuList,
    accessState: state.accessState,
    loginState: state.loginState,
    menuGroupShow: state.menuList.menuGroupShow,
  }));

  console.log('LOGINSTATE-NAVBAR', loginState)


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


  useEffect(() => {
    console.log("Fetching menus...");
    if (!isEmpty(menuList)) return
    avrFetch(BACKEND_URL + "/api/AccPool/GetMenuList")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        if (!isEmpty(response) && response.success === true) {
          dispatch(setMenuList(response.data));
        }
      })
      .catch((reason) => {
        console.error(reason)
      });

  }, [menuList, dispatch]);

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
      console.log("qalsinburda");
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
  console.log('menuList', menuList.childsPools)

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar} >
      <Navbar.Section className={classes.header} >
        <Group position="apart">
          <Text fz="lg">{props.moduleTitle}</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <LinksGroup
          items={menuList.childsPools}
          onMenuItemAction={handleMenuItemAction}
          menuGroupState={menuGroupShow}
        />
        {/* <div className={classes.linksInner}><Link to={links.link}>{links}</Link></div> */}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="http://www.markweb.in/primehouseware/images/noimage.png"
          name={`${loginState.user.firstName} ${loginState.user.lastName}`}
        />
      </Navbar.Section>
    </Navbar>
  );
}