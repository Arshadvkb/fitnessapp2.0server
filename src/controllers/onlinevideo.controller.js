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
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "fitnessapp2.0",
    });
    const video = new trainingModel({
      video_name,
      video_decription,
      video: uploadResult.secure_url,
      trainer: id,
    });
    await video.save();
    const newNotification = new notificationModel({
      notification: video_name,
      description: video_decription,
    });

    await newNotification.save();

    return res.status(200).json({ message: "New video adde", video });
  } catch (error) {
    console.log("error add video " + error.message);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addvideo };
