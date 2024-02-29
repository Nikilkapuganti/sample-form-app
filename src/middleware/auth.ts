import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface for extending the Request type
interface AuthenticatedRequest extends Request {
  user?: JwtPayload | null; // or your user type
}

function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded:any) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Ensure decoded is not undefined before assigning to req.user
    req.user = decoded || null;
    next();
  });
}

export { authenticateJWT };