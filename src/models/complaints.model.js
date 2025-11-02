import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema(
  {
    complaint: {
      type: String,
      maxlength: 50,
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
  },
  { timestamps: true }
);

const complaintModel = mongoose.model('Complaints', complaintSchema);

export default complaintModel;
