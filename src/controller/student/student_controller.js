// controllers/student/createStudent.controller.js

import Student from "../../model/User_Management/Student.schema.js";

const create_student = async (req, res) => {
  try {
    const { Profile_picture, degree, semester, Bio, course, certificate } =
      req.body;

    // Validation
    if (
      !Profile_picture ||
      !degree ||
      !semester ||
      !Bio ||
      !course ||
      !certificate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check existing student
    const existingStudent = await Student.findOne({
      Profile_picture,
      email,
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student already exists",
      });
    }

    // Create student
    const student = await Student.create({
      Profile_picture,
      degree,
      semester,
      Bio,
      course,
      certificate,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("Create Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
};

export default create_student;
