import jwt from 'jsonwebtoken';

export function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'change_this_secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}
