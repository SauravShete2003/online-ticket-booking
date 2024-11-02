import React, { useState } from "react";
import "./Signup.css"
function Signup() {
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bookings: "",
  });

  return (
    <div className="auth-container">
      <h1>Signup Page</h1>

      <div className="">
        <form className="auth-from-handle-container">

          <label>Enter Your Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            value={fromData.name}
            onChange={(e) =>
              setFromData({ ...fromData, name: e.target.value })}/>
          <br />

          <label>Enter Your Email:</label>
          <br />
          <input
          type="email"
          placeholder="Enter your email"
          value={fromData.email}
          onChange={(e) =>
            setFromData({ ...fromData, email: e.target.value })}/>
          <br />

          <label>Enter Your Password:</label>
          <br />
          <input
          type="password"
          placeholder="Enter your password"
          value={fromData.password}
          onChange={(e) =>setFromData({ ...fromData, password: e.target.value })}/>
          <br />

          <label>Enter Your Phone Number:</label>
          <br />
          <input
          type="number"
          placeholder="Enter your number"
          value={fromData.phone}
          onChange={(e) => setFromData({ ...fromData, phone: e.target.value })}/>
          <br />

          <label>Enter Your Bookings:</label>
          <br />
          <input
          type="number"
          placeholder="Enter your bookings"
          value={fromData.bookings}
          onChange={(e) =>setFromData({ ...fromData, bookings: e.target.value })}/>

        </form>
      </div>
    </div>
  );
}

export default Signup;
