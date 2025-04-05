import { fetchAPI, submitAPI } from '../api';

describe('Booking API', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('fetchAPI', () => {
    test('returns array of available times', () => {
      const testDate = new Date('2024-04-20');
      const times = fetchAPI(testDate);
      
      expect(Array.isArray(times)).toBe(true);
      times.forEach(time => {
        expect(time).toMatch(/^(17|18|19|20|21|22|23):(00|30)$/);
      });
    });

    test('returns different times for different dates', () => {
      const date1 = new Date('2024-04-20');
      const date2 = new Date('2024-04-21');
      
      const times1 = fetchAPI(date1);
      const times2 = fetchAPI(date2);
      
      // Due to the seeded random nature, different dates should yield different times
      expect(times1).not.toEqual(times2);
    });

    test('returns times between 17:00 and 23:30', () => {
      const testDate = new Date('2024-04-20');
      const times = fetchAPI(testDate);
      
      times.forEach(time => {
        const hour = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);
        
        expect(hour).toBeGreaterThanOrEqual(17);
        expect(hour).toBeLessThanOrEqual(23);
        expect(minutes).toBeOneOf([0, 30]);
      });
    });
  });

  describe('submitAPI', () => {
    const testBooking = {
      date: '2024-04-20',
      time: '18:00',
      guests: '4',
      occasion: 'birthday'
    };

    test('successfully saves booking to localStorage', () => {
      const result = submitAPI(testBooking);
      
      // Check return value
      expect(result).toBe(true);
      
      // Verify localStorage was updated
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      expect(savedBookings).toContainEqual(testBooking);
    });

    test('handles multiple bookings', () => {
      const booking1 = { ...testBooking };
      const booking2 = { ...testBooking, time: '19:00' };
      
      submitAPI(booking1);
      submitAPI(booking2);
      
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      expect(savedBookings).toHaveLength(2);
      expect(savedBookings).toContainEqual(booking1);
      expect(savedBookings).toContainEqual(booking2);
    });

    test('prevents double booking of same time slot', () => {
      // Book the first slot
      submitAPI(testBooking);
      
      // Try to book the same slot again
      const result = submitAPI(testBooking);
      
      expect(result).toBe(false);
      
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      expect(savedBookings).toHaveLength(1);
    });
  });
});

// Custom matcher for minutes
expect.extend({
  toBeOneOf(received, array) {
    const pass = array.includes(received);
    return {
      message: () => `expected ${received} to be one of ${array}`,
      pass
    };
  }
}); 