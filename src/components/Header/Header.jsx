import * as React from 'react';
import { connect } from "react-redux"
import { logout } from '../../actions/loginAction';
import {NavbarNested} from "../Navbar/Navbar"


function Header({ isAuthenticated: auth, logOut, user, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl,setAnchorEl] = React.useState(null)

  const handleLogout = () => {
    setAnchorEl(null);
    logOut(user);
  };

  return (
    // <PageWrapper component={<NavbarNested  {...props} handleLogout={handleLogout}/>/>}/>
    <NavbarNested  {...props} handleLogout={handleLogout} />
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
