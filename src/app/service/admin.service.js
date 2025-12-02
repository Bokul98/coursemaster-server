import Course from "../model/course.model.js";
import Batch from "../model/batch.model.js";
import Enrollment from "../model/enrollment.model.js";
import Assignment from "../model/assignment.model.js";

export const createCourse = async (data) => {
  return Course.create(data);
};

export const listCourses = async () => {
  return Course.find().sort({ createdAt: -1 });
};

export const getCourse = async (id) => {
  return Course.findById(id);
};

export const updateCourse = async (id, data) => {
  return Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id) => {
  return Course.findByIdAndDelete(id);
};

// Batches
export const createBatch = async (courseId, data) => {
  return Batch.create({ courseId, ...data });
};

export const listBatches = async (courseId) => {
  return Batch.find({ courseId }).sort({ startDate: 1 });
};

export const updateBatch = async (id, data) => {
  return Batch.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBatch = async (id) => {
  return Batch.findByIdAndDelete(id);
};

// Enrollment & assignment views
export const getEnrollmentsByCourse = async (courseId) => {
  return Enrollment.find({ courseId }).sort({ createdAt: -1 });
};

export const getEnrollmentsByBatch = async (batchId) => {
  return Enrollment.find({ batchId }).sort({ createdAt: -1 });
};

export const getAssignmentsByCourse = async (courseId) => {
  return Assignment.find({ courseId }).sort({ submittedAt: -1 });
};

export const getAssignmentsByUser = async (userId) => {
  return Assignment.find({ userId }).sort({ submittedAt: -1 });
};

export const getStats = async () => {
  const courses = await Course.countDocuments();
  const enrollments = await Enrollment.countDocuments();
  const assignments = await Assignment.countDocuments();
  return { courses, enrollments, assignments };
};
