import express from "express"
import create_student from "../controller/student/student_controller.js"


const router = express.Router();

router.post("/student" , create_student)

export default router;