import Student from "../../../model/User_Management/Student.schema.js";

const getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).populate("userId", "username lastname email role");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student profile not found" });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching profile", error: error.message });
  }
};

export default getProfile;
