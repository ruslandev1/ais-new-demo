import React, { Fragment } from "react";
import { withStyles } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from "prop-types";
import { CLOSE_DRAWER } from "../../../actions/drawerActionTypes";
import { connect } from "react-redux";
import persistentDrawerStyle from "../../../assets/jss/PersistentDrawerStyle";
import { isEmpty } from "../../../utils";
import {
  avrFetch,
  readResponseAsJSON,
  validateResponse,
} from "../../../utils/AvroraFetch";
import { BACKEND_URL } from "../../../utils/Constants";
import AccInfo from "./MenuHelper";
import DrawerMenuItems from "./DrawerMenuItems";
import {
  fetchMenuListInfoIfNeeded,
  setMenuList,
  setMenuGroupShow,
} from "../../../reducers/MenuReducer";
import LinearProgress from "@mui/material/LinearProgress";

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: new AccInfo(),
      menuComponent: {},
      // menuGroupShow: {},
    };
  }

  componentDidMount() {
    console.log("Fetching menu list...");
    this.fetchMenuList();
  }

  handleDrawerClose = () => {
    this.props.fromStoreCloseDrawer();
  };

  handleMenuItemAction = (data) => {
    if (data.action === "menuItemGroupClick") {
      this.props.setMenuGroupShow(data.payload);
      // const val =
      //     (
      //         this.state.menuGroupShow[data.payload.accInfoId] === null ||
      //         this.state.menuGroupShow[data.payload.accInfoId] === undefined
      //     ) ? true : !this.state.menuGroupShow[data.payload.accInfoId];
      // this.setState(Object.assign({}, this.state, {
      //     menuGroupShow: Object.assign({}, this.state.menuGroupShow, {
      //         [data.payload.accInfoId]: val
      //     })
      // }));
    }
  };

  render() {
    const { accessState, loginState, menuList } = this.props;
    console.log(accessState);
    console.log(loginState);
    console.log(menuList);
    if (
      !accessState ||
      !accessState.loaded ||
      accessState.isFetching ||
      accessState.didInvalidate ||
      !menuList ||
      menuList.didInvalidate ||
      !menuList.loaded
    ) {
      if (loginState.isAuthenticated && !loginState.logInProgress) {
        console.log("qalsinburda");
        this.props.fetchMenuListInfoIfNeeded();
      }
      return (
        <Fragment>
          <LinearProgress />
          Menu yüklənir...
        </Fragment>
      );
    }
    console.log("Budakecdi");
    if (isEmpty(this.props.menuList)) return <Fragment />;
    console.log(
      "props.menuList: ",
      this.props.menuList,
      this.props.menuList.childsPools
    );
    const { classes, theme, drawerOpen } = this.props;
    return (
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose} size="large">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <DrawerMenuItems
          items={this.props.menuList.childsPools}
          onMenuItemAction={this.handleMenuItemAction}
          menuGroupState={this.props.menuGroupShow}
        />
        {/*<DrawerMenu/>*/}
      </Drawer>
    );
  }

  fetchMenuList() {
    console.log("Fetching menus...");
    if (!isEmpty(this.props.menuList)) return;
    avrFetch(BACKEND_URL + "/api/AccPool/GetMenuList")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then((response) => {
        if (!isEmpty(response) && response.success === true) {
          this.props.setMenuList(response.data);
          //this.props.dispatch(setMenuList(response.data));
          // this.setState(Object.assign({}, this.state, {menuList: response.data}));
        }
      })
      .catch((reason) => {});
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.drawerState.drawerOpen,
    menuList: state.menuList,
    accessState: state.accessState,
    loginState: state.loginState,
    menuGroupShow: state.menuList.menuGroupShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenuListInfoIfNeeded: () => {
      dispatch(fetchMenuListInfoIfNeeded());
    },
    fromStoreCloseDrawer: () => {
      dispatch({ type: CLOSE_DRAWER });
    },
    setMenuList: (list) => dispatch(setMenuList(list)),
    setMenuGroupShow: (data) => dispatch(setMenuGroupShow(data)),
  };
};

CustomDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool,
  fromStoreCloseDrawer: PropTypes.func,
};
export default withStyles(persistentDrawerStyle, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)
);
