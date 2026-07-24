import Course from "../../../model/course.schema.js";
import Assignment from "../../../model/assignment.schema.js";

const createAssignment = async (req, res) => {
  try {
    const { courseId, title, description, dueDate, maxMarks } = req.body;

    if (!courseId || !title || !dueDate) {
      return res.status(400).json({ success: false, message: "courseId, title, and dueDate are required" });
    }

    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    const assignment = await Assignment.create({
      courseId,
      title,
      description,
      dueDate,
      maxMarks,
    });

    return res.status(201).json({ success: true, message: "Assignment created successfully", data: assignment });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating assignment", error: error.message });
  }
};

export default createAssignment;
