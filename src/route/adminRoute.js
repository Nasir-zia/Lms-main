import express from "express";
import getAdminDashboard from "../controller/v5/admin/getAdminDashboard.js";
import getAllUsers from "../controller/v5/admin/getAllUsers.js";
import updateUserRole from "../controller/v5/admin/updateUserRole.js";
import approveInstructor from "../controller/v5/admin/approveInstructor.js";
import approveCourse from "../controller/v5/admin/approveCourse.js";
import createCategory from "../controller/v5/admin/createCategory.js";
import getAllCategories from "../controller/v5/admin/getAllCategories.js";

const router = express.Router();

router.get("/dashboard", getAdminDashboard);
router.get("/users", getAllUsers);
router.put("/users/:userId/role", updateUserRole);
router.put("/instructors/:instructorProfileId/approve", approveInstructor);
router.put("/courses/:courseId/approve", approveCourse);
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);

export default router;
