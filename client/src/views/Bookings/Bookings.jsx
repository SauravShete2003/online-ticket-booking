import React, { useState } from "react";

const redirectToBooking = (source, destination, date) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  const bookingURL = `https://www.irctc.co.in/nget/train-search?source=${source}&destination=${destination}&journeyDate=${formattedDate}`;
  window.open(bookingURL, "_blank");
};

const TrainSearch = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const mockData = [];

    if (!source || !destination || !date) {
      alert("Please fill all fields");
    } else if (mockData.length === 0) {
      redirectToBooking(source, destination, date);
    } else {
      setSearchResults(mockData);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Train Search</h2>
      <div>
        <label className="auth-input-label">Source:</label>
        <input
          type="text"
          className="auth-input"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <div>
        <label className="auth-input-label">Destination:</label>
        <input
          type="text"
          className="auth-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div>
        <label className="auth-input-label">Date:</label>
        <input
          type="date"
          className="auth-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="auth-button">
        Search Trains
      </button>

      {searchResults.length > 0 && (
        <div>
          <h3>Available Trains:</h3>
          <ul>
            {searchResults.map((train) => {
              const { id, name, departureTime, arrivalTime, duration } = train;
              return (
                <li key={id}>
                  <p>Train Name: {name}</p>
                  <p>Departure: {departureTime}</p>
                  <p>Arrival: {arrivalTime}</p>
                  <p>Duration: {duration}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrainSearch;