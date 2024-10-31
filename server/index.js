import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose, { get } from "mongoose";

import {
  postSignup,
  postLogin,
  putUser,
  getUsers,
} from "./controllers/user.js";

import { trainRoutes , getTrains , getTrain , putTrain} from "./controllers/train.js";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: "Server is running",
    success: true,
  });
});
// user api 
app.post("/signup", postSignup);
app.post("/login", postLogin);
app.put("/user/:id", putUser);
app.get("/users", getUsers);

//train api
app.post("/trains" , trainRoutes);
app.get("/trains" , getTrains);
app.get("/train/:trainId" , getTrain);
app.put("/user/:trainId" , putTrain)

async function mongoConnection() {
  const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
  if (conn) {
    console.log("MongoDB Connected ✅");
  }
}
mongoConnection();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}✈️`);
});
