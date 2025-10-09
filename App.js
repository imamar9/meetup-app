// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventListings from './EventListings';
import EventDetails from './EventDetails';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // For basic styling

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<EventListings />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;