import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingPage from '../BookingPage';
import * as api from '../api';

// Mock the API functions
jest.mock('../api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn()
}));

describe('BookingPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock fetchAPI to return some test times
    api.fetchAPI.mockReturnValue(['17:00', '18:00', '19:00']);
  });

  test('renders booking form with all fields', () => {
    render(<BookingPage />);
    
    // Check for static text and form elements
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });

  test('displays available times from API', async () => {
    render(<BookingPage />);
    
    const timeSelect = screen.getByLabelText(/time/i);
    const options = Array.from(timeSelect.options).map(option => option.value);
    
    // First option is empty ("Select a time")
    expect(options).toHaveLength(4);
    expect(options.slice(1)).toEqual(['17:00', '18:00', '19:00']);
  });

  test('updates available times when date changes', () => {
    render(<BookingPage />);
    
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2024-04-20' } });
    
    expect(api.fetchAPI).toHaveBeenCalledTimes(2); // Once on mount, once on change
    expect(api.fetchAPI).toHaveBeenLastCalledWith(expect.any(Date));
  });

  test('submits form with user input', async () => {
    api.submitAPI.mockReturnValue(true);
    render(<BookingPage />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/date/i), { 
      target: { value: '2024-04-20' } 
    });
    fireEvent.change(screen.getByLabelText(/time/i), { 
      target: { value: '17:00' } 
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { 
      target: { value: '4' } 
    });
    fireEvent.change(screen.getByLabelText(/occasion/i), { 
      target: { value: 'anniversary' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /make your reservation/i }));

    // Check if submitAPI was called with correct data
    expect(api.submitAPI).toHaveBeenCalledWith({
      date: '2024-04-20',
      time: '17:00',
      guests: '4',
      occasion: 'anniversary'
    });
  });

  test('shows success message on successful submission', async () => {
    api.submitAPI.mockReturnValue(true);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<BookingPage />);
    
    // Fill out and submit form
    fireEvent.change(screen.getByLabelText(/time/i), { 
      target: { value: '17:00' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /make your reservation/i }));

    expect(alertMock).toHaveBeenCalledWith('Booking confirmed!');
    alertMock.mockRestore();
  });
}); 