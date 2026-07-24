import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  marksObtained: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  status: {
    type: String,
    enum: ["submitted", "graded"],
    default: "submitted",
  },
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
