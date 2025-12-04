import Course from "../model/course.model.js";
import Batch from "../model/batch.model.js";
import Enrollment from "../model/enrollment.model.js";
import User from "../model/user.model.js";
import Assignment from "../model/assignment.model.js";

export const createCourse = async (data) => {
  return Course.create(data);
};

export const listCourses = async () => {
  return Course.find().sort({ createdAt: -1 });
};

export const listCoursesPaginated = async ({ page = 1, limit = 12, q = '', sort = '', category = '' } = {}) => {
  const filter = {};

  if (q && q.trim()) {
    const re = new RegExp(q.trim(), 'i');
    filter.$or = [
      { title: re },
      { instructor: re }
    ];
  }

  if (category && category.trim()) {
    // Course model stores optional category in metadata.category
    filter.$or = filter.$or || [];
    filter.$or.push({ 'metadata.category': category });
    filter.$or.push({ category });
  }

  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

  let sortObj = { createdAt: -1 };
  if (sort === 'price_asc') sortObj = { price: 1 };
  if (sort === 'price_desc') sortObj = { price: -1 };

  const [items, total] = await Promise.all([
    Course.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
    Course.countDocuments(filter)
  ]);

  return { items, total, page: Number(page), limit: Number(limit) };
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
  const enrolls = await Enrollment.find({ courseId }).sort({ createdAt: -1 });
  // attach basic user info
  return Promise.all(enrolls.map(async (e) => {
    const user = await User.findById(e.userId).select('name email phone').lean().catch(() => null);
    return { ...e.toObject(), user: user || { _id: e.userId, name: 'Unknown', email: '', phone: '' } };
  }));
};

export const getEnrollmentsByBatch = async (batchId) => {
  const enrolls = await Enrollment.find({ batchId }).sort({ createdAt: -1 });
  return Promise.all(enrolls.map(async (e) => {
    const user = await User.findById(e.userId).select('name email phone').lean().catch(() => null);
    return { ...e.toObject(), user: user || { _id: e.userId, name: 'Unknown', email: '', phone: '' } };
  }));
};

export const getAssignmentsByCourse = async (courseId) => {
  const items = await Assignment.find({ courseId }).sort({ submittedAt: -1 });
  return Promise.all(items.map(async (a) => {
    const user = await User.findById(a.userId).select('name email phone').lean().catch(() => null);
    return { ...a.toObject(), user: user || { _id: a.userId, name: 'Unknown', email: '', phone: '' } };
  }));
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
