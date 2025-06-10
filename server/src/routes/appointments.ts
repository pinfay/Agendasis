import express, { Request, Response } from 'express';
import prisma from '../config/database';
import { checkRole } from '../middleware/auth';
import { businessConfig } from '../config/business';

const router = express.Router();

// Helper function to validate appointment time
const validateAppointmentTime = (date: Date, duration: number) => {
  const hour = date.getHours();
  const { opening, closing } = businessConfig.hours;
  const endHour = date.getHours() + Math.ceil(duration / 60);

  if (hour < opening || endHour > closing) {
    return {
      valid: false,
      error: `Appointments are only available between ${opening}:00 and ${closing}:00`
    };
  }

  if (businessConfig.daysOff.includes(date.getDay())) {
    return {
      valid: false,
      error: 'Appointments are not available on this day'
    };
  }

  const now = new Date();
  const minutesUntilAppointment = (date.getTime() - now.getTime()) / (1000 * 60);
  
  if (minutesUntilAppointment < businessConfig.scheduling.minTimeBeforeAppointment) {
    return {
      valid: false,
      error: `Appointments must be made at least ${businessConfig.scheduling.minTimeBeforeAppointment} minutes in advance`
    };
  }

  const daysInAdvance = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (daysInAdvance > businessConfig.scheduling.maxDaysInAdvance) {
    return {
      valid: false,
      error: `Appointments can only be made up to ${businessConfig.scheduling.maxDaysInAdvance} days in advance`
    };
  }

  return { valid: true };
};

// Get all appointments (filtered by role)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user!;
    let where = {};

    // Filter appointments based on user role
    switch (role) {
      case 'CLIENT':
        where = { userId: id };
        break;
      case 'BARBER':
        where = { barberId: id };
        break;
      case 'ADMIN':
      case 'OWNER':
        // No filter, can see all appointments
        break;
      default:
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        barber: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            specialties: true
          }
        },
        service: true,
        payment: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        barber: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            specialties: true
          }
        },
        service: true,
        payment: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check if user has permission to view this appointment
    const { role, id: userId } = req.user!;
    if (
      role !== 'ADMIN' &&
      role !== 'OWNER' &&
      appointment.userId !== userId &&
      appointment.barberId !== userId
    ) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create appointment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { date, barberId, serviceId } = req.body;
    const userId = req.user!.id;

    // Check if barber exists
    const barber = await prisma.barber.findUnique({
      where: { id: barberId }
    });

    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    // Check if service exists and get duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Validate service duration
    if (service.duration < businessConfig.appointmentDuration.minDuration ||
        service.duration > businessConfig.appointmentDuration.maxDuration) {
      return res.status(400).json({
        error: `Service duration must be between ${businessConfig.appointmentDuration.minDuration} and ${businessConfig.appointmentDuration.maxDuration} minutes`
      });
    }

    const appointmentDate = new Date(date);
    
    // Validate appointment time
    const timeValidation = validateAppointmentTime(appointmentDate, service.duration);
    if (!timeValidation.valid) {
      return res.status(400).json({ error: timeValidation.error });
    }

    // Calculate end time based on service duration
    const endTime = new Date(appointmentDate.getTime() + service.duration * 60000);

    // Check if there are any overlapping appointments
    const overlappingAppointment = await prisma.appointment.findFirst({
      where: {
        barberId,
        status: { not: 'CANCELLED' },
        OR: [
          {
            // New appointment starts during an existing appointment
            AND: [
              { date: { lte: appointmentDate } },
              {
                date: {
                  gt: new Date(appointmentDate.getTime() - service.duration * 60000)
                }
              }
            ]
          },
          {
            // New appointment ends during an existing appointment
            AND: [
              { date: { gte: appointmentDate } },
              { date: { lt: endTime } }
            ]
          }
        ]
      }
    });

    if (overlappingAppointment) {
      return res.status(400).json({ 
        error: 'This time slot conflicts with another appointment' 
      });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        userId,
        barberId,
        serviceId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        barber: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            specialties: true
          }
        },
        service: true
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update appointment status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { role } = req.user!;

    // Only admin, owner, or barber can update status
    if (!['ADMIN', 'OWNER', 'BARBER'].includes(role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        barber: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            specialties: true
          }
        },
        service: true,
        payment: true
      }
    });

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel appointment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user!;

    // Get appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check permission
    if (role === 'CLIENT' && appointment.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update status to cancelled
    await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 