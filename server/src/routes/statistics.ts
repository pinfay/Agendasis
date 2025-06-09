import express from 'express';
import { prisma } from '../index';
import { checkRole } from '../middleware/auth';

const router = express.Router();

// Get owner dashboard statistics
router.get('/owner', checkRole(['OWNER']), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Get today's appointments
    const todayAppointments = await prisma.appointment.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    // Get monthly revenue
    const monthlyRevenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth
        }
      },
      _sum: {
        amount: true
      }
    });

    // Get total customers
    const totalCustomers = await prisma.user.count({
      where: {
        role: 'CLIENT'
      }
    });

    res.json({
      todayAppointments: {
        count: todayAppointments
      },
      monthlyRevenue: {
        total: monthlyRevenue._sum.amount || 0
      },
      totalCustomers: {
        count: totalCustomers
      }
    });
  } catch (error) {
    console.error('Error fetching owner statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get today's appointments
router.get('/appointments/today', checkRole(['OWNER', 'BARBER']), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await prisma.appointment.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    res.json({ count });
  } catch (error) {
    console.error('Error fetching today appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monthly revenue
router.get('/revenue/monthly', checkRole(['OWNER']), async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const revenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        createdAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth
        }
      },
      _sum: {
        amount: true
      }
    });

    res.json({ total: revenue._sum.amount || 0 });
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get total customers
router.get('/customers/total', checkRole(['OWNER']), async (req, res) => {
  try {
    const count = await prisma.user.count({
      where: {
        role: 'CLIENT'
      }
    });

    res.json({ count });
  } catch (error) {
    console.error('Error fetching total customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 