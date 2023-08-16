import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography/Typography";
import withStyles from "@mui/material/styles/withStyles";
import CloseIcon from '@mui/icons-material/Close';

const PREFIX = 'DialogTitle';

const classes = {
    root: `${PREFIX}-root`,
    closeButton: `${PREFIX}-closeButton`,
    root2: `${PREFIX}-root2`,
    root3: `${PREFIX}-root3`
};

const StyledMuiDialogTitle = styled(MuiDialogTitle)(({theme}) => ({
    [`&.${classes.root}`]: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(2),
    },

    [`& .${classes.closeButton}`]: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    [`& .${classes.root2}`]: {
        margin: 0,
        padding: theme.spacing(2),
    },

    [`& .${classes.root3}`]: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1),
    }
}));

export const DialogTitle  = () => ({
    [`&.${classes.root}`]: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(2),
    },

    [`& .${classes.closeButton}`]: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    [`& .${classes.root2}`]: {
        margin: 0,
        padding: theme.spacing(2),
    },

    [`& .${classes.root3}`]: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1),
    }
})



(props => {
    const { children,  onClose } = props;
    return (
        <StyledMuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={onClose}
                    size="large">
                    <CloseIcon />
                </IconButton>
            ) : null}
        </StyledMuiDialogTitle>
    );
});

export const DialogContent =  () => ({
    [`& .${classes.root2}`]: {
        margin: 0,
        padding: theme.spacing(2),
    }
})(MuiDialogContent);

export const DialogActions = () => ({
    [`& .${classes.root3}`]: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1),
    }
})(MuiDialogActions);
