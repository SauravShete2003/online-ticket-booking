import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./views/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./../src/views/Signup/Signup"
import Login from './../src/views/Login/Login'
const root = ReactDOM.createRoot(document.getElementById("root"));
const router =
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path : "signup",
        element : <Signup/>
    },
    {
      path : "login",
      element : <Login/>
    }

]);

root.render(<RouterProvider router={router} />);
