const {
  rooms,
  bookings,
  findRoomByNumber,
  findBookingByEmail,
  assignRoom,
} = require("../models/bookingModel");

const bookRoom = (name, email,phone, checkInDate, checkOutDate) => {
  const roomNumber = assignRoom();
  if (!roomNumber) {
    throw new Error("No rooms available");
  }

  const booking = {
    name,
    email,
    phone,
    roomNumber,
    checkInDate,
    checkOutDate,
    duration: `${(new Date(checkOutDate) - new Date(checkInDate)) / 86400000} Day`
  };

  bookings.push(booking);
  return booking;
};

const getBookingDetails = (email) => {
  const booking = findBookingByEmail(email);
  if (!booking || booking.length == 0) {
    throw new Error("Booking not found");
  }
  return booking;
};

const getAllGuests = () => {
  return bookings.map((booking) => ({
    name: booking.name,
    roomNumber: booking.roomNumber,
  }));
};

const cancelBooking = (email, roomNumber) => {
  const bookingIndex = bookings.findIndex(
    (booking) => booking.email === email && booking.roomNumber === roomNumber
  );
  if (bookingIndex === -1) {
    throw new Error("Booking not found");
  }

  const room = findRoomByNumber(roomNumber);
  if (room) {
    room.isAvailable = true;
  }

  bookings.splice(bookingIndex, 1);
};

const modifyBooking = (email, roomNumber, checkInDate, checkOutDate) => {
  const bookings = findBookingByEmail(email);
  const booking = bookings.find((booking) => booking.roomNumber === roomNumber);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (checkInDate) booking.checkInDate = checkInDate;
  if (checkOutDate) booking.checkOutDate = checkOutDate;
  if (checkInDate || checkOutDate) booking.duration = `${(new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / 86400000} Day`

  return booking;
};

module.exports = {
  bookRoom,
  getBookingDetails,
  getAllGuests,
  cancelBooking,
  modifyBooking,
};
