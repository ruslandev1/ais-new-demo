import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import LoginPage from "./pages/LoginPage.jsx"
import store from "./store/store.js"
import './index.css'
import HomePage from './pages/HomePage.jsx';

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

// import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
)
