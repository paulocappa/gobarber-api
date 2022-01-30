import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const token = authHeader.split(' ').pop();

  try {
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;

    req.user_id = decoded.sub;

    next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
