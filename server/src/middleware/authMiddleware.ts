import { Request, Response, NextFunction } from 'express';
import { db } from '../db/database.js';
import { UserRole, UserAccount } from '../types/shared.js';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  profileId?: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// In-memory session store mapping active session token strings to UserAccount
const activeSessions = new Map<string, UserAccount>();

/**
 * Register an active session token for a user (called upon login/registration).
 */
export function registerSession(token: string, user: UserAccount): void {
  activeSessions.set(token, user);
}

/**
 * Invalidate a session token (called upon logout).
 */
export function revokeSession(token: string): void {
  activeSessions.delete(token);
}

/**
 * Resolve a UserAccount from a token, header, or identifier.
 */
export function resolveUserFromToken(rawToken: string): UserAccount | null {
  if (!rawToken || typeof rawToken !== 'string') {
    return null;
  }

  const token = rawToken.trim();
  if (!token) {
    return null;
  }

  // 1. Check in-memory session store
  if (activeSessions.has(token)) {
    return activeSessions.get(token)!;
  }

  // 2. Format: cb_session_<userId>_<timestamp>
  if (token.startsWith('cb_session_')) {
    const raw = token.slice('cb_session_'.length);
    const lastUnderscore = raw.lastIndexOf('_');
    const userId = lastUnderscore !== -1 ? raw.slice(0, lastUnderscore) : raw;
    const user = db.getUserById(userId);
    if (user) {
      activeSessions.set(token, user);
      return user;
    }
  }

  // 3. Direct user ID lookup
  const userById = db.getUserById(token);
  if (userById) {
    return userById;
  }

  // 4. Direct user email lookup
  const userByEmail = db.getUserByEmail(token);
  if (userByEmail) {
    return userByEmail;
  }

  return null;
}

/**
 * Extract token from request headers or query.
 */
function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7).trim();
    }
    return authHeader.trim();
  }

  const xSessionToken = req.headers['x-session-token'];
  if (typeof xSessionToken === 'string' && xSessionToken.trim()) {
    return xSessionToken.trim();
  }

  const xUserId = req.headers['x-user-id'];
  if (typeof xUserId === 'string' && xUserId.trim()) {
    return xUserId.trim();
  }

  if (typeof req.query.token === 'string' && req.query.token.trim()) {
    return req.query.token.trim();
  }

  if (typeof req.query.userId === 'string' && req.query.userId.trim()) {
    return req.query.userId.trim();
  }

  return null;
}

/**
 * Authentication middleware.
 * Verifies Authorization header or session token. Attaches req.user.
 * Returns 401 Unauthorized ({ error: 'Authentication required' }) if unauthenticated.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const user = resolveUserFromToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    role: user.role,
    profileId: user.profileId,
    name: user.name
  };

  next();
}

/**
 * Role-Based Access Control (RBAC) middleware factory.
 * Requires authenticate to run first or executes authentication check.
 * Validates allowedRoles.includes(req.user.role).
 * Returns 403 Forbidden ({ error: 'Insufficient role permissions' }) if unauthorized.
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient role permissions' });
    }

    next();
  };
}
