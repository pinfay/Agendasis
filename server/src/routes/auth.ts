import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { authenticateToken } from '../middleware/auth';
import { validateRegister, validateLogin, validateEstablishmentRegister } from '../middleware/validation';
import * as bcrypt from 'bcrypt';

const router = Router();

// Register new user
router.post('/register', validateRegister, async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'CLIENT',
        phone
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Register establishment (admin/owner)
router.post('/register/establishment', validateEstablishmentRegister, async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phone,
      establishmentName,
      cnpj,
      address,
      establishmentPhone,
      establishmentEmail
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if establishment already exists
    const existingEstablishment = await prisma.establishment.findUnique({
      where: { cnpj }
    });

    if (existingEstablishment) {
      return res.status(400).json({ message: 'Establishment already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and establishment in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create owner user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: 'OWNER',
          phone
        }
      });

      // Create establishment
      const establishment = await prisma.establishment.create({
        data: {
          name: establishmentName,
          cnpj,
          address,
          phone: establishmentPhone,
          email: establishmentEmail,
          ownerId: user.id
        }
      });

      return { user, establishment };
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: result.user.id,
        email: result.user.email,
        role: result.user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role,
        phone: result.user.phone
      },
      establishment: {
        id: result.establishment.id,
        name: result.establishment.name,
        cnpj: result.establishment.cnpj
      }
    });
  } catch (error) {
    console.error('Error in establishment register:', error);
    res.status(500).json({ message: 'Error creating establishment' });
  }
});

// Login
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        loyaltyPoints: user.loyaltyPoints
      }
    });
  } catch (error) {
    console.error('Error in get me:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

export default router; 