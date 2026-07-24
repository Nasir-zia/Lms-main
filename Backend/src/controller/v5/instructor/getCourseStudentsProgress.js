import Course from "../../../model/course.schema.js";
import Student from "../../../model/User_Management/Student.schema.js";

const getCourseStudentsProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    const students = await Student.find({ enrolledCourses: courseId }).populate("userId", "username lastname email");

    const progressData = students.map(student => {
      const studentProgress = student.progress.find(p => p.courseId.toString() === courseId);
      const totalLessons = course.lessons.length;
      const completedCount = studentProgress ? studentProgress.completedLessons.length : 0;
      const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        studentId: student.userId._id,
        username: student.userId.username,
        lastname: student.userId.lastname,
        email: student.userId.email,
        percentComplete,
        completedLessonsCount: completedCount,
        totalLessons,
      };
    });

    return res.status(200).json({ success: true, data: progressData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error loading student progress", error: error.message });
  }
};

export default getCourseStudentsProgress;
