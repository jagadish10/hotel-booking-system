const {
    bookRoom,
    getBookingDetails,
    getAllGuests,
    cancelBooking,
    modifyBooking,
} = require('../src/services/bookingService');

describe('Hotel Room Booking System', () => {

    beforeEach(() => {
        jest.resetModules();
        require('../src/models/bookingModel').bookings = [];
        require('../src/models/bookingModel').rooms = [
            { roomNumber: 101, isAvailable: true },
            { roomNumber: 102, isAvailable: true },
            { roomNumber: 103, isAvailable: true },
        ];
    });

    test('should book a room successfully', () => {
        const booking = bookRoom('User', 'user@example.com',7564658948, '2025-02-01', '2025-02-05');
        expect(booking).toEqual({
            name: 'User',
            email: 'user@example.com',
            phone : 7564658948,
            roomNumber: 101,
            checkInDate: '2025-02-01',
            checkOutDate: '2025-02-05',
            duration: '4 Day'
        });
    });

    test('should throw an error when no rooms are available', () => {
        bookRoom('Guest 1', 'guest1@example.com', 36336664664, '2025-02-01', '2025-02-05');
        bookRoom('Guest 2', 'guest2@example.com', 36336664664, '2025-02-01', '2025-02-05');

        expect(() => {
            bookRoom('Guest 3', 'guest3@example.com', 48836730333, '2025-02-01', '2025-02-05');
        }).toThrow('No rooms available');
    });

    test('should retrieve booking details by email', () => {
        const booking = getBookingDetails('user@example.com');
        expect(booking[0]).toEqual({
            name: 'User',
            email: 'user@example.com',
            phone: 7564658948,
            roomNumber: 101,
            checkInDate: '2025-02-01',
            checkOutDate: '2025-02-05',
            duration: '4 Day'
        });
    });

    test('should throw an error when booking is not found by email', () => {
        expect(() => {
            getBookingDetails('nonexistent@example.com');
        }).toThrow('Booking not found');
    });

    test('should return a list of all guests', () => {
        const guests = getAllGuests();
        expect(guests).toEqual([
            { name: 'User', roomNumber: 101 },
            { name: 'Guest 1', roomNumber: 102 },
            { name: 'Guest 2', roomNumber: 103 },
        ]);
    });

    test('should cancel a booking successfully', () => {
        cancelBooking('user@example.com', 101);
        expect(() => {
            getBookingDetails('user@example.com');
        }).toThrow('Booking not found');
    });

    test('should throw an error when canceling a non-existent booking', () => {
        expect(() => {
            cancelBooking('nonexistent@example.com', 101);
        }).toThrow('Booking not found');
    });

    test('should modify a booking successfully', () => {
        bookRoom('User', 'user@example.com',57577757575, '2025-02-01', '2025-02-05');
        const updatedBooking = modifyBooking('user@example.com', 101,'2025-02-02', '2025-02-06');

        expect(updatedBooking).toEqual({
            name: 'User',
            email: 'user@example.com',
            phone: 57577757575,
            roomNumber: 101,
            checkInDate: '2025-02-02',
            checkOutDate: '2025-02-06',
            duration:'4 Day'
        });
    });

    test('should throw an error when modifying a non-existent booking', () => {
        expect(() => {
            modifyBooking('nonexistent@example.com', 101, '2025-02-02', '2025-02-06');
        }).toThrow('Booking not found');
    });
});