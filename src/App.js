import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EventListings from './components/EventListings';
import EventDetails from './components/EventDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="App">
        <Header setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<EventListings searchTerm={searchTerm} />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
