import React from "react";
import { styled } from '@mui/material/styles';
import {isEmpty} from "../utils/Validator";
import {authenticate, login} from "../actions/loginAction";
import {connect} from "react-redux";
import withRouter from "../utils/WithRouterAlt";
import SignIn from "./SignIn";

const PREFIX = 'LoginForm';

const classes = {
    card: `${PREFIX}-card`,
    bullet: `${PREFIX}-bullet`,
    title: `${PREFIX}-title`,
    pos: `${PREFIX}-pos`,
    textField: `${PREFIX}-textField`,
    button: `${PREFIX}-button`
};

const StyledSignIn = styled(SignIn)((
    {
        theme
    }
) => ({
    [`& .${classes.card}`]: {
        minWidth: 275,

    },

    [`& .${classes.bullet}`]: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.6)',
    },

    [`& .${classes.title}`]: {
        marginBottom: 56,
        fontSize: 14,
    },

    [`& .${classes.pos}`]: {
        marginBottom: 12,
    },

    [`& .${classes.textField}`]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

    [`& .${classes.button}`]: {
        margin: theme.spacing(1),
    }
}));

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
        const {username, password} = this.state;
        const errors = {};
        if (!username || isEmpty(username)) {
            errors.username = "İstifadəçi adı boş ola bilməz";
        }

        if (!password || isEmpty(password)) {
            errors.password = "Parol boş ola bilməz";
        }

        this.setState(Object.assign({}, this.state, {errors}));
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
        const {name, value} = data;
        if (name === 'reCaptcha') {
            this.props.loginState.resetCaptcha = false;
        }
        this.setState({[name]: value});
    };

    render() {
        const {errors} = this.state;
        const {logInProgress, signInErrorMessage, resetCaptcha, user} = this.props.loginState;
        if (signInErrorMessage)
            errors.summary = signInErrorMessage;
        console.log('loginState: ', logInProgress, signInErrorMessage, user);
        return (
            <StyledSignIn onSubmit={this.onSubmit}
                            logInProgress={logInProgress}
                            onChange={this.handleChange}
                            username={this.state.username}
                            password={this.state.password}
                            errors={errors}
                            isCaptchaRequired={this.state.isCaptchaRequired}
                            resetCaptcha={resetCaptcha}
            />
        );
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState
});


export default (connect(mapStateToProps, {authenticate})(withRouter(LoginForm)));
