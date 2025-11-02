import mongoose from 'mongoose';

const loginSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 50,
    },
    role: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const LoginModel = mongoose.model('Login', loginSchema);

export default LoginModel;
