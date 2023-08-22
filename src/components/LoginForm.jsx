import React from "react";
import { styled } from '@mui/material/styles';
import { isEmpty } from "../utils/Validator";
import { authenticate, login } from "../actions/loginAction";
import { connect } from "react-redux";
import withRouter from "../utils/WithRouterAlt";
import SignIn from "./SignIn";
import { Box, Center, Container } from "@mantine/core";




class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            reCaptcha: '',
            errors: {
                username: '',
                password: '',
                summary: '',
            },
            resetCaptcha: false,
        };
    }


    checkForm = () => {
        const { username, password } = this.state;
        const errors = {};
        if (!username || isEmpty(username)) {
            errors.username = "İstifadəçi adı boş ola bilməz";
        }

        if (!password || isEmpty(password)) {
            errors.password = "Parol boş ola bilməz";
        }

        this.setState(Object.assign({}, this.state, { errors }));
        return !isEmpty(errors);
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.checkForm()) {
            return;
        }

        this.props.authenticate(
            {
                username: this.state.username,
                password: this.state.password,
                reCaptcha: this.state.reCaptcha,
                isCaptchaRequired: this.state.isCaptchaRequired,
            });
    };

    handleChange = data => {
        const { name, value } = data;
        if (name === 'reCaptcha') {
            this.props.loginState.resetCaptcha = false;
        }
        this.setState({ [name]: value });
    };

    render() {
        const { errors } = this.state;
        const { logInProgress, signInErrorMessage, user } = this.props.loginState;
        if (signInErrorMessage)
        errors.summary = signInErrorMessage;
        console.log('loginState: ', logInProgress, errors, user);
        return (
            <Container h={"100%"}>
                <SignIn onSubmit={this.onSubmit}
                    logInProgress={logInProgress}
                    onChange={this.handleChange}
                    username={this.state.username}
                    password={this.state.password}
                    errors={errors}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState
});


export default (connect(mapStateToProps, { authenticate })(withRouter(LoginForm)));
