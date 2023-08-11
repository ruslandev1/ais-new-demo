import React from "react";
import PropTypes from "prop-types";
// import Typography from "@mui/material/Typography";
import { Typography } from "@mui/material";
function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      style={{
        padding: "10px",
        fontStyle: "italic",
        fontSize:'16px',
      }}
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
