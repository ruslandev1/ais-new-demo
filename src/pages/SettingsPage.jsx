import React from 'react';
import PageWrapper from "./PageWrapper";
import PasswordForm from "../components/PasswordForm";
import {connect} from "react-redux";
import {setModuleTitle} from "../actions/AppStateActions";

const SettingsPage = props => {
    return(<PageWrapper component={<PasswordForm empId={props.user.empId} />}/>)
};

function mapStateToProps(state){
    return {
        user: state.loginState.user,
    };
}
export default connect(mapStateToProps, dispatch => dispatch(setModuleTitle('Tənzimləmə')) )(SettingsPage);
