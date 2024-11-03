import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

const userLogin = async (e) => {
  e.preventDefault(); 
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    
    if (response.data.data) {
      toast.success("User login successful");
      setLoginData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
    toast.error("Login failed. Please try again.");
  }
};


  return (
    <div className="auth-container">
      <h1 className="auth-heading">Login Page</h1>
      <form onSubmit={userLogin}>
        <label className="auth-input-label" htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          name="email"
          className="auth-input"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />

        <label className="auth-input-label" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
