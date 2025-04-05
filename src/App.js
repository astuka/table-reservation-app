import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import BookingPage from './components/BookingForm';
import Chicago from './components/Chicago';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Chicago />} />
          <Route path="/reservations" element={<BookingPage />} />
          <Route path="/menu" element={<div>Menu Page Coming Soon</div>} />
          <Route path="/order" element={<div>Order Online Coming Soon</div>} />
          <Route path="/login" element={<div>Login Coming Soon</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
