import mongoose from "mongoose";

const trainingSchema = mongoose.Schema(
  {
    video: {
      type: String,
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    video_name: {
      type: String,
      required: true,
    },
    video_decription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const trainingModel = mongoose.model("Training", trainingSchema);

export default trainingModel;
