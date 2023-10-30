import express from "express";
import cors from "cors";
import router from "./api/route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", //"https://localhost:3000"
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

export default app;
