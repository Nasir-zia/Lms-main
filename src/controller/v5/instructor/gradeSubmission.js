import Course from "../../../model/course.schema.js";
import Submission from "../../../model/submission.schema.js";

const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marksObtained, feedback } = req.body;

    if (marksObtained === undefined) {
      return res.status(400).json({ success: false, message: "marksObtained is required" });
    }

    const submission = await Submission.findById(submissionId).populate("assignmentId");
    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    const course = await Course.findOne({ _id: submission.assignmentId.courseId, instructor: req.user.id });
    if (!course) {
      return res.status(403).json({ success: false, message: "Unauthorized to grade this submission" });
    }

    submission.marksObtained = marksObtained;
    submission.feedback = feedback || submission.feedback;
    submission.status = "graded";
    await submission.save();

    return res.status(200).json({ success: true, message: "Submission graded successfully", data: submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error grading submission", error: error.message });
  }
};

export default gradeSubmission;
