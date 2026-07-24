import Assignment from "../../../model/assignment.schema.js";
import Submission from "../../../model/submission.schema.js";

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, fileUrl } = req.body;
    if (!assignmentId || !fileUrl) {
      return res.status(400).json({ success: false, message: "assignmentId and fileUrl are required" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    const submission = await Submission.create({
      assignmentId,
      studentId: req.user.id,
      fileUrl,
    });

    return res.status(201).json({ success: true, message: "Assignment submitted successfully", data: submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error submitting assignment", error: error.message });
  }
};

export default submitAssignment;
