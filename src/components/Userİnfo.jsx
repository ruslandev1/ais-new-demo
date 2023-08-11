import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from "@mui/material";
import {
  avrFetch,
  readResponseAsBlob,
  readResponseAsJSON,
  validateResponse,
} from "../utils/AvroraFetch";

import { BACKEND_URL } from "../utils/Constants";
import { isEmpty } from "../utils";

const PREFIX = 'Home';

const CardActions = styled('CardActions')(({ theme }) => ({
    '& .css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
        fontSize: "0.65rem",
        fontWeight: "700"
      },
}));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        fatherName: "",
        email: "",
        bdate: "",
        lastLogin: "",
        lastIp: "",
        empPosTitle: "",
        depTitle: "",
        username: "",
      },
    };
    this.imgRef = React.createRef();
  }

  componentWillMount() {
    this.loadProfileImg();
    this.fetchUserInfo();
  }

  loadProfileImg() {
    avrFetch(BACKEND_URL + "/api/User/img/", {
      cache: "default",
    })
      .then(validateResponse)
      .then(readResponseAsBlob)
      .then((myBlob) => {
        const file = new Blob([myBlob], { type: "image/jpeg" });
        let fileUrl = (window.URL || window.webkitURL).createObjectURL(file);
        console.log("fileUrlfileUrl: ", fileUrl);
        this.imgRef.current.src = fileUrl;
      })
      .catch((reason) =>
        this.setState(
          Object.assign({}, this.state, {
            loading: false,
            errors: reason.message,
          })
        )
      );
  }

  fetchUserInfo() {
    avrFetch(BACKEND_URL + "/api/User/Get/")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        if (!isEmpty(response) && response.success === true) {
          this.setState(Object.assign({}, this.state, { user: response.data }));
        }
      })
      .catch((reason) => {});
  }

  render() {
    const { } = this.props;
    const { user } = this.state;
    console.log("USER INFO", this.state.user)
    if (isEmpty(user)) return <div />;
    return (
        <Card sx={{display: "flex", flexDirection: "column", alignItems: "center", overflow: "visible", margin: 0, padding: 0}}>
          <CardMedia> 
            <Avatar
            ref={this.imgRef} 
            alt="Remy Sharp" 
            src="http://www.markweb.in/primehouseware/images/noimage.png" 
            sx={{ 
                width: 125, 
                height: 125,
                position: "relative",
                bottom: 70,
                zIndex: 2,
            }} 
            />
            </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {user.firstName} / {user.lastName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Çox istifadə edilən keçidlər üçün buraya klik edin</Button>
          </CardActions>
        </Card>
      );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (Home);
