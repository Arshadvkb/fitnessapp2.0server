import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  login: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  decreption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{timestamps:true}
);

const userModel=mongoose.model("User",userSchema)

export default userModel