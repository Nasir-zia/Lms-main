import User from "../../../model/user.schema.js";
import Course from "../../../model/course.schema.js";

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const studentsCount = await User.countDocuments({ role: "student" });
    const instructorsCount = await User.countDocuments({ role: { $in: ["teacher", "instructor"] } });

    const totalCourses = await Course.countDocuments();
    const pendingCourses = await Course.countDocuments({ isApproved: false });

    const enrolledStudentsAggregation = await Course.aggregate([
      { $project: { numberOfStudents: { $size: "$enrolledStudents" } } },
      { $group: { _id: null, totalEnrollments: { $sum: "$numberOfStudents" } } },
    ]);
    const totalEnrollments = enrolledStudentsAggregation[0]?.totalEnrollments || 0;
    const totalRevenue = totalEnrollments * 15;

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        studentsCount,
        instructorsCount,
        totalCourses,
        pendingCourses,
        totalRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching admin dashboard data", error: error.message });
  }
};

export default getAdminDashboard;
