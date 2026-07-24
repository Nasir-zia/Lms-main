import Student from "../../../model/User_Management/Student.schema.js";

const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate("enrolledCourses", "title description lessons")
      .populate("certificate");

    if (!student) {
      return res.status(200).json({
        success: true,
        data: {
          enrolledCourses: [],
          certificates: [],
          progressOverview: [],
        },
      });
    }

    const progressOverview = student.enrolledCourses.map(course => {
      const courseProgress = student.progress.find(p => p.courseId.toString() === course._id.toString());
      const totalLessons = course.lessons.length;
      const completedCount = courseProgress ? courseProgress.completedLessons.length : 0;
      const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        courseId: course._id,
        title: course.title,
        totalLessons,
        completedLessonsCount: completedCount,
        percentComplete,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        enrolledCourses: student.enrolledCourses,
        progressOverview,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error loading dashboard", error: error.message });
  }
};

export default getStudentDashboard;
