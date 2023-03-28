import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import React from "react";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater";

import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import OnlineStatus from "./contexts/OnlineStatus";
import { CustomTheme, GlobalModalVisibility } from "./contexts";
import { persistor, store } from "./app/store";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalModalVisibility>
      <OnlineStatus>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SnackbarProvider maxSnack={2}>
              <CustomTheme>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
                </LocalizationProvider>
              </CustomTheme>
            </SnackbarProvider>
          </PersistGate>
        </Provider>
      </OnlineStatus>
    </GlobalModalVisibility>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onUpdate: onServiceWorkerUpdate,
});
