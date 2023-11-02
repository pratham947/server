import mongoose from "mongoose";

const bloodDonationSchema = mongoose.Schema({
  camp_Name: {
    type: String,
    required: true,
  },
  camp_time_start: {
    type: String,
    required: true,
  },
  camp_time_end: {
    type: String,
  },
  registration: [
    {
      user_id: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Blooddontation = mongoose.model("Blooddonation", bloodDonationSchema);
export default Blooddontation;
