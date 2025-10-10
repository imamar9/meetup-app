
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventListings from '.components/EventListings';
import EventDetails from '.components/EventDetails';
import Header from '.components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; 

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