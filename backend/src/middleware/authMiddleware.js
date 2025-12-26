import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

export async function requireAuth(req, res, next) {
  const token = req.cookies?.token || '';
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    // Attach minimal user info and verify user exists
    const user = await prisma.user.findUnique({ where: { id: payload.id }, select: { id: true, email: true, name: true, createdAt: true } });
    if (!user) return res.status(401).json({ error: 'User no longer exists' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
