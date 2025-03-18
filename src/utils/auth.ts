import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const API_KEY = process.env.API_KEY || 'your-api-key-here';

/**
 * Middleware to authenticate requests using API key
 */
export const authenticateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({ error: 'Unauthorized - Invalid API key' });
    return;
  }

  next();
};

export default authenticateApiKey; 