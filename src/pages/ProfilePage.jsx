import React from 'react';
import PageWrapper from "./PageWrapper";
import {connect} from "react-redux";
import {setModuleTitle} from "../actions/AppStateActions";
import EmpProfile from '../components/employee/EmpProfile';

const ProfilePage = props => {
    console.log('PROFILE_PROPS', props)
    // return(<PageWrapper component={<EmpProfile empId={props.user.empId}/>}/>)
    return <PageWrapper component={<EmpProfile  empId={props.user.empId}/>}/>
};


export default connect(mapStateToProps, dispatch => dispatch(setModuleTitle('Profil')) )(ProfilePage);

function mapStateToProps(state){
    return {
        user: state.loginState.user,
    };
}