import Train from "../models/Train.js";

const trainRoutes = async (req, res) => {
  const {
    trainNumber,
    trainName,
    source,
    destination,
    departureTime,
    arrivalTime,
    fare,
    seats,
  } = req.body;

  if (
    !trainNumber ||
    !trainName ||
    !source ||
    !destination ||
    !departureTime ||
    !arrivalTime ||
    !fare ||
    !seats
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const train = new Train({
    trainNumber,
    trainName,
    source,
    destination,
    departureTime,
    arrivalTime,
    fare,
    seats,
  });
  try {
    const savedTrain = await train.save();
    res.status(201).json({
      message: "Train added successfully",
      data: savedTrain,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add train",
      error: error.message,
    });
  }
};

const getTrains = async (req, res) => {
  const trains = await Train.find();
  res.json({
    message: "Trains fatch succesfully",
    success: true,
    data: trains,
  });
};

const getTrain = async (req, res) => {
  const { trainId } = req.params;
  const train = await Train.findOne({ _id : trainId });
  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }
  res.json({
    message: "Train found succesfully",
    success: true,
    data: train,
  });
};
export { trainRoutes, getTrains, getTrain };
