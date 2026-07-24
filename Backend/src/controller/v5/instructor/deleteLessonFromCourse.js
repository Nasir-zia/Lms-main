import Course from "../../../model/course.schema.js";

const deleteLessonFromCourse = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    course.lessons = course.lessons.filter(l => l._id.toString() !== lessonId);
    await course.save();

    return res.status(200).json({ success: true, message: "Lesson removed successfully", data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error removing lesson", error: error.message });
  }
};

export default deleteLessonFromCourse;
