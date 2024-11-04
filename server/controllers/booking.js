import Booking from "./../models/Booking.js";
import Train from "./../models/Train.js";

const bookingRoutes = async (req, res) => {
  const { trainId, userId, seatsBooked } = req.body;

  if (!trainId || !userId || !seatsBooked) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    if (train.seats < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    train.seats -= seatsBooked;
    await train.save();

    const booking = new Booking({ trainId, userId, seatsBooked });
    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking successful",
      data: savedBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

export default bookingRoutes;

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

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }
    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting booking",
      error: err.message,
      success: false,
    });
  }
};

export { bookingRoutes, getBooking, updateBooking, getBookings, deleteBooking };
