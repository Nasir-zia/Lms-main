import Course from "../../../model/course.schema.js";

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOneAndDelete({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }
    return res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting course", error: error.message });
  }
};

export default deleteCourse;
