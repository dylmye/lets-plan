import React, { useEffect } from "react";
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
import { useGlobalModalVisibility } from "./contexts/GlobalModalVisibility";
import StyledLink from "./components/StyledLink";
import UpdateAlert from "./components/UpdateAlert";
import OfflineAlert from "./components/OfflineAlert";
import { Container, Stack } from "@mui/material";
import { useOnlineStatus } from "./contexts/OnlineStatus";
import SponsoredLinks from "./features/sponsoredLinks";
import EditTripDetailsModal from "./components/EditTripDetailsModal";

function App() {
  const {
    visible: authModalVisible,
    toggleVisible: toggleAuthModalVisible,
    authType,
    setAuthType,
    trip: currentTrip,
    setTrip,
  } = useGlobalModalVisibility();
  const { online: isOnline } = useOnlineStatus();

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
            <Route path="sponsored-links" element={<SponsoredLinks />} />
            <Route path="*" element={<TripList />} />
          </Routes>
        </main>
        <footer>
          <StyledLink to="/legal">Terms & Privacy</StyledLink>
          <br />
          <StyledLink to="/sponsored-links">Sponsored Link Policy</StyledLink>
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
        {currentTrip && (
          <EditTripDetailsModal
            open={!!currentTrip}
            onClose={() => setTrip(null)}
            id={currentTrip.id}
            tripDetails={currentTrip}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
