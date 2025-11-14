import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import adminModel from "../models/admin.model.js";
import trainerModel from "../models/trainer.model.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const {
    userName,
    password,
    confirmpassword,
    mobile,
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
      !userName ||
      !password ||
      !mobile ||
      !email ||
      !height ||
      !weight ||
      !goal ||
      !description ||
      !gender ||
      !dob ||
      !place
    ) {
      console.log("missing details");

      return res.status(400).json({ message: "Missing detials" });
    }
    if (confirmpassword != password)
      return res.status(400).json({ message: "password must be same" });

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "library_books",
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ message: "User with this email id already exists" });
    }

    const user = new userModel({
      username: userName,
      password: hashedPassword,
      phone: mobile,
      email,
      height,
      weight,
      goal,
      description,
      gender,
      dob: dob,
      place,
      image: uploadResult.secure_url,
    });
    generateToken(user._id, res);
    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    console.log("error in register" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(req.body);

  try {
    if (!email || !password || !role) {
      return res.json({ success: false, message: "missing details" });
    }
    if (role === "admin") {
      const admin = await adminModel.findOne({ email });
      if (!admin) {
        console.log("login failed");

        return res.json({ success: false, message: "Invalid email" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }
      generateToken(admin._id, res);
      return res.json({
        success: true,
        message: "Login successful",
        admin,
      });
    }
    if (role === "trainer") {
      const trainer = await trainerModel.findOne({ email });
      if (!trainer) {
        console.log("login failed");

        return res.json({ success: false, message: "Invalid email" });
      }
      const isMatch = await bcrypt.compare(password, trainer.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }
      generateToken(trainer._id, res);
      return res.json({
        success: true,
        message: "Login successful",
        trainer,
      });
    }
    if (role === "user") {
      const user = await userModel.findOne({ email });
      if (!user) {
        console.log("login failed");

        return res.json({ success: false, message: "Invalid email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }
      generateToken(user._id, res);
      return res.json({ success: true, message: "Login successful", user });
    }
  } catch (error) {
    console.log("error in login" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { register, login, logout };
