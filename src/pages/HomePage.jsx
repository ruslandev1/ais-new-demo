import React from "react";
import PageWrapper from "./PageWrapper";
import Dashboard from "./DashBoardPage";
import { connect } from "react-redux";
import { setModuleTitle } from "../actions/AppStateActions";


const HomePage = (props) => {
  return <PageWrapper component={<Dashboard />}/>
}


export default connect(mapStateToProps, (dispatch) =>
  dispatch(setModuleTitle("Əsas Səhifə"))
)(HomePage);

function mapStateToProps(state) {
  return {
    user: state.loginState.user,
  };
}



