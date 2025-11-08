import notificationModel from "../models/notification.model.js";
import trainingModel from "../models/onlinetraining.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const addvideo = async (req, res) => {
  const { video_name, video_decription } = req.body;
  const { id } = req.params;
  try {
    if (!video_name || !video_decription || !req.file) {
      return res.status(400).json({ message: "Details missing" });
    }

    const allowedTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message:
          "Invalid file type. Only MP4, MOV, AVI, and MKV videos are allowed.",
      });
    }

    const buffer = await fs.promises.readFile(req.file.path);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "fitness_videos",
            allowed_formats: ["mp4", "mov", "avi", "mkv"],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    await fs.promises.unlink(req.file.path);

    const video = new trainingModel({
      video_name,
      video_decription,
      video: result.secure_url,
      trainer: id,
    });
    await video.save();

    const newNotification = new notificationModel({
      notification: video_name,
      description: video_decription,
    });

    await newNotification.save();

    return res.status(200).json({
      message: "New video added",
      video,
      cloudinary_url: result.secure_url,
    });
  } catch (error) {
    console.log("error add video " + error.message);

    if (req.file && req.file.path) {
      try {
        const fs = await import("fs");
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.log("Error deleting temporary file:", unlinkError);
      }
    }

    if (error.message.includes("Invalid file type")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Error uploading video",
      error: error.message,
    });
  }
};

const viewvideo = async (req, res) => {
  try {
    const video = await trainingModel.find();
    console.log(video);
    if (video.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No video found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Video found", video });
  } catch (error) {
    console.log("error view video " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editvideo = async (req, res) => {
  try {
    const { video_name, video_decription } = req.body;
    const { id } = req.params;
    const video = await trainingModel.findByIdAndUpdate(
      id,
      {
        video_name,
        video_decription,
      },
      { new: true }
    );
    if (!video) {
      return res
        .status(400)
        .json({ success: false, message: "Video not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Video updated", video });
  } catch (error) {
    console.log("error edit video " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletevideo = async (req, res) => {
  try {
    const { id } = req.params;
    await trainingModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleted successfuly" });
  } catch (error) {
    console.log("error delete video " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addvideo, viewvideo, editvideo, deletevideo };
