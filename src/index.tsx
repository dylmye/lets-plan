import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater";

import "./index.css";
import App from "./App";
import { persistor, store } from "./app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { CustomTheme, GlobalModalVisibility } from "./contexts";
import OnlineStatus from "./contexts/OnlineStatus";

ReactDOM.render(
  <React.StrictMode>
    <GlobalModalVisibility>
      <OnlineStatus>
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
      </OnlineStatus>
    </GlobalModalVisibility>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register({
  onUpdate: onServiceWorkerUpdate,
});
