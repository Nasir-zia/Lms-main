import express from "express";

// Middlewares
import verifyRole from "../middleware/verifyrole.js";
import rolecheck from "../middleware/rolecheck.js";

// Student Controllers
import getProfile from "../controller/v5/student/getProfile.js";
import updateProfile from "../controller/v5/student/updateProfile.js";
import searchCourses from "../controller/v5/student/searchCourses.js";
import enrollInCourse from "../controller/v5/student/enrollInCourse.js";
import toggleWishlist from "../controller/v5/student/toggleWishlist.js";
import updateLessonProgress from "../controller/v5/student/updateLessonProgress.js";
import takeQuiz from "../controller/v5/student/takeQuiz.js";
import submitAssignment from "../controller/v5/student/submitAssignment.js";
import getCertificate from "../controller/v5/student/getCertificate.js";
import getStudentDashboard from "../controller/v5/student/getStudentDashboard.js";

// Instructor Controllers
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

// Admin Controllers
import getAdminDashboard from "../controller/v5/admin/getAdminDashboard.js";
import getAllUsers from "../controller/v5/admin/getAllUsers.js";
import updateUserRole from "../controller/v5/admin/updateUserRole.js";
import approveInstructor from "../controller/v5/admin/approveInstructor.js";
import approveCourse from "../controller/v5/admin/approveCourse.js";
import createCategory from "../controller/v5/admin/createCategory.js";
import getAllCategories from "../controller/v5/admin/getAllCategories.js";

const router = express.Router();

// ==========================================
// 🎓 STUDENT ROUTES (Protected)
// ==========================================
router.get("/student/profile", verifyRole, rolecheck("student"), getProfile);
router.put("/student/profile", verifyRole, rolecheck("student"), updateProfile);
router.get("/student/courses", verifyRole, rolecheck("student"), searchCourses);
router.post("/student/courses/:courseId/enroll", verifyRole, rolecheck("student"), enrollInCourse);
router.post("/student/courses/:courseId/wishlist", verifyRole, rolecheck("student"), toggleWishlist);
router.post("/student/progress", verifyRole, rolecheck("student"), updateLessonProgress);
router.post("/student/quiz/take", verifyRole, rolecheck("student"), takeQuiz);
router.post("/student/assignment/submit", verifyRole, rolecheck("student"), submitAssignment);
router.get("/student/courses/:courseId/certificate", verifyRole, rolecheck("student"), getCertificate);
router.get("/student/dashboard", verifyRole, rolecheck("student"), getStudentDashboard);

// ==========================================
// 👨‍🏫 INSTRUCTOR ROUTES (Protected)
// ==========================================
router.get("/instructor/dashboard", verifyRole, rolecheck("instructor", "teacher"), getInstructorDashboard);
router.post("/instructor/courses", verifyRole, rolecheck("instructor", "teacher"), createCourse);
router.put("/instructor/courses/:courseId", verifyRole, rolecheck("instructor", "teacher"), updateCourse);
router.delete("/instructor/courses/:courseId", verifyRole, rolecheck("instructor", "teacher"), deleteCourse);
router.post("/instructor/courses/:courseId/lessons", verifyRole, rolecheck("instructor", "teacher"), addLessonToCourse);
router.delete("/instructor/courses/:courseId/lessons/:lessonId", verifyRole, rolecheck("instructor", "teacher"), deleteLessonFromCourse);
router.post("/instructor/quiz", verifyRole, rolecheck("instructor", "teacher"), createQuiz);
router.post("/instructor/assignment", verifyRole, rolecheck("instructor", "teacher"), createAssignment);
router.get("/instructor/courses/:courseId/progress", verifyRole, rolecheck("instructor", "teacher"), getCourseStudentsProgress);
router.get("/instructor/submissions", verifyRole, rolecheck("instructor", "teacher"), getSubmissions);
router.put("/instructor/submissions/:submissionId/grade", verifyRole, rolecheck("instructor", "teacher"), gradeSubmission);
router.post("/instructor/courses/:courseId/announcement", verifyRole, rolecheck("instructor", "teacher"), postAnnouncement);

// admin routes
router.get("/admin/dashboard", verifyRole, rolecheck("admin"), getAdminDashboard);
router.get("/admin/users", verifyRole, rolecheck("admin"), getAllUsers);
router.put("/admin/users/:userId/role", verifyRole, rolecheck("admin"), updateUserRole);
router.put("/admin/instructors/:instructorProfileId/approve", verifyRole, rolecheck("admin"), approveInstructor);
router.put("/admin/courses/:courseId/approve", verifyRole, rolecheck("admin"), approveCourse);
router.post("/admin/categories", verifyRole, rolecheck("admin"), createCategory);
router.get("/admin/categories", verifyRole, rolecheck("admin"), getAllCategories);

export default router;
