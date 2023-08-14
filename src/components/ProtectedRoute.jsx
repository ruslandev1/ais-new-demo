import React, { Fragment } from "react";
import { Outlet} from "react-router-dom";
import { connect } from "react-redux";
import { fetchAppUserAccessInfoIfNeeded } from "../actions/AppStateActions";
import { LinearProgress } from "@mui/material";
import { Navigate} from "react-router-dom";
import Dashboard from "../pages/DashBoardPage";
import HomePage from "../pages/HomePage";

const ProtectedRoute = ({
  component: Component,
  dispatch,
  accessState,
  loginState,
  fetchAppUserAccessInfoIfNeeded,
  redirectPath="/login",
  children,
  ...rest
}) => {
  if (
    !accessState ||
    !accessState.loaded ||
    accessState.isFetching ||
    accessState.didInvalidate
  ) {
    if (loginState.isAuthenticated && !loginState.logInProgress) {
      fetchAppUserAccessInfoIfNeeded();
    }
    return (
      <Fragment>
        <LinearProgress />
      </Fragment>
    );
  }
// 
if (!loginState.isAuthenticated) {
    console.log("LOGIN_STATE", loginState)
    return <Navigate to={"/login"} replace />;
  }

  return  <HomePage/>;
; 
};

const mapStateToProps = (state) => {
  return {
    accessState: state.accessState,
    loginState: state.loginState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAppUserAccessInfoIfNeeded: () => {
      dispatch(fetchAppUserAccessInfoIfNeeded());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
