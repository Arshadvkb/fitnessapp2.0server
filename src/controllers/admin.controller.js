import LoginModel from '../models/login.model.js';
import trainerModel from '../models/trainer.model.js';
import cloudinary from '../config/cloudinary.js';
import bcrypt from 'bcryptjs';

const addTrainer = async (req, res) => {
  const { tname, phone, gender, email, place, expertise, password } = req.body;

  try {
    if (
      !tname ||
      !phone ||
      !gender ||
      !email ||
      !place ||
      !expertise ||
      !password
    ) {
      return res.status(400).json({ message: 'Missing detials' });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'fitnessapp2.0',
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const login = new LoginModel({
      email,
      password: hashedPassword,
      role: 'trainer',
    });
    await login.save();

    const trainer = new trainerModel({
      tname,
      login: login._id,
      phone,
      gender,
      email,
      expertise,
      place,
      image: uploadResult.secure_url,
    });
    await trainer.save();

    return res.status(201).json({ trainer });
  } catch (error) {
    console.log('error in add trainer' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { addTrainer };
