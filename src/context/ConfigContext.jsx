import React from "react";
import { BACKEND_URL } from "../utils/Constants";
import CoreComponent from "../components/common/CoreComponent";
import { ToastContainer } from "react-toastify";
import ConfirmDialogV2 from "../components/common/dialog/ConfirmDialogV2";
import { LoadPanel } from "devextreme-react/load-panel";
import { Popup } from "devextreme-react/popup";

export const ConfigContext = React.createContext({});

const LOAD_SYSTEM_DEFAULT_VALUE =
  BACKEND_URL + "/api/SystemConfig/GetSystemDefaultValues";
export default class ConfigContextProvider extends CoreComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialog: {
        data: {},

        title: "",
        message: "",
        show: false,
        showTitle: true,
        width: 400,
        height: 200,
        yesButtonLabel: "Bəli",
        noButtonLabel: "Xeyir",
      },

      // dialogData: {
      //     width: 300, height: 200, showTitle: true, title: "Başlıq",
      //     popupVisible: false,
      //     dragEnabled: true,
      //     closeOnOutsideClick: false,
      //     fullScreen: false,
      // },
      loading: false,
    };
    this._confirmDialogCallback = (event) => {};
  }

  componentDidMount() {
    this.loadSystemDefaultValue();
  }

  render() {
    const { confirmDialog, loading, dialogData } = this.state;
    const { show, data } = confirmDialog;

    // const {
    //     width,
    //     height,
    //     showTitle,
    //     title,
    //     popupVisible,
    //     dragEnabled,
    //     closeOnOutsideClick,
    //     fullScreen
    // } = dialogData;

    return (
      <ConfigContext.Provider
        value={{
          ...this.state,
          confirmDialog: this.confirmDialog,
          loading: this.loading,
          // showDialog: this.showDialog,
          // closeDialog: this.closeDialog,
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {this.props.children}

        {show && (
          <ConfirmDialogV2
            {...confirmDialog}
            onHiding={() => this.closeConfirmDialog()}
            yesOnClick={() => {
              this._confirmDialogCallback({
                action: "CLICK_YES_BUTTON",
                data: data,
              });
              this.closeConfirmDialog();
            }}
            noOnClick={() => {
              this._confirmDialogCallback({
                action: "CLICK_NO_BUTTON",
                data: data,
              });
              this.closeConfirmDialog();
            }}
          />
        )}

        {loading && (
          <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            //  position={position}
            //  onHiding={this.hideLoadPanel}
            visible={true}
            showIndicator={true}
            shading={false}
            closeOnOutsideClick={false}
            // showPane={isVisible}
            // closeOnOutsideClick={this.state.closeOnOutsideClick}
          />
        )}

        {
          // <Popup
          //     width={width}
          //     height={height}
          //     showTitle={showTitle}
          //     title={title}
          //     fullScreen={fullScreen}
          //     dragEnabled={dragEnabled}
          //     closeOnOutsideClick={closeOnOutsideClick}
          //     visible={popupVisible}
          //     onHiding={this.closeDialog}
          //     contentRender={this._popupContentRender}
          // />
        }
      </ConfigContext.Provider>
    );
  }

  loading = (b) => this.setState(Object.assign({}, this.state, { loading: b }));

  loadSystemDefaultValue = () => {
    this.getMethod(
      LOAD_SYSTEM_DEFAULT_VALUE,
      (p) =>
        console.log(
          "loadSystemDefaultValue ",
          p ? "processing..." : "processed"
        ),
      (e) => console.log("loadSystemDefaultValue error: ", e),
      (response) => {
        this.setState(Object.assign({}, this.state, response));
      }
    );
  };
  confirmDialog = (cdData) => {
    if (!cdData) return;
    if (typeof cdData.callback === "function")
      this._confirmDialogCallback = cdData.callback;
    cdData.show = true;
    this.setState(Object.assign({}, this.state, { confirmDialog: cdData }));
  };
  closeConfirmDialog = () => {
    const confirmDialog = { show: false };
    this.setState(
      Object.assign({}, this.state, { confirmDialog: confirmDialog })
    );
  };

  // closeDialog = () => {
  //     this.setState(Object.assign({}, this.state, {
  //         dialogData: Object.assign({}, this.state.dialogData, {popupVisible: false})
  //     }))
  // };
  // showDialog = (data) => {
  //     const {
  //         width = 300,
  //         height = 200,
  //         showTitle = true,
  //         title = "Başlıq",
  //         contentRender,
  //         dragEnabled = true,
  //         closeOnOutsideClick = false,
  //         fullScreen = false
  //     } = data;
  //     if (typeof contentRender !== "function")
  //         return;
  //     this._popupContentRender = contentRender;
  //     const dialogData = {width, height, showTitle, title, dragEnabled, closeOnOutsideClick, fullScreen};
  //     dialogData.popupVisible = true;
  //     this.setState(Object.assign({}, this.state, {dialogData: dialogData}));
  // };
}
