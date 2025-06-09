import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Constantes do programa de fidelidade
const POINTS_PER_APPOINTMENT = 10;
const POINTS_FOR_DISCOUNT = 100;
const DISCOUNT_AMOUNT = 20; // 20% de desconto

// Consultar pontos do usuário
router.get('/points', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        loyaltyPoints: true,
        firstName: true,
        lastName: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Calcular quantos descontos o usuário pode resgatar
    const availableDiscounts = Math.floor(user.loyaltyPoints / POINTS_FOR_DISCOUNT);

    res.json({
      points: user.loyaltyPoints,
      availableDiscounts,
      pointsForNextDiscount: POINTS_FOR_DISCOUNT - (user.loyaltyPoints % POINTS_FOR_DISCOUNT),
      discountAmount: DISCOUNT_AMOUNT
    });
  } catch (error) {
    console.error('Erro ao consultar pontos:', error);
    res.status(500).json({ error: 'Erro ao consultar pontos' });
  }
});

// Adicionar pontos após um agendamento concluído
router.post('/add-points', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const userId = (req as any).user.id;
    const user = (req as any).user;

    // Apenas admins podem adicionar pontos
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Apenas administradores podem adicionar pontos' });
    }

    // Verificar se o agendamento existe e está concluído
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { user: true }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    if (appointment.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Agendamento não está concluído' });
    }

    // Adicionar pontos ao usuário
    const updatedUser = await prisma.user.update({
      where: { id: appointment.userId },
      data: {
        loyaltyPoints: {
          increment: POINTS_PER_APPOINTMENT
        }
      }
    });

    res.json({
      message: `${POINTS_PER_APPOINTMENT} pontos adicionados com sucesso`,
      newTotal: updatedUser.loyaltyPoints
    });
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error);
    res.status(500).json({ error: 'Erro ao adicionar pontos' });
  }
});

// Resgatar pontos para desconto
router.post('/redeem', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const userId = (req as any).user.id;

    // Verificar se o usuário tem pontos suficientes
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user.loyaltyPoints < POINTS_FOR_DISCOUNT) {
      return res.status(400).json({ 
        error: 'Pontos insuficientes',
        required: POINTS_FOR_DISCOUNT,
        current: user.loyaltyPoints
      });
    }

    // Verificar se o agendamento existe e pertence ao usuário
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: true,
        payment: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ error: 'Este agendamento não pertence a você' });
    }

    if (appointment.status !== 'PENDING') {
      return res.status(400).json({ error: 'Desconto só pode ser aplicado em agendamentos pendentes' });
    }

    // Calcular o desconto
    const originalPrice = appointment.service.price;
    const discountAmount = (originalPrice * DISCOUNT_AMOUNT) / 100;
    const finalPrice = originalPrice - discountAmount;

    // Atualizar o pagamento com o desconto
    await prisma.payment.update({
      where: { appointmentId },
      data: {
        amount: finalPrice
      }
    });

    // Deduzir os pontos do usuário
    await prisma.user.update({
      where: { id: userId },
      data: {
        loyaltyPoints: {
          decrement: POINTS_FOR_DISCOUNT
        }
      }
    });

    res.json({
      message: 'Desconto aplicado com sucesso',
      originalPrice,
      discount: discountAmount,
      finalPrice,
      pointsUsed: POINTS_FOR_DISCOUNT
    });
  } catch (error) {
    console.error('Erro ao resgatar pontos:', error);
    res.status(500).json({ error: 'Erro ao resgatar pontos' });
  }
});

// Histórico de pontos do usuário
router.get('/history', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        status: 'COMPLETED'
      },
      select: {
        id: true,
        date: true,
        service: {
          select: {
            name: true,
            price: true
          }
        },
        barber: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    interface AppointmentHistory {
      id: string;
      date: Date;
      service: {
        name: string;
        price: number;
      };
      barber: {
        firstName: string;
        lastName: string;
      };
    }

    const pointsHistory = appointments.map((appointment: AppointmentHistory) => ({
      ...appointment,
      pointsEarned: POINTS_PER_APPOINTMENT
    }));

    res.json(pointsHistory);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico de pontos' });
  }
});

export default router; 