import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

import "./App.css";
import TripList from "./features/tripList";

function App() {
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
      console.error("Unable to load Google Maps API", error);
    }
  });
  return (
    <div className="App">
      <header className="header">
        <a href="/trips">
          <span>Let's Plan</span>
        </a>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="trips" element={<TripList />} />
            {/* <Route path="trip/:tripId" element={<TripList />} /> */}
            {/* <Route path="trip/:tripId/edit" element={<TripList />} /> */}
            <Route path="*" element={<TripList />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
