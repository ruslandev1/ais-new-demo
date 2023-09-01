import React from 'react';
import PageWrapper from "./PageContainer";
import PasswordForm from "../components/PasswordForm";
import {connect} from "react-redux";
import {setModuleTitle} from "../actions/AppStateActions";
import DashboardLayout from './Dashboard/layout';

const SettingsPage = props => {
    return(<DashboardLayout children={<PasswordForm empId={props.user.empId} />}/>)
};

function mapStateToProps(state){
    return {
        user: state.loginState.user,
    };
}
export default connect(mapStateToProps, dispatch => dispatch(setModuleTitle('Tənzimləmə')) )(SettingsPage);
