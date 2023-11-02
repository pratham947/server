import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION)
    console.log("server connected")
  } catch (error) {
    console.log(error);
  }
};
