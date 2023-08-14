import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import configureStore from "./store/configureStore.dev";
import { fetchAppUserAccessInfoIfNeeded } from "./actions/AppStateActions";
import './index.css'


const store = configureStore();

store.dispatch(fetchAppUserAccessInfoIfNeeded());




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

export default store;
