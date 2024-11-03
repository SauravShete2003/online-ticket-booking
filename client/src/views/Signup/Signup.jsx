import React, { useState } from "react";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const userCreate = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, fromData);
      setFromData({ name: "", email: "", password: "", phone: "" });
      toast.success("User created successfully");

      if (response) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-heading">Signup Page</h1>

      <form >
        <label htmlFor="name" className="auth-input-label">
          Full Name:
        </label>
        <input
          id="name"
          type="text"
          className="auth-input"
          placeholder="Enter your full name"
          value={fromData.name}
          onChange={(e) => setFromData({ ...fromData, name: e.target.value })}
        />

        <label htmlFor="email" className="auth-input-label">
          Email Address:
        </label>
        <input
          id="email"
          type="email"
          className="auth-input"
          placeholder="Enter your email"
          value={fromData.email}
          onChange={(e) => setFromData({ ...fromData, email: e.target.value })}
        />

        <label htmlFor="password" className="auth-input-label">
          Password:
        </label>
        <input
          id="password"
          type="password"
          className="auth-input"
          placeholder="Create a password"
          value={fromData.password}
          onChange={(e) =>
            setFromData({ ...fromData, password: e.target.value })
          }
        />

        <label htmlFor="phone" className="auth-input-label">
          Phone Number:
        </label>
        <input
          id="phone"
          type="tel"
          className="auth-input"
          placeholder="Enter your phone number"
          value={fromData.phone}
          onChange={(e) => setFromData({ ...fromData, phone: e.target.value })}
        />

        <button
          type="button"
          className="auth-button"
          onClick={userCreate}
        >
          Book Now
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Signup;
