import mongoose from "mongoose";

const adoptionSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  fathername: {
    type: String,
  },
  mothername: {
    type: String,
  },
  isEducationStarted: {
    type: Boolean,
    default:false
  },
  current_class: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  child_image:{
    type:String
  },
  image:{
    public_id:{
        type:String,
    }
    ,
    url:{
        type:String
    }
  }
});

const Adoption = mongoose.model("Adoption", adoptionSchema);
export default Adoption;
