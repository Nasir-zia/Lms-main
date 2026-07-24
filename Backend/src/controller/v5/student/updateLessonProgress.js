import Student from "../../../model/User_Management/Student.schema.js";
import Course from "../../../model/course.schema.js";

const updateLessonProgress = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student profile not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const lessonExists = course.lessons.some(l => l._id.toString() === lessonId);
    if (!lessonExists) {
      return res.status(404).json({ success: false, message: "Lesson not found in this course" });
    }

    const courseProgress = student.progress.find(p => p.courseId.toString() === courseId);
    if (!courseProgress) {
      return res.status(400).json({ success: false, message: "Not enrolled in this course" });
    }

    if (!courseProgress.completedLessons.includes(lessonId)) {
      courseProgress.completedLessons.push(lessonId);
      await student.save();
    }

    const totalLessons = course.lessons.length;
    const completedCount = courseProgress.completedLessons.length;
    const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return res.status(200).json({
      success: true,
      message: "Lesson progress updated",
      data: {
        completedLessonsCount: completedCount,
        totalLessons,
        percentComplete,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating progress", error: error.message });
  }
};

export default updateLessonProgress;
