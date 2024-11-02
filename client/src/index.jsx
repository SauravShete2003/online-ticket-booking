import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./views/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./../src/views/Signup/Signup"
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
    }

]);

root.render(<RouterProvider router={router} />);
