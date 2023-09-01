import { Container } from "@mantine/core";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../../utils/WithRouterAlt";
import { authenticate } from "../../actions/loginAction";
import SignIn from "./SignIn";




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


    // checkForm = (e) => {
    //     const { username, password } = this.state;
    //     const errors = {};
    //     console.log(e)
    //     if (!username || isEmpty(username)) {
    //         // errors.username = ;
    //     }

    //     if (!password || isEmpty(password)) {
    //         errors.password = "Parol boş ola bilməz";
    //     }

    //     this.setState(Object.assign({}, this.state, { errors }));
    //     return !isEmpty(errors);
    // };

    onSubmit = (e) => {
        e.preventDefault();
        // if (this.checkForm(e)) {
        //     return;
        // }

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
        console.log("name / value",data)
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
