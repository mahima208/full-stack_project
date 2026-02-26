class BookingStorage {
  constructor() {
    this.bookings = [];
    this.bookingId = 1;
  }

  createBooking(bookingData) {
    const booking = {
      id: this.bookingId++,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.bookings.push(booking);
    return booking;
  }

  getBookingsByUser(userEmail) {
    return this.bookings.filter(b => b.userEmail === userEmail);
  }

  getBookingsByHost(hostEmail) {
    return this.bookings.filter(b => b.hostEmail === hostEmail);
  }

  getAllBookings() {
    return this.bookings;
  }

  updateBookingStatus(bookingId, status) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      return true;
    }
    return false;
  }
}

const bookingStorage = new BookingStorage();
export default bookingStorage;
