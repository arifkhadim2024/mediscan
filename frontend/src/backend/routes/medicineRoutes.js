import express from 'express';
import { prices } from '../controllers/prescriptionController.js';

const router = express.Router();

router.get('/prices', prices);

export default router;
