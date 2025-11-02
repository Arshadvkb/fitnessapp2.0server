import mongoose from 'mongoose';

const dietSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    food: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: ture,
    },
  },
  { timestamps: true }
);

const dietModel = mongoose.model('Diet', dietSchema);

export default dietModel;
