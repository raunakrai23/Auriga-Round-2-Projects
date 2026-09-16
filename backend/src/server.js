import 'dotenv/config';
import express from 'express'; import mongoose from 'mongoose'; import cors from 'cors'; import morgan from 'morgan';
import authRoutes from './routes/auth.js'; import habitRoutes from './routes/habits.js'; import { notFound, errorHandler } from './middleware/errors.js';
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) { console.error('MONGODB_URI and JWT_SECRET must be configured in .env'); process.exit(1); }
const app = express(); app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); app.use(express.json({ limit: '20kb' })); app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ status: 'ok' })); app.use('/api/auth', authRoutes); app.use('/api/habits', habitRoutes); app.use(notFound); app.use(errorHandler);
mongoose.connect(process.env.MONGODB_URI).then(() => { app.listen(process.env.PORT || 5000, () => console.log(`API listening on ${process.env.PORT || 5000}`)); }).catch((err) => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
