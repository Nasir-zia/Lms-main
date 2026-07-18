import Student from "../../../model/User_Management/Student.schema.js";

const updateProfile = async (req, res) => {
  try {
    const { Profile_picture, degree, semester, Bio } = req.body;
    let student = await Student.findOne({ userId: req.user.id });

    if (student) {
      student.Profile_picture = Profile_picture || student.Profile_picture;
      student.degree = degree || student.degree;
      student.semester = semester || student.semester;
      student.Bio = Bio || student.Bio;
      await student.save();
    } else {
      student = await Student.create({
        userId: req.user.id,
        Profile_picture,
        degree,
        semester,
        Bio,
      });
    }

    return res.status(200).json({ success: true, message: "Profile updated successfully", data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
  }
};

export default updateProfile;
