const express = require("express");
const router = express.Router();
const { validateBookingInput,validateCancelInput } = require("../middleware/validationMiddleware");
const {
  bookRoomHandler,
  getBookingDetailsHandler,
  getAllGuestsHandler,
  cancelBookingHandler,
  modifyBookingHandler,
} = require("../controllers/bookingController");

router.post("/book-room", validateBookingInput, bookRoomHandler);
router.get("/booking-details", getBookingDetailsHandler);
router.get("/all-guests", getAllGuestsHandler);
router.delete("/cancel-booking", validateCancelInput, cancelBookingHandler);
router.put("/modify-booking", modifyBookingHandler);

module.exports = router;
