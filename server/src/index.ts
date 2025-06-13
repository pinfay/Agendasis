import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import userRoutes from './routes/users';
import appointmentRoutes from './routes/appointments';
import serviceRoutes from './routes/services';
import barberRoutes from './routes/barbers';
import reviewRoutes from './routes/reviews';
import paymentRoutes from './routes/payments';
import loyaltyRoutes from './routes/loyalty';
import notificationRoutes from './routes/notifications';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import prisma from './config/database';
import authRoutes from './routes/auth';
import feedbackRoutes from './routes/feedbacks';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

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

// Socket.IO middleware
io.use((socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Verify token and attach user data to socket
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
  console.log('Client connected:', socket.id);
  
  // Join user's room for private notifications
  if (socket.data.user?.userId) {
    socket.join(socket.data.user.userId);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
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
app.use('/api/notifications', authenticateToken, notificationRoutes);

// Error handling
app.use(errorHandler);

// Start server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export instances
export { prisma, io }; 