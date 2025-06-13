import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from './errorHandler';

export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('role')
    .isIn(['ADMIN', 'OWNER', 'BARBER', 'CLIENT'])
    .withMessage('Invalid role'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Invalid phone number format'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(errors.array()[0].msg, 400);
    }
    next();
  },
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(errors.array()[0].msg, 400);
    }
    next();
  },
];

export const validateEstablishmentRegister = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('phone')
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Invalid phone number format'),
  body('establishmentName')
    .notEmpty()
    .withMessage('Establishment name is required'),
  body('cnpj')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
    .withMessage('Invalid CNPJ format (XX.XXX.XXX/XXXX-XX)'),
  body('address')
    .notEmpty()
    .withMessage('Address is required'),
  body('establishmentPhone')
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Invalid establishment phone number format'),
  body('establishmentEmail')
    .isEmail()
    .withMessage('Please enter a valid establishment email address'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(errors.array()[0].msg, 400);
    }
    next();
  },
]; 