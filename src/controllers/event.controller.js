import cloudinary from '../config/cloudinary.js';
import eventModel from '../models/events.model.js';

const addevent = async (req, res) => {
  const { title, description, date, time } = req.body;
  try {
    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: 'Details missing' });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'fitnessapp2.0',
    });

    const newevent = new eventModel({
      title,
      description,
      date,
      time,
      image: uploadResult.secure_url,
    });
    await newevent.save();
    return res.status(201).json({ message: 'New event added', newevent });
  } catch (error) {
    console.log('error add event ' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const viewevent = async (req, res) => {
  try {
    const events = await eventModel.find();
    return res.status(200).json({ events });
  } catch (error) {
    console.log('error view event ' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const editevent = async (req, res) => {};

const deleteevent = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await eventModel.findByIdAndDelete(id);
    console.log(response);

    return res.status(200).json({ message: 'event deleted' });
  } catch (error) {
    console.log('error in delete event ' + error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { addevent, viewevent, editevent, deleteevent };
