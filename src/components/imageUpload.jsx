import React, {Fragment} from 'react';
import { styled } from '@mui/material/styles';
import {avrFetch, readResponseAsJSON, validateResponse} from "../utils/AvroraFetch";
import { BACKEND_URL } from '../utils/Constants';
import {isEmpty} from "../utils";
import Button from "@mui/material/Button/index";
import Grid from "@mui/material/Grid/index";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import notify from "devextreme/ui/notify";

const PREFIX = 'ImageUpload';

const classes = {
    button: `${PREFIX}-button`,
    input: `${PREFIX}-input`,
    root: `${PREFIX}-root`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.button}`]: {
        margin: theme.spacing(1),
    },

    [`& .${classes.input}`]: {
        display: 'none',
    },

    [`& .${classes.root}`]: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1),
        width: '40%',
    }
}));

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.empId = this.props.empId;
        this.state = {
            file: '',
            imagePreviewUrl: '',
            cropResultUrl: '',
            cropBlob: '',
        };
    }

    render() {
        const {classes} = this.props;
        let {imagePreviewUrl, cropResultUrl} = this.state;
        return (
            <Root>
                <Grid container spacing={2}>
                    <Grid  item xs={12}>
                            <input style={{display: 'none'}}
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={this.handleImageChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button className={classes.button} variant="contained" component="span" style={{margin: 5}}>
                                    Şəkil seç
                                </Button>
                            </label>
                            <Button className={classes.button} variant="contained" color="primary"  style={{margin: 5}} disabled={!cropResultUrl} onClick={this.handleImageUpload}>
                                Yadda saxla
                            </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{textAlign: 'center', margin: 10, height: 320, width: 350, border: '1px solid grey'}} className="imgPreview">
                            {imagePreviewUrl ?
                                (cropResultUrl ?
                                    <img style={{width: '100%', height: '100%'}} src={cropResultUrl} />
                                    :
                                <Cropper
                                    ref = {cropper => {this.cropper = cropper;}}
                                    src = {imagePreviewUrl}
                                    style={{width: '100%', height: '100%'}}
                                    initialAspectRatio = {9 / 9}
                                    guides = {false}
                                    checkOrientation={false}
                                />)
                                :
                                <p>Ön izləmə üçün şəkil seçin</p>
                            }
                        </div>
                        {imagePreviewUrl &&
                        <Button className={classes.button} variant="contained" component = "span" disabled={!!cropResultUrl}   onClick={this.cropImage}>
                            Kəs
                        </Button>}
                    </Grid>
                </Grid>
            </Root>
        );
    }

    handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                cropResultUrl: '',
            });
        };
        if(!isEmpty(file)){
            reader.readAsDataURL(file);
        }
    };

    cropImage = () => {
        if (typeof this.cropper === 'undefined') {
            return;
        }

        const dataUrl =  this.cropper.getCroppedCanvas().toDataURL('image/jpeg');

        this.cropper.getCroppedCanvas().toBlob(blob =>{
            this.setState(Object.assign({}, this.state, {
                cropResultUrl: dataUrl,
                cropBlob: blob
            }));
        }, 'image/jpeg');
    };

    handleImageUpload=()=> {
        if (this.empId === 0) {
            notify("İşçi seçilməyib", 'error', 2000);
            return;
        }

        if(this.state.cropResultUrl===''){
            notify("Şəkli seçin", 'error', 2000);
            return;
        }

        const formData = new FormData();

        formData.append('image', this.state.cropBlob);
        avrFetch(BACKEND_URL + '/api/User/UploadUserImage?empId='+this.empId, {
            method: "POST",
            body: formData,
        },["Accept", "Content-Type"])
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value', value);
                    if (!isEmpty(value) && value.success === true && value.data !==0) {
                        notify("Şəkil müvəffəqiyyətlə dəyişdirildi", 'success', 2000);
                        this.props.whenUploaded();
                    } else {
                        notify(value.responseMessage, 'error', 2000);
                    }
                }
            ).catch(err => {
            notify(err.message, 'error', 2000);
        });
    };

}
export default (ImageUpload);
