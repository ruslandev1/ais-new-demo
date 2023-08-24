import * as React from 'react';
import { connect } from "react-redux"
import { logout } from "../actions/loginAction";
import { NavbarNested } from './Navbar';

function Header({ isAuthenticated: auth, logOut, user, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <NavbarNested {...props} handleLogout={handleLogout}/>
  );
}

const mapStateToProps = (state) => {
  return {
    moduleTitle: state.appState.moduleTitle,
    drawerOpen: state.drawerState.drawerOpen,
    isAuthenticated: state.loginState.isAuthenticated,
    user: state.loginState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (usrname) => {
      dispatch(logout(usrname));
    },
    fromStoreOpenDrawer: () => {
      dispatch({
        type: OPEN_DRAWER,
      });
    },
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(Header));
