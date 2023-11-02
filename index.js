import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./db/DatabaseConnection.js";
import cors from "cors";

// clouinary import
import cloudinary from "cloudinary";

// routers import
import userRoute from "./routes/Userroute.js";
import adminRoute from "./routes/Adminroute.js";

const app = express();

app.use(cors());

// To get data in the object form
app.use(express.json());

// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// dotenv setup
dotenv.config();

// database connection
connectToDb();

// routing
app.get("/", (req,res) => {
  res.send("hello");
});


app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT);
});
