import express, { Request, Response } from 'express';
import prisma from '../config/database';
import { checkRole } from '../middleware/auth';

const router = express.Router();

// Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        _count: {
          select: {
            appointments: true
          }
        }
      }
    });

    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get service by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointments: true
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create service (admin/owner only)
router.post('/', checkRole(['ADMIN', 'OWNER']), async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration,
        price
      }
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update service (admin/owner only)
router.put('/:id', checkRole(['ADMIN', 'OWNER']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        duration,
        price
      }
    });

    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete service (admin/owner only)
router.delete('/:id', checkRole(['ADMIN', 'OWNER']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if service has appointments
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointments: true
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (service._count.appointments > 0) {
      return res.status(400).json({ error: 'Cannot delete service with existing appointments' });
    }

    await prisma.service.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get popular services
router.get('/stats/popular', async (req, res) => {
  try {
    const popularServices = await prisma.service.findMany({
      take: 5,
      include: {
        _count: {
          select: {
            appointments: true
          }
        }
      },
      orderBy: {
        appointments: {
          _count: 'desc'
        }
      }
    });

    res.json(popularServices);
  } catch (error) {
    console.error('Error fetching popular services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 