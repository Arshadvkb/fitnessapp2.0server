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
      email,
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
      dob: dob,
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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await LoginModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        generateToken(existingUser._id, res);

        return res
          .status(200)
          .json({ success: true, message: 'Logged in successfuly' });
      }
      return res
        .status(400)
        .json({ success: false, message: 'Wrong password' });
    }
    return res.status(400).json({ success: false, message: 'No user found' });
  } catch (error) {
    console.log('error in login' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { register, login, logout };
