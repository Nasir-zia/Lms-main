import mongoose from "mongoose";

const instructorDashboardSchema = new mongoose.Schema(
  {
    // Link this dashboard to a specific instructor
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
      unique: true,
    },

    // Example dashboard fields (extend as needed)
    totalStudents: {
      type: Number,
      default: 0,
    },

    totalCourses: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },

    recentActivity: [
      {
        title: { type: String },
        description: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const InstructorDashboard = mongoose.model( "InstructorDashboard", instructorDashboardSchema);

export default InstructorDashboard;

