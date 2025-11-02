import { generateToken } from '../lib/utils.js';
import LoginModel from '../models/login.model.js';
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
  console.log(req.body);

  const {
    username,
    password,
    phone,
    email,
    height,
    weight,
    goal,
    description,
    gender,
    dob,
    place,
  } = req.body;

  try {
    if (
      !username ||
      !password ||
      !phone ||
      !email ||
      !height ||
      !weight ||
      !goal ||
      !description ||
      !gender ||
      !dob ||
      !place
    ) {
      return res.status(400).json({ message: 'Missing detials' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const login = new LoginModel({
      username,
      password: hashedPassword,
      role: 'user',
    });
    await login.save();

    const user = new userModel({
      login: login._id,
      username,
      phone,
      email,
      height,
      weight,
      goal,
      description,
      gender,
      dob:dob,
      place,
    });
    generateToken(user._id, res);
    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    console.log('error in register' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { register };
