import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  notification: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  date: {
    type: Date,
  },
});

const notificationModel = mongoose.model('Notification', notificationSchema);

export default notificationModel;
