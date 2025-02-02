let rooms = [
  { roomNumber: 101, isAvailable: true },
  { roomNumber: 102, isAvailable: true },
  { roomNumber: 103, isAvailable: true },
];

let bookings = [];

const findRoomByNumber = (roomNumber) =>
  rooms.find((room) => room.roomNumber === roomNumber);

const findBookingByEmail = (email) =>
  bookings.filter((booking) => booking.email === email);

const assignRoom = () => {
  const availableRoom = rooms.find((room) => room.isAvailable);
  if (availableRoom) {
    availableRoom.isAvailable = false;
    return availableRoom.roomNumber;
  }
  return null;
};

module.exports = {
  rooms,
  bookings,
  findRoomByNumber,
  findBookingByEmail,
  assignRoom,
};
