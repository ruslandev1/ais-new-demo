import './App.css'
import LoginPage from "./pages/LoginPage.jsx"
import ProtectedRoute from './components/ProtectedRoute.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { connect } from "react-redux"
import { useEffect } from 'react';
import { LOGIN_KEY_TOKEN } from "./utils/Constants";
import azMessages from "./utils/az.json";
import { isEmpty } from './utils';
import { setCurrentUser } from "./actions/loginAction";
import { loadMessages } from "devextreme/localization";


const router = createBrowserRouter([

  {
    path: "/",
    element: <ProtectedRoute />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  ,
]);



function App({loadAuthToken}) {
  useEffect(() => {
    loadAuthToken();
    loadMessages(azMessages)
  }, [])
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadAuthToken: () => {
      let token = localStorage.getItem(LOGIN_KEY_TOKEN);
      console.log("TOKEN TOKEN", token)
      if (!isEmpty(token)) {
        dispatch(setCurrentUser(token));
      }
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

