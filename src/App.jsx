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
import ShortLinkPage from './pages/ShortLinkPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { MantineProvider} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([

  {
    path: "/",
    element: <ProtectedRoute component={<HomePage />}/>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path : "/shortcut-links",
    element : <ProtectedRoute component={<ShortLinkPage />}/>
  },
  {
    path : "/profile",
    element : <ProtectedRoute component={<ProfilePage />}/>
  },
  {
    path : "/settings",
    element : <ProtectedRoute component={<SettingsPage />}/>
  },
]);



function App({loadAuthToken}) {
  useEffect(() => {
    loadAuthToken();
    loadMessages(azMessages)
  }, [])
  

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS> 
      <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
      </MantineProvider>
      </QueryClientProvider>
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

