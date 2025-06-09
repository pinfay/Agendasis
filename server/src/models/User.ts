import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../config/database';

type UserRole = 'ADMIN' | 'OWNER' | 'BARBER' | 'CLIENT';

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  phone?: string;
}

export interface UserUpdate {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  loyaltyPoints: number;
}

interface UserWithPassword extends User {
  password: string;
}

export class UserService {
  static async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user as UserWithPassword;
    return userWithoutPassword;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user as UserWithPassword;
    return userWithoutPassword;
  }

  static async create(data: UserCreate): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role || 'CLIENT'
      }
    });
    const { password, ...userWithoutPassword } = user as UserWithPassword;
    return userWithoutPassword;
  }

  static async update(id: string, data: UserUpdate): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data
    });
    const { password, ...userWithoutPassword } = user as UserWithPassword;
    return userWithoutPassword;
  }

  static async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }

  static async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  static async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });
  }

  static async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((user: UserWithPassword) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static async findByRole(role: UserRole): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { role }
    });
    return users.map((user: UserWithPassword) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static async updateLoyaltyPoints(id: string, points: number): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        loyaltyPoints: {
          increment: points
        }
      }
    });
    const { password, ...userWithoutPassword } = user as UserWithPassword;
    return userWithoutPassword;
  }
} 