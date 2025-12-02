import Enrollment from "../model/enrollment.model.js";
import Assignment from "../model/assignment.model.js";
import Quiz from "../model/quiz.model.js";

export const enroll = async (userId, courseId) => {
  const exists = await Enrollment.findOne({ userId, courseId });
  if (exists) return exists;
  return Enrollment.create({ userId, courseId });
};

export const getEnrollments = async (userId) => {
  return Enrollment.find({ userId }).sort({ createdAt: -1 });
};

export const updateProgress = async (userId, courseId, progress, lessonsCompleted = []) => {
  return Enrollment.findOneAndUpdate(
    { userId, courseId },
    { $set: { progress, lessonsCompleted } },
    { new: true, upsert: true }
  );
};

export const submitAssignment = async (userId, courseId, content, moduleId = null, lessonId = null) => {
  return Assignment.create({ userId, courseId, content, moduleId, lessonId });
};

export const submitQuiz = async (userId, courseId, score, total, moduleId = null, lessonId = null) => {
  return Quiz.create({ userId, courseId, score, total, moduleId, lessonId });
};
