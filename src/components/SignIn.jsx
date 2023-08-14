import React, { Fragment } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import logo from "../assets/img/logo.png";
import FormHelperText from "@mui/material/FormHelperText";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";


const MainLayout = styled('main')(({ theme }) => ({
  width: 'auto',

  // Fix IE 11 issue.
  display: 'block',

  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),

  // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
  [theme.breakpoints.up(400 + theme.spacing(6))]: {
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  // marginTop: theme.spacing.unit * 16,
  marginTop: theme.spacing(16),

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
}));

const StyledForm = styled('form')(({ theme }) => ({
  // Fix IE 11 issue.
  width: '100%',

  marginTop: theme.spacing(1),
}));
const ButtonSubmit = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.


let recaptchaInstance = null;

function SignIn(props) {
  const {
    classes,
    onSubmit,
    onChange,
    username,
    password,
    errors,
    logInProgress,
  } = props;


  return (
    <Fragment>
      <CssBaseline />
      <MainLayout>
        <StyledPaper>
          <img src={logo} />
          {errors.summary && (
            <FormHelperText error={true} id="component-helper-text">
              {errors.summary}
            </FormHelperText>
          )}
          {logInProgress && <CircularProgress size={15} color="secondary" />}
          <StyledForm>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">İstifadəçi adı</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={(event) =>
                  onChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={username}
              />
              {errors.username && (
                <FormHelperText error={true} id="component-helper-text">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Parol</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={(event) =>
                  onChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                autoComplete="current-password"
              />
              {errors.password && (
                <FormHelperText error={true} id="component-helper-text">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {(
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <ButtonSubmit
              onClick={onSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={logInProgress}
            >
              Daxil ol
            </ButtonSubmit>
          </StyledForm>
        </StyledPaper>
      </MainLayout>
    </Fragment>
  );
}

SignIn.propTypes = {
  // classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.object,
  isCaptchaRequired: PropTypes.bool,
  resetCaptcha: PropTypes.bool,
  logInProgress: PropTypes.bool,
};
SignIn.defaultProps = {
  username: "",
  password: "",
  isCaptchaRequired: false,
  errors: {
    username: null,
    password: null,
    summary: null,
  },
};
export default (SignIn);
