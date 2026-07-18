import InstructorProfile from "../../../model/User_Management/Dashboard/Instructor.Model.js";

const approveInstructor = async (req, res) => {
  try {
    const { instructorProfileId } = req.params;
    const { approve } = req.body;

    const instructor = await InstructorProfile.findById(instructorProfileId);
    if (!instructor) {
      return res.status(404).json({ success: false, message: "Instructor profile not found" });
    }

    instructor.isVerified = approve !== undefined ? approve : true;
    await instructor.save();

    return res.status(200).json({
      success: true,
      message: instructor.isVerified ? "Instructor approved successfully" : "Instructor approval revoked",
      data: instructor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error processing instructor approval", error: error.message });
  }
};

export default approveInstructor;
