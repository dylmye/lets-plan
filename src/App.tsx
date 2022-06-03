import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

import "./App.css";
import TripList from "./features/tripList";
import Legal from "./features/legal";
import TripDetailsContainer from "./features/tripDetailsContainer";
import TripDetails from "./features/tripDetails";
import LoginPage from "./features/login";
import Navbar from "./components/Navbar";
import AuthenticationModal from "./components/AuthenticationModal";
import { useAuthModalVisible } from "./contexts/AuthModalVisible";
import StyledLink from "./components/StyledLink";
import UpdateAlert from "./components/UpdateAlert";
import OfflineAlert from "./components/OfflineAlert";
import { Container, Stack } from "@mui/material";

function App() {
  const [isOnline, setOnlineStatus] = useState(navigator.onLine);
  const {
    visible: authModalVisible,
    toggleVisible: toggleAuthModalVisible,
    authType,
    setAuthType,
  } = useAuthModalVisible();

  useEffect(() => {
    const init = async () => {
      if (!process.env.REACT_APP_GMAP_JS_API_KEY) {
        throw new Error("No Google Maps API key provided");
      }

      if (!window.google || !window.google.maps || !window.google.maps.places) {
        await new Loader({
          apiKey: process.env.REACT_APP_GMAP_JS_API_KEY,
          ...{ libraries: ["places"] },
        }).load();
      }
    };

    try {
      init();
    } catch (error) {
      console.error("Unable to load Google Maps API:", error);
    }
  });

  useEffect(() => {
    window.addEventListener("offline", () => setOnlineStatus(false));
    window.addEventListener("online", () => setOnlineStatus(true));

    return () => {
      window.removeEventListener("offline", () => setOnlineStatus(false));
      window.removeEventListener("online", () => setOnlineStatus(true));
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Container>
            <Stack spacing={2}>
              <OfflineAlert isOnline={isOnline} />
              <UpdateAlert isOnline={isOnline} />
            </Stack>
          </Container>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="trips" element={<TripList />} />
            <Route path="trip" element={<TripDetailsContainer />}>
              <Route path=":tripId" element={<TripDetails />} />
              <Route path=":tripId/edit" element={<TripDetails edit />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<TripList />} />
          </Routes>
        </main>
        <footer>
          <StyledLink to="/legal">Terms & Privacy</StyledLink>
          <br />
          <StyledLink to="/legal">Sponsored Link Policy</StyledLink>
          <p>Logo - Travel by Iconstock from NounProject.com</p>
        </footer>
        <AuthenticationModal
          open={authModalVisible}
          onClose={() => {
            toggleAuthModalVisible(false);
            setAuthType(null);
          }}
          type={authType}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
