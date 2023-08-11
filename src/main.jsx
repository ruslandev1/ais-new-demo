import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import LoginPage from "./pages/LoginPage.jsx"
import HomePage from './pages/HomePage.jsx';
import {fetchAppUserAccessInfoIfNeeded} from "./actions/AppStateActions";
import './index.css'


const store = configureStore();

store.dispatch(fetchAppUserAccessInfoIfNeeded());


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <HomePage />,
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
