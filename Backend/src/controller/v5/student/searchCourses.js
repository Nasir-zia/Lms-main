import Course from "../../../model/course.schema.js";

const searchCourses = async (req, res) => {
  try {
    const { title, category } = req.query;
    const filter = { isApproved: true };

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const courses = await Course.find(filter)
      .populate("category", "name")
      .populate("instructor", "username lastname email");
    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error searching courses", error: error.message });
  }
};

export default searchCourses;
