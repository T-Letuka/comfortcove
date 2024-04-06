import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Mongodb is connected perfectly");
  })
  .catch((err) => {
    console.log("Something is wrong error");
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running perfectly on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
