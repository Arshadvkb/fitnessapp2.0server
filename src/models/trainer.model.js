import mongoose from 'mongoose';

const trainerSchema = mongoose.Schema(
  {
    login: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Login',
      required: true,
    },
    tname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const trainerModel = mongoose.model('Trainer', trainerSchema);

export default trainerModel;
