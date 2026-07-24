import mongoose from "mongoose";

const studentScema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  Profile_picture: {
    type: String,
    required: false,
  },
  degree: {
    type: String,
    required: false,
  },
  semester: {
    type: String,
    required: false,
  },
  Bio: {
    type: String,
    maxlength: [250, "Bio must be less than 250 characters"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
  progress: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    completedLessons: [String],
  }],
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate",
  },
});

const Student = mongoose.model("Student", studentScema);

export default Student;
