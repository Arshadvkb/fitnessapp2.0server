import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const eventModel = mongoose.model("Events", eventSchema);

export default eventModel;
