import React, { useState } from 'react';

const BookingForm = ({ availableTimes = [], date, onDateChange = () => {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: date,
    time: '',
    guests: '2',
    occasion: 'birthday'
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) {
      errors.date = "Please select a date";
    }
    
    if (!formData.time) {
      errors.time = "Please select a time";
    }
    
    const guestsNum = parseInt(formData.guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
      errors.guests = "Please enter a number between 1 and 10";
    }
    
    if (!formData.occasion) {
      errors.occasion = "Please select an occasion";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "date") {
      if (typeof onDateChange === 'function') {
        onDateChange(value);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = onSubmit(formData);
      if (!success) {
        setFormErrors({
          form: "There was an error submitting your reservation. Please try a different time."
        });
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {formErrors.form && (
        <div className="form-error">{formErrors.form}</div>
      )}
      
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        {formErrors.date && <span className="error">{formErrors.date}</span>}
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
        {formErrors.time && <span className="error">{formErrors.time}</span>}
        {availableTimes.length === 0 && (
          <span className="note">No times available for selected date</span>
        )}
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
        {formErrors.guests && <span className="error">{formErrors.guests}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
        >
          <option value="">Select an occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
        {formErrors.occasion && <span className="error">{formErrors.occasion}</span>}
      </div>

      <button type="submit" className="button">
        Make Your Reservation
      </button>
    </form>
  );
};

export default BookingForm; 