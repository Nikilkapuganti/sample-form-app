
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Unauthorized - Token not provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, '1233433') as { id: string; role: string };

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
