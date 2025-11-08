import mongoose from "mongoose";

const workoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    count: {
      type: [Number],
      required: true,
    },
    workout: {
      type: String,
      required: true,
    },
    weight: {
      type: [String],
    },
  },
  { timestamps: true }
);

const workoutModel = mongoose.model("Workout", workoutSchema);

export default workoutModel;
