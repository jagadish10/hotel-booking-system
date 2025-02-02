const validateBookingInput = (req, res, next) => {
  const { name, email,phone, checkInDate, checkOutDate } = req.body;
  if (!name || !email || !phone ||  !checkInDate || !checkOutDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (new Date(checkInDate) >= new Date(checkOutDate)) {
    return res
      .status(400)
      .json({ error: "Check-out date must be after check-in date" });
  }

  next();
};

const validateCancelInput = (req, res, next) => {
    const { email, roomNumber } = req.body;
    if (!email || !roomNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    next();
  };

module.exports = { validateBookingInput,validateCancelInput };
