import User from "../../../model/user.schema.js";

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!role || !["user", "admin", "teacher", "student", "instructor"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role value provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({ success: true, message: `User role updated to ${role}`, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating user role", error: error.message });
  }
};

export default updateUserRole;
