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

export { addevent };
