import User from "../../../model/user.schema.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error retrieving users", error: error.message });
  }
};

export default getAllUsers;
