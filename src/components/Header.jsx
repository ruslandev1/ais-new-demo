import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { AccountCircle } from '@mui/icons-material';
import { LinearProgress, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from "../actions/loginAction";
import { connect, useSelector, useDispatch } from 'react-redux'
import {
  fetchMenuListInfoIfNeeded,
  setMenuList,
  setMenuGroupShow,
} from "../reducers/MenuReducer";
import {
  avrFetch,
  readResponseAsJSON,
  validateResponse,
} from "../utils/AvroraFetch";
import { BACKEND_URL } from "../utils/Constants";
import DrawerMenuItems from './DrawerMenuItems';
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


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



// customizing accordion

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .01)'
      : 'rgba(0, 0, 0, 0)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  }, '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '& .MuiAccordionDetails-root': {
    padding: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  '& .css-10hburv-MuiTypography-root': {
    fontSize: "0.875rem"
  },
}));


function Header({ isAuthenticated: auth, logOut, user, ...props }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [menuList, setMenuListState] = React.useState(new AccInfo());
  const [menuComponent, setMenuComponent] = React.useState({})

  const dispatch = useDispatch();
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


  React.useEffect(() => {
    if (loginState.isAuthenticated && !loginState.logInProgress) {
      console.log("Fetching menu list...");
      dispatch(fetchMenuListInfoIfNeeded());
    }
  }, [dispatch, loginState]);

  React.useEffect(() => {
    console.log("Fetching menus...");
    if (!isEmpty(menuList)) return
    avrFetch(BACKEND_URL + "/api/AccPool/GetMenuList")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        if (!isEmpty(response) && response.success === true) {
          dispatch(setMenuList(response.data));
          console.log("menuList", response.data)
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
    // return (
    //   <>
    //     <LinearProgress />
    //     Menu yüklənir...
    //   </>
    // );
  }
  console.log("Budakecdi");
  if (isEmpty(menuList)) return <Fragment />;
  console.log(
    "props.menuList: ",
    menuList.childsPools
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLogout = () => {
    setAnchorEl({ anchorEl: null });
    logOut(user);
  };
  const handleResetSession = () => {
    setAnchorEl({ anchorEl: null })
  }
  return (
    <CssBaseline>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.moduleTitle}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <RouterLink to="/profile">Profil</RouterLink>
            </MenuItem>
            <MenuItem onClick={handleResetSession}>
              <RouterLink to="/settings">Tənzimləmə</RouterLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Çıxış</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {[props.moduleTitle].map((text, index) => (
            <RouterLink to="/" key={index + "_rscl"}>
            <Link  key={index + "_scl"} disablePadding  underline='none' sx={{color: "black"}}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
            </RouterLink>
          ))}
        </List> */}
        <DrawerMenuItems
          items={menuList.childsPools}
          onMenuItemAction={handleMenuItemAction}
          menuGroupState={menuGroupShow}
        />
        <Divider />
        {/* Accordion menu */}
        {/* <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '23%', flexShrink: 0 }}>
            Kpi
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
            <List>
          {['Kpi Nəticələri', 'Kpi ailə nəticələri', 'Kpi geriqaytarmalar', 'Kpi Istehsalçı planları'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '23%', flexShrink: 0 }}>
            PM
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
            <List>
          {['Hədəf və öndəliklər'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </List>
        </AccordionDetails>
      </Accordion>
    </div> */}
      </Drawer>
    </CssBaseline>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenuListInfoIfNeeded: () => {
      dispatch(fetchMenuListInfoIfNeeded());
    },
    fromStoreCloseDrawer: () => {
      dispatch({ type: CLOSE_DRAWER });
    },
    logOut: (usrname) => {
      dispatch(logout(usrname));
    },
    fromStoreOpenDrawer: () => {
      dispatch({
        type: OPEN_DRAWER,
      });
    },
    setMenuList: (list) => dispatch(setMenuList(list)),
    setMenuGroupShow: (data) => dispatch(setMenuGroupShow(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    moduleTitle: state.appState.moduleTitle,
    drawerOpen: state.drawerState.drawerOpen,
    isAuthenticated: state.loginState.isAuthenticated,
    user: state.loginState.user,
  };
};


export default (connect(mapStateToProps, mapDispatchToProps)(Header));
