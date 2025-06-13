import { Request, Response } from 'express';
import prisma from '../config/database';
import { io } from '../index';

interface NotificationData {
  id: string;
  type: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
}

// Create notification
export const createNotification = async (
  userId: string,
  type: string,
  message: string
): Promise<NotificationData> => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        message
      }
    });

    // Emit real-time notification
    io.to(userId).emit('newNotification', notification);

    return notification;
  } catch (error) {
    console.error('Create notification error:', error);
    throw error;
  }
};

// Get user notifications
export const getUserNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;

    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req.user as any).userId;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification || notification.userId !== userId) {
      res.status(404).json({ message: 'Notification not found or unauthorized' });
      return;
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true }
    });

    res.json(updatedNotification);
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;

    await prisma.notification.updateMany({
      where: {
        userId,
        read: false
      },
      data: {
        read: true
      }
    });

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete notification
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req.user as any).userId;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification || notification.userId !== userId) {
      res.status(404).json({ message: 'Notification not found or unauthorized' });
      return;
    }

    await prisma.notification.delete({
      where: { id }
    });

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 