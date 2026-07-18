import Course from "../../../model/course.schema.js";

const createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: "Title, description, and category are required" });
    }

    const course = await Course.create({
      title,
      description,
      category,
      instructor: req.user.id,
      isApproved: false,
    });

    return res.status(201).json({ success: true, message: "Course created successfully, pending admin approval", data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating course", error: error.message });
  }
};

export default createCourse;
