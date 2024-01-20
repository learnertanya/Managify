import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a new interface that extends the existing Request interface
interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with the type of your user object if available
}

export const loginCheck = (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
  const token = request.header('Authorization')?.split(' ')[1];

  if (!token) {
    response.status(401).json({ error: 'Unauthorized - Please log in to give a review' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
    // Attach the decoded user data to the request
    request.user = decodedToken;
    next();
  } catch (error) {
    response.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
