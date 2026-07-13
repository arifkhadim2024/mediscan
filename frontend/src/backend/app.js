import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { sendSuccess } from './utils/apiResponse.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

const uploadStaticDir = process.env.VERCEL
  ? path.join(os.tmpdir(), 'uploads')
  : path.join(__dirname, 'uploads');

app.use('/uploads', express.static(uploadStaticDir));

app.get('/health', (req, res) => {
  sendSuccess(res, 'MediScan API is healthy', { status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/medicine', medicineRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    errors: ['The requested resource does not exist'],
  });
});

app.use(errorHandler);

export default app;
