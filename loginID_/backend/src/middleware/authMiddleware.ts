// src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types/express/index';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // ✅ Now always defined for protected routes
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
