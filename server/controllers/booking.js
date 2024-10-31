import Booking from "./../models/Booking.js";
// import { getBooking, getBookings, createBooking, updateBooking, deleteBooking }
const createBooking = async (req, res) => {
  const { userId, trainId, seatNumber } = req.body;
  if (!trainId || !userId) {
    return res.status(400).json({
      message: "trainId and userId are required and must be valid",
      success: false,
    });
  }
  const newBooking = new Booking({
    userId,
    train: trainId,
    seatNumber,
  });
  try {
    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: "Booking created successfully",
      data: savedBooking,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating booking",
      error: err.message,
      success: false,
    });
  }
};

const getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId)
      .populate("train") // Populate train details
      .populate("userId"); // Populate user details

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }

    res.json({
      data: booking,
      success: true,
      message: "Booking fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching booking",
      error: err.message,
      success: false,
    });
  }
};

const getBookings = async (req, res) => {
  const booking = await Booking.find();
  res.json({
    data: booking,
    success: true,
    message: "Bookings fetched successfully",
  });
};

const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { trainId, userId, seatNumber } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      {
        $set: {
          trainId: trainId,
          userId: userId,
          seatNumber: seatNumber,
        },
      },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating booking",
      error: err.message,
      success: false,
    });
  }
  res.json({
    data: booking,
    success: true,
    message: "Booking updated successfully",
  });
};

export { createBooking, getBooking, updateBooking , getBookings};
