import express from "express";
import {
  createInstructorDashboard,
  getInstructorDashboard,
} from "../controller/instructor_dashboard/instructor_dashboard_controller.js";

const router = express.Router();

router.post("/dashboard", createInstructorDashboard);
router.get("/dashboard/:instructorId", getInstructorDashboard);

export default router;

