import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { postSignup  , postLogin} from "./controllers/user.js";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: "Server is running",
    success: true
  });
});

app.post("/signup" , postSignup)
app.post("/login" , postLogin)


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
