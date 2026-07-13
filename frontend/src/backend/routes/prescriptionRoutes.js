import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { upload, analyze, history, remove, getOne } from '../controllers/prescriptionController.js';
import auth from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  '/upload',
  auth,
  uploadMiddleware.single('prescription'),
  upload
);

router.post(
  '/analyze',
  auth,
  [
    body('prescriptionId').notEmpty().withMessage('Prescription ID is required'),
    handleValidationErrors,
  ],
  analyze
);

router.get('/history', auth, history);
router.get('/:id', auth, getOne);
router.delete('/:id', auth, remove);

export default router;
