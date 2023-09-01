import React from 'react';
import {connect} from "react-redux";
import { useLocation, Navigate , useNavigate} from "react-router-dom";

import withRouter from "../utils/WithRouterAlt"
import LoginForm from "../components/Login/LoginForm";


const LoginPage = (props) => {
    console.log("login-state-page: ", props)
    const navigate = useNavigate();
    return props.isAuthenticated ? <Navigate replace to="/"/>  : <LoginForm />;
}




export default withRouter(
    connect((state) => {
        return {isAuthenticated: state.loginState.isAuthenticated};
    }, null)(LoginPage)
);
