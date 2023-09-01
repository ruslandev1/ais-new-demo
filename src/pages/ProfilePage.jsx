import React from 'react';
import PageWrapper from "./PageContainer";
import {connect} from "react-redux";
import {setModuleTitle} from "../actions/AppStateActions";
// import EmpProfilFunc from '../components/employee/EmpProfile';
import  EmpProfile from '../components/employee/EmpProfile';
import DashboardLayout from './Dashboard/layout';

const ProfilePage = props => {
    console.log('PROFILE_PROPS', props)
    return <DashboardLayout children={<EmpProfile empId={props.user.empId}/>}/>
};


export default connect(mapStateToProps, dispatch => dispatch(setModuleTitle('Profil')) )(ProfilePage);

function mapStateToProps(state){
    return {
        user: state.loginState.user,
    };
}