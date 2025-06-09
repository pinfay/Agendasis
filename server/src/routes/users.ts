import express, { Request, Response } from 'express';
import prisma from '../config/database';
import { checkRole } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import { validateRegister, validateLogin } from '../middleware/validation';

const router = express.Router();

// Get all users (admin/owner only)
router.get('/', checkRole(['ADMIN', 'OWNER']), async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        createdAt: true,
        loyaltyPoints: true,
        _count: {
          select: {
            appointments: true,
            reviews: true
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user has permission to view this profile
    if (req.user?.id !== id && !['ADMIN', 'OWNER'].includes(req.user?.role || '')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        createdAt: true,
        loyaltyPoints: true,
        _count: {
          select: {
            appointments: true,
            reviews: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, email, role } = req.body;

    // Check if user has permission to update this profile
    if (req.user?.id !== id && !['ADMIN', 'OWNER'].includes(req.user?.role || '')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // If trying to change role, must be admin/owner
    if (role && !['ADMIN', 'OWNER'].includes(req.user?.role || '')) {
      return res.status(403).json({ error: 'Unauthorized to change role' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phone,
        email,
        role: role as any // Only applied if user is admin/owner
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        createdAt: true,
        loyaltyPoints: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', checkRole(['ADMIN', 'OWNER']), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rotas de usuário serão implementadas aqui
router.post('/register', validateRegister, async (req: Request, res: Response) => {
  // Implementação do registro
});

router.post('/login', validateLogin, async (req: Request, res: Response) => {
  // Implementação do login
});

export default router; 