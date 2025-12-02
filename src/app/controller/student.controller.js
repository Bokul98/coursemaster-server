import * as StudentService from "../service/student.service.js";

const StudentController = {
  enroll: async (req, res) => {
    try {
      const userId = req.user.id;
      const { courseId } = req.body;
      if (!courseId) return res.status(400).json({ error: "courseId is required" });
      const doc = await StudentService.enroll(userId, courseId);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getEnrollments: async (req, res) => {
    try {
      const userId = req.user.id;
      const docs = await StudentService.getEnrollments(userId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const userId = req.user.id;
      const { courseId } = req.params;
      const { progress, lessonsCompleted } = req.body;
      if (typeof progress !== 'number') return res.status(400).json({ error: 'progress must be a number' });
      const doc = await StudentService.updateProgress(userId, courseId, progress, lessonsCompleted || []);
      res.json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  submitAssignment: async (req, res) => {
    try {
      const userId = req.user.id;
      const { courseId, content } = req.body;
      if (!courseId || !content) return res.status(400).json({ error: 'courseId and content are required' });
      const doc = await StudentService.submitAssignment(userId, courseId, content);
      res.status(201).json({ message: 'Assignment submitted', doc });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  submitQuiz: async (req, res) => {
    try {
      const userId = req.user.id;
      const { courseId, score, total } = req.body;
      if (!courseId || typeof score !== 'number' || typeof total !== 'number') return res.status(400).json({ error: 'courseId, score and total are required' });
      const doc = await StudentService.submitQuiz(userId, courseId, score, total);
      res.status(201).json({ message: 'Quiz submitted', doc });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

export default StudentController;
