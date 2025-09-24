import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/default';
import { ITokenUser } from '../types';

const JWT_SECRET = config.jwtSecret

export interface AuthRequest extends Request {
  user: ITokenUser;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: missing token' });
    }
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = { id: payload.id, email: payload.email, name: payload.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: invalid token' });
  }
}
