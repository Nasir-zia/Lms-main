import Student from "../../../model/User_Management/Student.schema.js";
import Course from "../../../model/course.schema.js";

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (!course.isApproved) {
      return res.status(400).json({ success: false, message: "Course is not approved yet" });
    }

    let student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      student = await Student.create({ userId: req.user.id });
    }

    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" });
    }

    student.enrolledCourses.push(courseId);
    student.progress.push({ courseId, completedLessons: [] });
    await student.save();

    if (!course.enrolledStudents.includes(req.user.id)) {
      course.enrolledStudents.push(req.user.id);
      await course.save();
    }

    return res.status(200).json({ success: true, message: "Enrolled successfully", data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error enrolling in course", error: error.message });
  }
};

export default enrollInCourse;
