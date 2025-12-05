import { Router } from "express";
import AdminController from "../controller/admin.controller.js";
import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = Router();

// Protect all admin routes
router.use(auth);
router.use(allowRoles('admin'));

// Image upload (base64) -> imgbb (server uses IMGBB_API_KEY in env)
router.post('/upload-image', AdminController.uploadImage);

// Courses CRUD
router.post('/courses', AdminController.createCourse);
router.get('/courses', AdminController.listCourses);
router.get('/courses/:id', AdminController.getCourse);
router.patch('/courses/:id', AdminController.updateCourse);
router.delete('/courses/:id', AdminController.deleteCourse);

// Stats
router.get('/stats', AdminController.getStats);

// Batches under a course
router.post('/courses/:courseId/batches', AdminController.createBatch);
router.get('/courses/:courseId/batches', AdminController.listBatches);
router.patch('/batches/:id', AdminController.updateBatch);
router.delete('/batches/:id', AdminController.deleteBatch);

// Enrollment views
router.get('/courses/:courseId/enrollments', AdminController.getEnrollmentsByCourse);
router.get('/batches/:batchId/enrollments', AdminController.getEnrollmentsByBatch);
// Global enrollment listing
router.get('/enrollments', AdminController.listAllEnrollments);

// Assignments review
router.get('/courses/:courseId/assignments', AdminController.getAssignmentsByCourse);
router.get('/users/:userId/assignments', AdminController.getAssignmentsByUser);
// Global assignments listing
router.get('/assignments', AdminController.listAllAssignments);

// Global batches listing
router.get('/batches', AdminController.listAllBatches);

export default router;
