import cloudinary from "../config/cloudinary.js";
import eventModel from "../models/events.model.js";
import notificationModel from "../models/notification.model.js";

const addevent = async (req, res) => {
  try {
    console.log(req.body);

    const { title, description, date, time } = req.body;
    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: "Details missing" });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "fitnessapp2.0",
    });

    const newevent = new eventModel({
      title,
      description,
      date,
      time,
      image: uploadResult.secure_url,
    });
    const newnotification = new notificationModel({
      notification: title,
      description: description,
      date: date,
    });
    await newnotification.save();
    await newevent.save();
    return res.status(201).json({ message: "New event added", newevent });
  } catch (error) {
    console.log("error add event " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewevent = async (req, res) => {
  try {
    const events = await eventModel.find();
    return res.status(200).json({ events });
  } catch (error) {
    console.log("error view event " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editevent = async (req, res) => {
  console.log("Received request body:", req.body);

  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const event = await eventModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
      },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "No event found" });
    }

    return res.status(200).json({ success: true, message: "event updated" });
  } catch (error) {
    console.log("error edit event " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteevent = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await eventModel.findByIdAndDelete(id);
    console.log(response);

    return res.status(200).json({ message: "event deleted" });
  } catch (error) {
    console.log("error in delete event " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addevent, viewevent, editevent, deleteevent };
