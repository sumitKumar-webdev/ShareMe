import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dataRoutes from "./routes/dataRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const app = express();


app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use("/api", dataRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
