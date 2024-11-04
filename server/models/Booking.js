import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  trainId: { type: Schema.Types.ObjectId, ref: "Train", required: true },
  userId: { type: String, required: true },  // Assuming each user has a unique ID
  seatsBooked: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = model("Booking", bookingSchema);
export default Booking;
