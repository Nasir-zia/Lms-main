import Course from "../../../model/course.schema.js";

const postAnnouncement = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    course.announcements.push({ title, content });
    await course.save();

    return res.status(200).json({ success: true, message: "Announcement posted successfully", data: course.announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error posting announcement", error: error.message });
  }
};

export default postAnnouncement;
