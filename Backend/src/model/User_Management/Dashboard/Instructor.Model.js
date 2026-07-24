import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "instructor",
  },
  bio: {
    type: String
},

  expertise: [String], 

  experience: {
    type: Number,
  },

  education:{ 
    type: String},

  isVerified: {
    type: Boolean,
    default: false,
  },

  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  studentsCount: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    maxlength: [250, "Comment must be less than 250 characters"],
  },
 ratings: {
    type: Number,
    default: 0,
  },

  totalReviews: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const instructor =  mongoose.model("Instructor", instructorSchema);
export default instructor;