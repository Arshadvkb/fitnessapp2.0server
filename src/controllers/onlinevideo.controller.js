import cloudinary from "../config/cloudinary.js";
import notificationModel from "../models/notification.model.js";
import trainingModel from "../models/onlinetraining.model.js";

const addvideo = async (req, res) => {
  const { video_name, video_decription } = req.body;
  const { id } = req.params;
  try {
    if (!video_name || !video_decription || !req.file) {
      return res.status(400).json({ message: "Details missing" });
    }
    console.log(req.file.path);

    const video = new trainingModel({
      video_name,
      video_decription,
      video: req.file.path,
      trainer: id,
    });
    await video.save();
    const newNotification = new notificationModel({
      notification: video_name,
      description: video_decription,
    });

    await newNotification.save();

    return res.status(200).json({ message: "New video added", video });
  } catch (error) {
    console.log("error add video " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewvideo = async (req, res) => {
  try {
    const video = await trainingModel.find();
    console.log(video);
    if (!video) {
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

export { addvideo, viewvideo };
