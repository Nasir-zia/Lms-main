import Course from "../../../model/course.schema.js";
import Assignment from "../../../model/assignment.schema.js";
import Submission from "../../../model/submission.schema.js";

const getSubmissions = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    const courseIds = courses.map(c => c._id);

    const assignments = await Assignment.find({ courseId: { $in: courseIds } });
    const assignmentIds = assignments.map(a => a._id);

    const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } })
      .populate("assignmentId", "title maxMarks courseId")
      .populate("studentId", "username lastname email");

    return res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching submissions", error: error.message });
  }
};

export default getSubmissions;
