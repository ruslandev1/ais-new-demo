import {combineReducers} from "redux";
import {DrawerReducer} from "./DrawerReducer";
import LoginReducer from "./LoginReducer";
import KpiReducer from "./KpiReducer";
import appReducer from "./AppReducer";
import MenuReducer from "./MenuReducer";
import accessInfoReducer from "./AccessInfoReducer";

export default combineReducers({
    appState: appReducer,
    drawerState: DrawerReducer,
    loginState: LoginReducer,
    kpi: KpiReducer,
    accessState: accessInfoReducer,
    menuList: MenuReducer,
});
