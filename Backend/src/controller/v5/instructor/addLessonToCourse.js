import Course from "../../../model/course.schema.js";

const addLessonToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, videoUrl, pdfUrl } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Lesson title is required" });
    }

    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    course.lessons.push({ title, description, videoUrl, pdfUrl });
    await course.save();

    return res.status(200).json({ success: true, message: "Lesson added successfully", data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error adding lesson", error: error.message });
  }
};

export default addLessonToCourse;
