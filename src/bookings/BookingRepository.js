class BookingRepository {
  constructor() {
    this.bookings = [];
  }

  add(booking) {
    this.bookings.push(booking);
  }

  getAll() {
    return this.bookings;
  }
}

module.exports = BookingRepository;