import Category from "../../../model/category.schema.js";

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = await Category.create({ name, description });
    return res.status(201).json({ success: true, message: "Category created successfully", data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating category", error: error.message });
  }
};

export default createCategory;
