import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Routes
} from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from "./store/configureStore.dev";
import LoginPage from "./pages/LoginPage.jsx"
import HomePage from './pages/HomePage.jsx';
import { fetchAppUserAccessInfoIfNeeded } from "./actions/AppStateActions";
import './index.css'
import ProtectedRoute from './components/ProtectedRoute.jsx';


const store = configureStore();

store.dispatch(fetchAppUserAccessInfoIfNeeded());


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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>,
)

export default store;
