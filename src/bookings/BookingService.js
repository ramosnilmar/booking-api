class BookingService {
  constructor(repository) {
    this.repository = repository;
  }

  addBooking({ roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking(roomId, guestName, checkInDate, checkOutDate);

    const overlappingBookings = this.repository.getAll().find(booking => {
      return booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate;
    });

    if (overlappingBookings) {
      throw new Error('Booking dates overlap with existing booking');
    }

    this.repository.add(newBooking);

    return newBooking;
  }

  getAllBookings() {
    return this.repository.getAll();
  }
}

module.exports = BookingService;