import Course from "../../../model/course.schema.js";

const approveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { approve } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    course.isApproved = approve !== undefined ? approve : true;
    await course.save();

    return res.status(200).json({
      success: true,
      message: course.isApproved ? "Course approved successfully" : "Course approval revoked",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error processing course approval", error: error.message });
  }
};

export default approveCourse;
