import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  pdfUrl: {
    type: String,
  },
});

const reviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lessons: [lessonSchema],
  isApproved: {
    type: Boolean,
    default: false,
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  reviews: [reviewSchema],
  wishlistedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  announcements: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;
