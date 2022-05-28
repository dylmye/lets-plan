import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDayjs';

import "./index.css";
import App from "./App";
import { persistor, store } from "./app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import CustomTheme from "./contexts/CustomTheme/CustomTheme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CustomTheme>
          <CssBaseline />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <App />
          </LocalizationProvider>
        </CustomTheme>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
