import mongoose from 'mongoose';

const feesSchema = mongoose.Schema(
  {
    fees: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const feesModel = mongoose.model('Fees', feesSchema);

export default feesModel;
