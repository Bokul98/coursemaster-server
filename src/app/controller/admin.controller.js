import * as AdminService from "../service/admin.service.js";

const AdminController = {
  createCourse: async (req, res) => {
    try {
      const doc = await AdminService.createCourse(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  listCourses: async (req, res) => {
    try {
      const docs = await AdminService.listCourses();
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getCourse: async (req, res) => {
    try {
      const doc = await AdminService.getCourse(req.params.id);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const doc = await AdminService.updateCourse(req.params.id, req.body);
      res.json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      await AdminService.deleteCourse(req.params.id);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Batches
  createBatch: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const doc = await AdminService.createBatch(courseId, req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  listBatches: async (req, res) => {
    try {
      const docs = await AdminService.listBatches(req.params.courseId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateBatch: async (req, res) => {
    try {
      const doc = await AdminService.updateBatch(req.params.id, req.body);
      res.json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteBatch: async (req, res) => {
    try {
      await AdminService.deleteBatch(req.params.id);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Enrollment views
  getEnrollmentsByCourse: async (req, res) => {
    try {
      const docs = await AdminService.getEnrollmentsByCourse(req.params.courseId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getEnrollmentsByBatch: async (req, res) => {
    try {
      const docs = await AdminService.getEnrollmentsByBatch(req.params.batchId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Assignments
  getAssignmentsByCourse: async (req, res) => {
    try {
      const docs = await AdminService.getAssignmentsByCourse(req.params.courseId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAssignmentsByUser: async (req, res) => {
    try {
      const docs = await AdminService.getAssignmentsByUser(req.params.userId);
      res.json(docs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
,
  getStats: async (req, res) => {
    try {
      const stats = await AdminService.getStats();
      res.json(stats);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
,
  uploadImage: async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) return res.status(400).json({ error: 'image (base64) is required' });
      const url = await AdminService.uploadImageToImgBB(image);
      if (!url) return res.status(500).json({ error: 'Upload failed' });
      res.json({ url });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

export default AdminController;
