import mongoose from "mongoose";

const studentScema = new mongoose.Schema({
  Profile_picture: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
    maxlength: [250, "Bio must be less than 250 characters"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate",
  },
});

const Student = mongoose.model("Student", studentScema);

export default Student;
