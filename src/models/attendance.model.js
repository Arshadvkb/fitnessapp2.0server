import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum:[pressent,absent],
    required: true,
  },
});


const attendancemodel=mongoose.model("Attendance",attendanceSchema)

export default attendancemodel