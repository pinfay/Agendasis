import { User as PrismaUser, UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends Omit<PrismaUser, 'password'> {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}

export {}; 