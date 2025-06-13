import { Request, Response } from 'express';

// Temporarily disabled appointment controller
export const createAppointment = async (_req: Request, res: Response) => {
  res.json({ message: 'Appointments temporarily disabled' });
};

export const getAllAppointments = async (_req: Request, res: Response) => {
  res.json({ message: 'Appointments temporarily disabled' });
};

export const updateAppointmentStatus = async (_req: Request, res: Response) => {
  res.json({ message: 'Appointments temporarily disabled' });
};

export const cancelAppointment = async (_req: Request, res: Response) => {
  res.json({ message: 'Appointments temporarily disabled' });
}; 