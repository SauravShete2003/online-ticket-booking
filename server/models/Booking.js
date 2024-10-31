import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "pending"],
      default: "booked",
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);
export default Booking;
