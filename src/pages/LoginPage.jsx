import React from 'react';
import {connect} from "react-redux";
import { useLocation, Navigate , useNavigate} from "react-router-dom";

import withRouter from "../utils/WithRouterAlt"
import LoginForm from "../components/LoginForm";


const LoginPage = (props) => { 
   const navigate = useNavigate();
    let location = useLocation();
    console.log("login-state: ", props)
    return props.isAuthenticated ? <Navigate to="/" state={{ from: location }} replace /> : <LoginForm />;
    // return <LoginForm />
}




export default withRouter(
    connect((state) => {
        return {isAuthenticated: state.loginState.isAuthenticated};
    }, null)(LoginPage)
);
