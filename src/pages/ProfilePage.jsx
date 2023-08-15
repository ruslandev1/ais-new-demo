import React from 'react';
import PageWrapper from "./PageWrapper";
import {connect} from "react-redux";
import {setModuleTitle} from "../actions/AppStateActions";
import EmpProfile from "../components/employee/register/profile/EmpProfile";

const ProfilePage = props => {
    return(<PageWrapper history={props.history} component={<EmpProfile empId={props.user.empId} match={props.match}/>}/>)
};

function mapStateToProps(state){
    return {
        user: state.loginState.user,
    };
}
export default connect(mapStateToProps, dispatch => dispatch(setModuleTitle('Profil')) )(ProfilePage);
