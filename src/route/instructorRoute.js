import express from "express";
import getInstructorDashboard from "../controller/v5/instructor/getInstructorDashboard.js";
import createCourse from "../controller/v5/instructor/createCourse.js";
import updateCourse from "../controller/v5/instructor/updateCourse.js";
import deleteCourse from "../controller/v5/instructor/deleteCourse.js";
import addLessonToCourse from "../controller/v5/instructor/addLessonToCourse.js";
import deleteLessonFromCourse from "../controller/v5/instructor/deleteLessonFromCourse.js";
import createQuiz from "../controller/v5/instructor/createQuiz.js";
import createAssignment from "../controller/v5/instructor/createAssignment.js";
import getCourseStudentsProgress from "../controller/v5/instructor/getCourseStudentsProgress.js";
import getSubmissions from "../controller/v5/instructor/getSubmissions.js";
import gradeSubmission from "../controller/v5/instructor/gradeSubmission.js";
import postAnnouncement from "../controller/v5/instructor/postAnnouncement.js";

const router = express.Router();

router.get("/dashboard", getInstructorDashboard);
router.post("/courses", createCourse);
router.put("/courses/:courseId", updateCourse);
router.delete("/courses/:courseId", deleteCourse);
router.post("/courses/:courseId/lessons", addLessonToCourse);
router.delete("/courses/:courseId/lessons/:lessonId", deleteLessonFromCourse);
router.post("/quiz", createQuiz);
router.post("/assignment", createAssignment);
router.get("/courses/:courseId/progress", getCourseStudentsProgress);
router.get("/submissions", getSubmissions);
router.put("/submissions/:submissionId/grade", gradeSubmission);
router.post("/courses/:courseId/announcement", postAnnouncement);

export default router;
