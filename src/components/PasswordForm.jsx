import React, { Fragment } from "react";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import { Snackbar as CustomizedSnackbars } from "@mui/material";
import { avrFetch, readResponseAsJSON, validateResponse } from "../utils/AvroraFetch";
import { BACKEND_URL } from "../utils/Constants";
import { isEmpty } from "../utils";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";


const PREFIX = 'PasswordForm';

const classes = {
    button: `${PREFIX}-button`,
    leftIcon: `${PREFIX}-leftIcon`,
    rightIcon: `${PREFIX}-rightIcon`,
    iconSmall: `${PREFIX}-iconSmall`,
    root: `${PREFIX}-root`
};

const Root = styled("div")((
    {
        theme
    }
) => ({
    [`& .${classes.button}`]: {
        margin: theme.spacing(1),
    },

    [`& .${classes.leftIcon}`]: {
        marginRight: theme.spacing(1),
    },

    [`& .${classes.rightIcon}`]: {
        marginLeft: theme.spacing(1),
    },

    [`& .${classes.iconSmall}`]: {
        fontSize: 20,
    },

    [`& .${classes.root}`]: {
        // ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(3),
        paddingInline: theme.spacing(3),
        width: '40%',
    }
}));

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.empId = this.props.empId;
        console.log('this.empId: ', this.empId);
        this.state = {
            oldPsw: '',
            newPsw: '',
            rePsw: '',
            showOldPsw: false,
            showNewPsw: false,
            showRePsw: false,
            isMatch: true,
            snackBar: { show: false, message: '', variant: 'success' }
        };

    }

    render() {
        // const {classes} = this.props;
        const xs = 12;
        return (
            <Fragment>
                <Root sx={{marginTop : 10}}>
                <Paper className={classes.root} elevation={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={xs}>
                            <TextField type={this.state.showOldPsw ? 'text' : 'password'}
                                id="oldPsw" name='oldPsw' label="Əvvəlki şifrə"
                                onChange={this.handleOnChange} fullWidth InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                id='showOldPsw'
                                                name="showOldPsw"
                                                aria-label="Toggle password visibility"
                                                onClick={() => this.handleClickShowPassword('showOldPsw')}
                                                size="large"> {this.state.showOldPsw ?
                                                    <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={xs}>
                            <TextField type={this.state.showNewPsw ? 'text' : 'password'}
                                id="newPsw" name='newPsw' label="Yeni şifrə"
                                onChange={this.handleOnChange} fullWidth InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                id='showNewPsw'
                                                name="showNewPsw"
                                                aria-label="Toggle password visibility"
                                                onClick={() => this.handleClickShowPassword('showNewPsw')}
                                                size="large"> {this.state.showNewPsw ?
                                                    <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={xs}>
                            <FormControl fullWidth>
                                <TextField type={this.state.showRePsw ? 'text' : 'password'}
                                    id="rePsw" name='rePsw' label="Yeni şifrənin təsdiqlənməsi"
                                    onChange={this.handleOnChange} fullWidth InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    id='showRePsw'
                                                    name="showRePsw"
                                                    aria-label="Toggle password visibility"
                                                    onClick={() => this.handleClickShowPassword('showRePsw')}
                                                    size="large"> {this.state.showRePsw ?
                                                        <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }} />
                                <FormHelperText error={true}>{this.state.isMatch ? '' : 'şifrələr eyni deyil'}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={xs}>
                            <Button className={classes.button} variant="contained" color="primary" style={{ margin: 5 }}>LƏĞV
                                ET</Button>
                            <Button className={classes.button}
                                onClick={() => this.UpdatePsw()}
                                variant="contained" color="primary" style={{ margin: 5 }}
                                autoFocus>TƏSDİQLƏ</Button>
                        </Grid>
                    </Grid>
                </Paper>
                </Root> 
                {this.showSnackBar()}
            </Fragment>
        );
    }


    showHideSnackbar = (message, variant, show) => {
        if (show === undefined)
            show = true;
        if (variant === undefined)
            variant = 'error';
        this.setState(
            Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, { show, message, variant }),
            })
        );
    };

    showSnackBar = () => {
        let { show, message, variant } = this.state.snackBar;
        return (
            <CustomizedSnackbars message={message} variant={variant}
                open={Boolean(show)}
                handleClose={() => this.showHideSnackbar(message, variant, false)} />
        );

    };

    handleOnChange = event => {
        this.setState(Object.assign({}, this.state, {
            [event.target.name]: event.target.value,
        }));

        console.log(this.state);
    };

    handleClickShowPassword = name => {
        this.setState(Object.assign({}, this.state, { [name]: !this.state[name] }));
        console.log(name);
    }

    UpdatePsw() {
        if (this.empId === 0) {
            this.showHideSnackbar("İşçi seçilməyib", 'error', true);
            return;
        }

        if (this.state.newPsw !== this.state.rePsw) {
            this.setState(Object.assign({}, this.state, { isMatch: false }));
            return;
        }
        this.setState(Object.assign({}, this.state, { isMatch: true }));

        const valueData = {
            empId: this.empId,
            oldPsw: this.state.oldPsw,
            newPsw: this.state.newPsw,
            rePsw: this.state.rePsw
        }

        valueData.empId = this.empId;

        avrFetch(BACKEND_URL + '/api/User/UpdateUserPassword ', {
            method: "POST",
            body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true && value.data === 1) {
                        this.setState(Object.assign({}, this.state, {
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: 'Şifrəniz müvəffəqiyyətlə dəyişdirildi',
                                variant: 'success'
                            }),
                        }));
                    } else {
                        this.setState(Object.assign({}, this.state, {
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: value.responseMessage,
                                variant: 'error'
                            }),
                        }));
                    }
                }
            ).catch(err => {
                this.showHideSnackbar(err.message, 'error', true);
            });
    }
}

PasswordForm.propTypes = {
    empId: PropTypes.number.isRequired,
    title: PropTypes.string,
};
PasswordForm.defaultProps = {
    title: '',
};

export default (PasswordForm);
