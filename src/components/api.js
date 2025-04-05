const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

export const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }

    // Filter out times that are already booked
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const dateStr = date.toISOString().split('T')[0];
    const bookedTimes = bookings
        .filter(booking => booking.date === dateStr)
        .map(booking => booking.time);

    return result.filter(time => !bookedTimes.includes(time));
};

export const submitAPI = function(formData) {
    try {
        // Get existing bookings
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        
        // Check if the time slot is already booked
        const isTimeSlotTaken = bookings.some(
            booking => booking.date === formData.date && booking.time === formData.time
        );

        if (isTimeSlotTaken) {
            return false;
        }

        // Add new booking
        bookings.push(formData);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        return true;
    } catch (error) {
        console.error('Error saving booking:', error);
        return false;
    }
};