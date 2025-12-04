import { Router } from "express";
import * as AdminService from "../service/admin.service.js";

const router = Router();

// Public courses listing (supports pagination, search, sort, category)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, q = '', sort = '', category = '' } = req.query;
    const data = await AdminService.listCoursesPaginated({ page, limit, q, sort, category });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await AdminService.getCourse(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
