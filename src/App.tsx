import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import TripList from "./features/tripList";

function App() {
  return (
    <div className="App">
      <header className="header">
        <a href="/trips"><span>Let's Plan</span></a>
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
