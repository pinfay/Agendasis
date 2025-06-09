import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Listar todos os barbeiros
router.get('/', async (req: Request, res: Response) => {
  try {
    const barbers = await prisma.barber.findMany({
      include: {
        appointments: true,
        reviews: true
      }
    });
    res.json(barbers);
  } catch (error) {
    console.error('Erro ao listar barbeiros:', error);
    res.status(500).json({ error: 'Erro ao buscar barbeiros' });
  }
});

// Buscar barbeiro por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const barber = await prisma.barber.findUnique({
      where: { id },
      include: {
        appointments: true,
        reviews: true
      }
    });
    
    if (!barber) {
      return res.status(404).json({ error: 'Barbeiro não encontrado' });
    }
    
    res.json(barber);
  } catch (error) {
    console.error('Erro ao buscar barbeiro:', error);
    res.status(500).json({ error: 'Erro ao buscar barbeiro' });
  }
});

// Criar novo barbeiro (requer autenticação de admin)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, specialties } = req.body;
    
    // Verificar se o usuário é admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    // Verificar se o email já está em uso
    const existingBarber = await prisma.barber.findUnique({
      where: { email }
    });

    if (existingBarber) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const barber = await prisma.barber.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        specialties
      }
    });
    
    res.status(201).json(barber);
  } catch (error) {
    console.error('Erro ao criar barbeiro:', error);
    res.status(500).json({ error: 'Erro ao criar barbeiro' });
  }
});

// Atualizar barbeiro (requer autenticação de admin)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, specialties } = req.body;
    
    // Verificar se o usuário é admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const barber = await prisma.barber.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        specialties
      }
    });
    
    res.json(barber);
  } catch (error) {
    console.error('Erro ao atualizar barbeiro:', error);
    res.status(500).json({ error: 'Erro ao atualizar barbeiro' });
  }
});

// Deletar barbeiro (requer autenticação de admin)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário é admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await prisma.barber.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar barbeiro:', error);
    res.status(500).json({ error: 'Erro ao deletar barbeiro' });
  }
});

export default router; 