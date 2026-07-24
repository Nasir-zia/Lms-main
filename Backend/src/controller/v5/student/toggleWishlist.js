import Course from "../../../model/course.schema.js";

const toggleWishlist = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const userId = req.user.id;
    const index = course.wishlistedBy.indexOf(userId);

    if (index > -1) {
      course.wishlistedBy.splice(index, 1);
      await course.save();
      return res.status(200).json({ success: true, message: "Course removed from wishlist", wishlisted: false });
    } else {
      course.wishlistedBy.push(userId);
      await course.save();
      return res.status(200).json({ success: true, message: "Course added to wishlist", wishlisted: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error toggling wishlist", error: error.message });
  }
};

export default toggleWishlist;
