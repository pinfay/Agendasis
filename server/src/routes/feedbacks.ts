import express, { Request, Response } from 'express';
import prisma from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Create feedback
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { message, type, rating } = req.body;
    const userId = req.user!.id;

    const feedback = await prisma.feedback.create({
      data: {
        message,
        type,
        rating,
        userId
      }
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all feedbacks (admin/owner only)
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!['ADMIN', 'OWNER'].includes(req.user!.role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const feedbacks = await prisma.feedback.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's feedbacks
router.get('/my', authenticateToken, async (req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        userId: req.user!.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching user feedbacks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update feedback
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message, type, rating } = req.body;

    const feedback = await prisma.feedback.findUnique({
      where: { id }
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const user = req.user!;
    if (feedback.userId !== user.id && !['ADMIN', 'OWNER'].includes(user.role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: {
        message,
        type,
        rating
      }
    });

    res.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete feedback
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findUnique({
      where: { id }
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const user = req.user!;
    if (feedback.userId !== user.id && !['ADMIN', 'OWNER'].includes(user.role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.feedback.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 