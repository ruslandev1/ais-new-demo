import { avrFetch, readResponseAsJSON, validateResponse } from "./AvroraFetch";
import { toast } from "react-toastify";

export default class ApiHelper {
  static all(requestList, processingCallback, errorCallback, callback) {
    processingCallback(true);

  
  }

  static deleteMethod(url, processingCallback, errorCallback, successCallback) {
    processingCallback(true);
    avrFetch(url, { method: "DELETE" })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        // console.group("DELETE_METHOD");
        // console.log('URL: ', url);
        // console.log('Response: ', response);
        // console.groupEnd();

        if (response && response.success) {
          successCallback(response.data);
        } else {
          errorCallback(response.responseMessage);
        }
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static deleteMethodBody(
    url,
    body,
    processingCallback,
    errorCallback,
    successCallback
  ) {
    processingCallback(true);
    avrFetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
    })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
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
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static getMethod(url, processingCallback, errorCallback, successCallback) {
    processingCallback(true);
    avrFetch(url)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        // console.group("GET_METHOD");
        // console.log('URL: ', url);
        // console.log('Response: ', response);
        // console.groupEnd();

        if (response && (response.success || response.code === 1)) {
          successCallback(response.data);
        } else {
          errorCallback(response.responseMessage);
        }
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static postMethod(
    url,
    body,
    processingCallback,
    errorCallback,
    successCallback
  ) {
    processingCallback(true);
    avrFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
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
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static getMethodRawResponse(
    url,
    processingCallback,
    errorCallback,
    successCallback
  ) {
    processingCallback(true);
    avrFetch(url)
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        // console.group("GET_METHOD");
        // console.log('URL: ', url);
        // console.log('Response: ', response);
        // console.groupEnd();
        successCallback(response);
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static postMethodRawResponse(
    url,
    body,
    processingCallback,
    errorCallback,
    successCallback
  ) {
    processingCallback(true);
    avrFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
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
      })
      .catch((err) => errorCallback(err.message))
      .finally(() => processingCallback(false));
  }

  static info = (msg) => {
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
  static success = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  static warn = (msg) => {
    toast.warn(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  static error = (msg) => {
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
}
