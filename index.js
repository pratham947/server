import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./db/DatabaseConnection.js";

// routers import
import userRoute from "./routes/Userroute.js";
import adminRoute from "./routes/Adminroute.js";

const app = express();

// To get data in the object form
app.use(express.json());

// dotenv setup
dotenv.config();

// database connection
connectToDb();

// routing
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT);
});
