import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Stack } from "@mui/material";
import { Loader } from "@googlemaps/js-api-loader";

import "./App.css";
import { auth } from "./firebase";
import SponsoredLinks from "./features/sponsoredLinks";
import { setLoggedIn } from "./features/login/authSlice";
import { useOnlineStatus } from "./contexts/OnlineStatus";
import { useGlobalModalVisibility } from "./contexts/GlobalModalVisibility";
import UpdateAlert from "./components/UpdateAlert";
import StyledLink from "./components/StyledLink";
import OfflineAlert from "./components/OfflineAlert";
import Navbar from "./components/Navbar";
import EditTripDetailsModal from "./components/EditTripDetailsModal";
import DeleteTripDialog from "./components/DeleteTripDialog";
import AuthenticationModal from "./components/AuthenticationModal";
import { useAppDispatch } from "./app/hooks";

// lazy imports for code splitting
// @see https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const TripList = lazy(() => import("./features/tripList"));
const TripDetailsContainer = lazy(
  () => import("./features/tripDetailsContainer")
);
const TripDetails = lazy(() => import("./features/tripDetails"));
const Legal = lazy(() => import("./features/legal"));
// the name of the chunk breaks ad blockers + it's small :)
// const SponsoredLinks = lazy(() => import("./features/sponsoredLinks"));

const App = () => {
  const {
    visible: authModalVisible,
    toggleVisible: toggleAuthModalVisible,
    authType,
    setAuthType,
    trip: currentTrip,
    setTrip,
    deleteTrip,
    setDeleteTrip,
  } = useGlobalModalVisibility();
  const { online: isOnline } = useOnlineStatus();
  const dispatch = useAppDispatch();

  // set logged in state
  onAuthStateChanged(auth, (user) => {
    dispatch(setLoggedIn(!!user));
  });

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
          <Suspense
            fallback={
              <div>
                Loading... If you see this for more than 30 seconds, try
                refreshing the page.
              </div>
            }>
            <Routes>
              <Route path="/" element={<TripList />} />
              <Route path="trips" element={<TripList />} />
              <Route path="trip" element={<TripDetailsContainer />}>
                <Route path=":tripId" element={<TripDetails />} />
              </Route>
              <Route path="legal" element={<Legal />} />
              <Route path="sponsored-links" element={<SponsoredLinks />} />
              <Route path="*" element={<TripList />} />
            </Routes>
          </Suspense>
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
        {deleteTrip && (
          <DeleteTripDialog
            visible={!!deleteTrip?.id}
            onClose={() => setDeleteTrip(null)}
            id={deleteTrip.id}
            title={deleteTrip.title}
          />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
