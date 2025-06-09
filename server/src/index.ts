import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import userRoutes from './routes/users';
import appointmentRoutes from './routes/appointments';
import serviceRoutes from './routes/services';
import barberRoutes from './routes/barbers';
import reviewRoutes from './routes/reviews';
import paymentRoutes from './routes/payments';
import loyaltyRoutes from './routes/loyalty';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import prisma from './config/database';
import authRoutes from './routes/auth';
import feedbackRoutes from './routes/feedbacks';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/loyalty', authenticateToken, loyaltyRoutes);
app.use('/api/feedbacks', authenticateToken, feedbackRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export prisma instance
export { prisma }; 