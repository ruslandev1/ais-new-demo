// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import {connect} from "react-redux";
// import PropTypes from 'prop-types';
// import {isEmpty} from "../utils/Validator";
// import {authenticate, login} from "../actions/loginAction";
// import withRouter from "../utils/WithRouterAlt";
// import { useState } from "react";

// function LoginForm({}) {

//   const [userInfo, setUserInfo] = useState({
//     username: '',
//     password: '',
//     reCaptcha: '',
//     errors: {
//         username: '',
//         password: '',
//         summary: '',
//     },
//   });


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };
//    const checkForm = () => {
//     // const errors = {};
//     if (!userInfo.username || isEmpty(userInfo.username)) {
//         userInfo.errors.username = "İstifadəçi adı boş ola bilməz";
//     }

//     if (!userInfo.password || isEmpty(userInfo.password)) {
//         userInfo.errors.password = "Parol boş ola bilməz";
//     }

//     // this.setState(Object.assign({}, this.state, {errors}));
//     setUserInfo(Object.assign({}, userInfo, {errors}))
//     return !isEmpty(errors);
// };

//   return (
//     <Container component="main" maxWidth="sm">
//       <Box
//         sx={{
//           boxShadow: 3,
//           borderRadius: 2,
//           px: 2,
//           py: 2,
//           marginTop: -15,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           AVRORA
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="İstifadəçi adı"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Parol"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Daxil ol
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }


// const mapStateToProps = state => ({
//   loginState: state.loginState
// });
// export default connect(mapStateToProps, {authenticate})(withRouter(LoginForm));








import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {isEmpty} from "../utils/Validator";
import {authenticate, login} from "../actions/loginAction";
import {connect} from "react-redux";
// import {withRouter} from 'react-router-dom'
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
        transform: 'scale(0.8)',
    },

    [`& .${classes.title}`]: {
        marginBottom: 16,
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
        // console.log('loginState: ', logInProgress, signInErrorMessage, user);
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

LoginForm.propTypes = {
    // classes: PropTypes.object.isRequired,
    // login: PropTypes.func.isRequired
};
export default (connect(mapStateToProps, {authenticate})(withRouter(LoginForm)));
