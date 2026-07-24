import Course from "../../../model/course.schema.js";

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, category } = req.body;

    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    await course.save();

    return res.status(200).json({ success: true, message: "Course updated successfully", data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating course", error: error.message });
  }
};

export default updateCourse;
