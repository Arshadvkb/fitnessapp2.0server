import trainerModel from "../models/trainer.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";

const addTrainer = async (req, res) => {
  const { tname, phone, gender, email, place, expertise, password } = req.body;
  console.log(req.file);

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
      return res.status(400).json({ message: "Missing detials" });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "fitnessapp2.0",
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingTrainer = await trainerModel.findOne({ email });
    if (existingTrainer) {
      return res
        .status(400)
        .json({ message: "Trainer with this email id already exists" });
    }

    const trainer = new trainerModel({
      tname,
      password: hashedPassword,
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
    console.log("error in add trainer" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const view_trainer = async (req, res) => {
  try {
    const trainers = await trainerModel.find();
    console.log(trainers);
    return res.status(200).json({ trainers });
  } catch (error) {
    console.log("error in view trainer" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const delete_trainer = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await trainerModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "trainer deleted" });
  } catch (error) {
    console.log("error in delete trainer " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addTrainer, view_trainer, delete_trainer };
