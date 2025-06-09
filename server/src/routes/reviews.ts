import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Listar todas as avaliações
router.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        barber: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

// Buscar avaliações por barbeiro
router.get('/barber/:barberId', async (req: Request, res: Response) => {
  try {
    const { barberId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { barberId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Erro ao buscar avaliações do barbeiro:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

// Criar nova avaliação (requer autenticação)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { barberId, rating, comment } = req.body;
    const userId = (req as any).user.id;

    // Verificar se o barbeiro existe
    const barber = await prisma.barber.findUnique({
      where: { id: barberId }
    });

    if (!barber) {
      return res.status(404).json({ error: 'Barbeiro não encontrado' });
    }

    // Verificar se o usuário já avaliou este barbeiro
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        barberId
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'Você já avaliou este barbeiro' });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        barberId
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
});

// Atualizar avaliação (requer autenticação)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = (req as any).user.id;

    // Verificar se a avaliação existe e pertence ao usuário
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    if (existingReview.userId !== userId) {
      return res.status(403).json({ error: 'Você não pode editar esta avaliação' });
    }

    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    res.json(review);
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
});

// Deletar avaliação (requer autenticação)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const user = (req as any).user;

    // Verificar se a avaliação existe
    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    // Permitir que o próprio usuário ou um admin delete a avaliação
    if (review.userId !== userId && user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Você não pode deletar esta avaliação' });
    }

    await prisma.review.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
});

export default router; 