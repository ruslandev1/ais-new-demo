import { Snackbar } from "@mui/material";
import React from "react";
import {avrFetch, readResponseAsJSON, validateResponse} from "../utils/AvroraFetch";
import Loading from "./Loading";
import {LoadPanel} from "devextreme-react";
import {toast} from "react-toastify";


export default class CoreComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            snackBar: {},
        };
    }

    deleteMethod(url, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
                    // console.group("DELETE_METHOD");
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.responseMessage);
                    }
                }
            )
            .catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    deleteMethodBody(url, body, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(response => {
                    // console.group("POST_METHOD");
                    // console.log('body: ', body);
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.responseMessage);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    getMethod(url, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                response => {
                    // console.group("GET_METHOD");
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();

                    if (response && (response.success || response.code === 1)) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.responseMessage);

                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    postMethod(url, body, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(response => {
                    // console.group("POST_METHOD");
                    // console.log('body: ', body);
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.responseMessage);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    postMethodUploadFile(url, body, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {
            method: 'POST',
            body: body,
        }, ["Accept", "Content-Type"])
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(response => {
                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.responseMessage);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    getMethodRawResponse(url, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                response => {
                    // console.group("GET_METHOD");
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();
                    successCallback(response);

                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    postMethodRawResponse(url, body, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(response => {
                    // console.group("POST_METHOD");
                    // console.log('body: ', body);
                    // console.log('URL: ', url);
                    // console.log('Response: ', response);
                    // console.groupEnd();

                    if (response && response.success) {
                        successCallback(response);
                    } else {
                        errorCallback(response.responseMessage);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    loadingCore = processing  => processing && <Loading/>;

    loading = () => this.loadingCore(this.state.processing);
    processing = processing => this.setState(Object.assign({}, this.state, {processing}));


    info = msg => {
        toast.info(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    success = msg => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    warn = msg => {
        toast.warn(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    error = (msg) =>{
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });


        //notify(err, 'error', 2000);
        // this.setState(Object.assign({}, this.state, {
        //     confirmDialog: Object.assign({}, this.state.confirmDialog, {open: false})
        // }))
    };




    //todo depracted
    snackbar = () => {
        return this.showSnackBar(this.state.snackBar, () => {
            this.setState(Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, {
                    show: false,
                }),
            }))
        })
    };
    //todo depracted
    showSnackBar = (snackBar, onClose) => {
        const {show, message, variant} = snackBar;
        return (
            <Snackbar message={message} variant={variant}
                                 open={Boolean(show)}
                                 handleClose={onClose}/>
        );
    };
    //todo depracted
    //todo depracted
    addLoading = processing => <LoadPanel
        shadingColor={'rgba(0,0,0,0.4)'}
        //position={{of: '#reportSelectorDlg'}}
        visible={processing}
        showIndicator={true}
        shading={false}
        showPane={true}/>;

    //todo depracted
    updateTableRows = (id, newRows, updateRows) => {
        const rows = updateRows.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };
}

