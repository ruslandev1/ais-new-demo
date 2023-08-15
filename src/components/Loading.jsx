import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from "@mui/material/LinearProgress";
import { LoadPanel } from 'devextreme-react/load-panel';


const PREFIX = 'Loading';

const classes = {
    progress: `${PREFIX}-progress`
};

const StyledCircularProgress = styled(CircularProgress)((
    {
        theme
    }
) => ({
    [`& .${classes.progress}`]: {
        marginTop: theme.spacing(2),
    }
}));

function Loading(props) {
    // const { ...others } = props;
    // const isVisible = !!visible ? visible : true;
    return (
        <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            visible={true}
            showIndicator={true}
            shading={false}
        />

    );

}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (Loading);
