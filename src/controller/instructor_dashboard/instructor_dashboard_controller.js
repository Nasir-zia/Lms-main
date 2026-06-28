import InstructorDashboard from "../../model/User_Management/Dashboard/Instructor_Dashboard.schema.js";

const createInstructorDashboard = async (req, res) => {
  try {
    const { instructorId } = req.body;

    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "instructorId is required",
      });
    }

    // dashboard is unique per instructorId (enforced by schema)
    const existing = await InstructorDashboard.findOne({ instructorId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Instructor dashboard already exists",
      });
    }

    const dashboard = await InstructorDashboard.create({ instructorId });

    return res.status(201).json({
      success: true,
      message: "Instructor dashboard created successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error("createInstructorDashboard error:", error);

    // Handle unique index error (in case of race conditions)
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Instructor dashboard already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating instructor dashboard",
      error: error.message,
    });
  }
};

const getInstructorDashboard = async (req, res) => {
  try {
    const { instructorId } = req.params;

    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "instructorId is required",
      });
    }

    const dashboard = await InstructorDashboard.findOne({ instructorId });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Instructor dashboard not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error("getInstructorDashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching instructor dashboard",
      error: error.message,
    });
  }
};

export { createInstructorDashboard, getInstructorDashboard };

