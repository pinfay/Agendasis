import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Listar pagamentos do usuário
router.get('/my-payments', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const payments = await prisma.payment.findMany({
      where: {
        appointment: {
          userId
        }
      },
      include: {
        appointment: {
          include: {
            service: true,
            barber: true
          }
        }
      }
    });
    res.json(payments);
  } catch (error) {
    console.error('Erro ao listar pagamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
});

// Criar novo pagamento
router.post('/create-payment', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const userId = (req as any).user.id;

    // Verificar se o agendamento existe e pertence ao usuário
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ error: 'Este agendamento não pertence a você' });
    }

    // Verificar se já existe um pagamento para este agendamento
    const existingPayment = await prisma.payment.findUnique({
      where: { appointmentId }
    });

    if (existingPayment) {
      return res.status(400).json({ error: 'Já existe um pagamento para este agendamento' });
    }

    // Criar o pagamento
    const payment = await prisma.payment.create({
      data: {
        amount: appointment.service.price,
        status: 'PENDING',
        appointmentId
      },
      include: {
        appointment: {
          include: {
            service: true,
            barber: true
          }
        }
      }
    });

    // Aqui você pode adicionar a integração com um gateway de pagamento
    // Por exemplo: Stripe, PayPal, etc.

    res.status(201).json(payment);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

// Webhook para atualização de status do pagamento
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { paymentId, status } = req.body;

    // Aqui você deve validar a autenticidade do webhook
    // usando uma chave secreta fornecida pelo gateway de pagamento

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status },
      include: {
        appointment: true
      }
    });

    // Se o pagamento foi confirmado, atualizar o status do agendamento
    if (status === 'PAID') {
      await prisma.appointment.update({
        where: { id: payment.appointmentId },
        data: { status: 'CONFIRMED' }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erro no webhook de pagamento:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

// Buscar detalhes de um pagamento específico
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const user = (req as any).user;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        appointment: {
          include: {
            service: true,
            barber: true,
            user: true
          }
        }
      }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }

    // Verificar se o usuário tem permissão para ver este pagamento
    if (payment.appointment.userId !== userId && user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Você não tem permissão para ver este pagamento' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({ error: 'Erro ao buscar pagamento' });
  }
});

// Cancelar pagamento (apenas admin)
router.post('/:id/cancel', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Apenas administradores podem cancelar pagamentos' });
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: { status: 'FAILED' },
      include: {
        appointment: true
      }
    });

    // Atualizar o status do agendamento
    await prisma.appointment.update({
      where: { id: payment.appointmentId },
      data: { status: 'CANCELLED' }
    });

    res.json(payment);
  } catch (error) {
    console.error('Erro ao cancelar pagamento:', error);
    res.status(500).json({ error: 'Erro ao cancelar pagamento' });
  }
});

export default router; 