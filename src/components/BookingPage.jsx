import React, { useState, useEffect } from 'react';
import { fetchAPI, submitAPI } from './api';
import BookingForm from './BookingForm';

const BookingPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch available times when component mounts
    fetchAvailableTimes(date);
  }, []);
  
  const fetchAvailableTimes = (selectedDate) => {
    setLoading(true);
    try {
      // Convert the date string to a Date object
      const dateObj = new Date(selectedDate);
      const times = fetchAPI(dateObj);
      setAvailableTimes(Array.isArray(times) ? times : []);
    } catch (error) {
      console.error("Error fetching times:", error);
      setAvailableTimes([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDateChange = (newDate) => {
    console.log("Date changed to:", newDate);
    setDate(newDate);
    fetchAvailableTimes(newDate);
  };
  
  const submitForm = (formData) => {
    try {
      const success = submitAPI(formData);
      if (success) {
        setBookingConfirmed(true);
      }
      return success;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
  };
  
  if (bookingConfirmed) {
    return (
      <section className="booking">
        <div className="container">
          <h1>Reservation Confirmed!</h1>
          <p>Thank you for your reservation. We look forward to serving you.</p>
          <button 
            onClick={() => setBookingConfirmed(false)} 
            className="button"
          >
            Make Another Reservation
          </button>
        </div>
      </section>
    );
  }
  
  return (
    <section className="booking">
      <div className="container">
        <h1>Reserve a Table</h1>
        {loading ? (
          <p>Loading available times...</p>
        ) : (
          <BookingForm 
            availableTimes={availableTimes}
            date={date}
            onDateChange={handleDateChange}
            onSubmit={submitForm}
          />
        )}
      </div>
    </section>
  );
};

export default BookingPage;
