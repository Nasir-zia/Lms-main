import Course from "../../../model/course.schema.js";

const getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    const totalCourses = courses.length;

    let totalStudents = 0;
    courses.forEach(course => {
      totalStudents += course.enrolledStudents.length;
    });

    const totalRevenue = totalStudents * 15;

    const recentActivity = [
      {
        title: "Course Creation",
        description: `You have successfully created ${totalCourses} course(s).`,
      },
      {
        title: "Student Enrollment",
        description: `${totalStudents} students are currently learning from your courses.`,
      },
    ];

    return res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalStudents,
        totalRevenue,
        recentActivity,
        courses,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error loading dashboard", error: error.message });
  }
};

export default getInstructorDashboard;
