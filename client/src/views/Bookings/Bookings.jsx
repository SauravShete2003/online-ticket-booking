import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [userId] = useState(""); // Replace with actual user ID

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/trains`);
        console.log("API Response:", response.data); // Log response
        setSearchResults(response.data.trains || []); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    fetchTrains();
  }, []);

  const handleBooking = async (trainId) => {
    const seatsBooked = prompt("Enter number of seats to book:");

    if (seatsBooked) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/bookings`, {
          trainId,
          userId,
          seatsBooked: parseInt(seatsBooked),
        });

        if (response.data.success) {
          alert("Booking successful!");
          setSearchResults((prevResults) =>
            prevResults.map((train) =>
              train._id === trainId ? { ...train, seats: train.seats - seatsBooked } : train
            )
          );
        } else {
          alert(response.data.message || "Booking failed.");
        }
      } catch (error) {
        console.error("Booking error:", error);
        alert("Error booking train. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h3>Available Trains:</h3>
      <ul>
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          searchResults.map((train) => (
            <li key={train._id}>
              <p>Train Name: {train.trainName}</p>
              <p>Departure: {train.departureTime}</p>
              <p>Arrival: {train.arrivalTime}</p>
              <p>Fare: {train.fare}</p>
              <p>Seats Available: {train.seats}</p>
              <button onClick={() => handleBooking(train._id)}>Book Train</button>
            </li>
          ))
        ) : (
          <p>No trains available</p>
        )}
      </ul>
    </div>
  );
};

export default TrainSearch;
