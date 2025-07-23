import { Request, Response, NextFunction } from "express";
import { CONFIG } from "../config/config";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || !apiKey.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = apiKey.split(' ')[1]; // Extract API key token

  if (token !== CONFIG.API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  next();
}
