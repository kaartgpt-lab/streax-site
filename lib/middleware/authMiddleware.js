import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware to verify JWT token
 */
export const authenticateToken = (req) => {
  try {
   
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
      return { success: false, user: null, error: 'No token provided' };
    }

   
    const decoded = verifyToken(token);

    if (!decoded) {
      return { success: false, user: null, error: 'Invalid or expired token' };
    }

    return { success: true, user: decoded, error: null };
  } catch (error) {
    return { success: false, user: null, error: 'Token verification failed' };
  }
};


export const checkAdmin = (user) => {
  return user && user.role === 'admin';
};
