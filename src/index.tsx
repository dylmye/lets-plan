import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";

import "./index.css";
import App from "./App";
import { persistor, store } from "./app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { CustomTheme, AuthModalVisible } from "./contexts";
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater";

ReactDOM.render(
  <React.StrictMode>
    <AuthModalVisible>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SnackbarProvider maxSnack={2}>
            <CustomTheme>
              <CssBaseline />
              <LocalizationProvider dateAdapter={DateAdapter}>
                <App />
              </LocalizationProvider>
            </CustomTheme>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </AuthModalVisible>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register({
  onUpdate: onServiceWorkerUpdate
});
