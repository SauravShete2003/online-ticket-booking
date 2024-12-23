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
  const train = await Train.findOne({ _id: trainId });
  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }
  res.json({
    message: "Train found succesfully",
    success: true,
    data: train,
  });
};

const putTrain = async (req, res) => {
  const { trainId } = req.params;
  const { trainNumber, trainName, source, destination } = req.body;

  try {
    const train = await Train.findByIdAndUpdate(
      trainId,
      {
        $set: {
          trainNumber,
          trainName,
          source,
          destination,
        },
      },
      { new: true }
    );

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.json({
      message: "Train updated successfully",
      success: true,
      data: train,
    });
  } catch (error) {
    console.error("Error updating train:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTrain = async (req , res)=>{
  const {trainId} = req.params;
  const train = await Train.findByIdAndDelete(trainId);
  if(!train){
    return res.status(404).json({message: "Train not found"});
  }
  res.json({
    message: "Train deleted successfully",
    success: true,
  });
}
export { trainRoutes, getTrains, getTrain , putTrain , deleteTrain};
