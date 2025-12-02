import { Router } from "express";
import StudentController from "../controller/student.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// All student routes require authentication
router.use(auth);

router.post("/enroll", StudentController.enroll);
router.get("/enrollments", StudentController.getEnrollments);
router.patch("/enrollments/:courseId/progress", StudentController.updateProgress);
router.post("/assignments", StudentController.submitAssignment);
router.post("/quizzes", StudentController.submitQuiz);

export default router;
