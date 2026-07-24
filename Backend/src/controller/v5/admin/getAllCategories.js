import Category from "../../../model/category.schema.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
  }
};

export default getAllCategories;
