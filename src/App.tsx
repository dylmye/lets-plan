import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

import "./App.css";
import TripList from "./features/tripList";
import Legal from "./features/legal";
import TripDetailsContainer from "./features/tripDetailsContainer";
import TripDetails from "./features/tripDetails";
import { Alert } from "@mui/material";

function App() {
  const [isOnline, setOnlineStatus] = useState(navigator.onLine);

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
        <header className="header">
          <Link to="/trips">
            <span>Let's Plan</span>
          </Link>
        </header>
        <main>
          {!isOnline && (
            <Alert severity="info">
              You're offline - your trips are still accessible and you can still
              make changes, but images and links might not load.
            </Alert>
          )}
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="trips" element={<TripList />} />
            <Route path="trip" element={<TripDetailsContainer />}>
              <Route path=":tripId" element={<TripDetails />} />
              <Route path=":tripId/edit" element={<TripDetails />} />
            </Route>
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<TripList />} />
          </Routes>
        </main>
        <footer>
          <Link to="/legal">Terms & Privacy</Link>
          <p>Logo - Travel by Iconstock from NounProject.com</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
