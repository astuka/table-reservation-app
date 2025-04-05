import React, { useState, useEffect } from 'react';
import { fetchAPI, submitAPI } from './api.js';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    time: '',
    guests: '2',
    occasion: 'birthday'
  });

  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Fetch available times for today when component mounts
    fetchAvailableTimes(formData.date);
  }, []);

  const fetchAvailableTimes = (date) => {
    // Convert the date string to a Date object
    const dateObj = new Date(date);
    const times = fetchAPI(dateObj);
    setAvailableTimes(times);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Submit the form data
    const success = submitAPI(formData);
    
    if (success) {
      console.log('Booking submitted successfully!');
      // You could redirect to a confirmation page or show a success message
      alert('Booking confirmed!');
    } else {
      console.log('Error submitting booking');
      alert('Error submitting booking. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If date changes, fetch new available times
    if (name === 'date') {
      fetchAvailableTimes(value);
    }
  };

  return (
    <section className="booking">
      <div className="container">
        <h1>Reserve a Table</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="button">
            Make Your Reservation
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingPage; 