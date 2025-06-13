import { Request, Response } from 'express';
import prisma from '../config/database';

// Create service (admin only)
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration: parseInt(duration),
        price: parseFloat(price)
      }
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        appointments: {
          where: {
            date: {
              gte: new Date()
            }
          },
          include: {
            barber: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update service (admin only)
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        duration: duration ? parseInt(duration) : undefined,
        price: price ? parseFloat(price) : undefined
      }
    });

    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete service (admin only)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if service has any future appointments
    const futureAppointments = await prisma.appointment.findFirst({
      where: {
        serviceId: id,
        date: {
          gte: new Date()
        }
      }
    });

    if (futureAppointments) {
      return res.status(400).json({ 
        message: 'Cannot delete service with future appointments' 
      });
    }

    await prisma.service.delete({
      where: { id }
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 