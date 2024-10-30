import { Schema, model } from "mongoose";

const trainSchema = new Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const Train = model("Train", trainSchema);
export default Train;
