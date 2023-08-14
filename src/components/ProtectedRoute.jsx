import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchAppUserAccessInfoIfNeeded } from "../actions/AppStateActions";
import { LinearProgress } from "@mui/material";
import { Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";

const ProtectedRoute = ({
  accessState,
  loginState,
  fetchAppUserAccessInfoIfNeeded,
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
  return <HomePage />
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
