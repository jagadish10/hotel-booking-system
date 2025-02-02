const {
  bookRoom,
  getBookingDetails,
  getAllGuests,
  cancelBooking,
  modifyBooking,
} = require("../services/bookingService");

const bookRoomHandler = (req, res) => {
  try {
    const { name, email, phone, checkInDate, checkOutDate } = req.body;
    const booking = bookRoom(name, email, phone, checkInDate, checkOutDate);
    res.status(201).json({ message: "Room booked successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookingDetailsHandler = (req, res) => {
  try {
    const { email } = req.query;
    const booking = getBookingDetails(email);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllGuestsHandler = (req,res) => {
  try {
    const guests = getAllGuests();
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelBookingHandler = (req, res) => {
  try {
    const { email, roomNumber } = req.body;
    cancelBooking(email, roomNumber);
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const modifyBookingHandler = (req, res) => {
  try {
    const { email, roomNumber, checkInDate, checkOutDate } = req.body;
    const booking = modifyBooking(email, roomNumber, checkInDate, checkOutDate);
    res.status(200).json({ message: "Booking modified successfully", booking });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  bookRoomHandler,
  getBookingDetailsHandler,
  getAllGuestsHandler,
  cancelBookingHandler,
  modifyBookingHandler,
};
