// Shared in-memory user store for demo purposes
// In production, replace this with a real database

import crypto from 'crypto';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  location?: string;
  createdAt: string;
}

const users: Record<string, UserProfile> = {};

// Password reset tokens (in-memory)
const resetTokens: Record<string, { email: string; expiresAt: number }> = {};

// Token expiry: 1 hour
const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

// Pre-seed demo user
users['demo@komoditas.com'] = {
  id: '1',
  name: 'Demo User',
  email: 'demo@komoditas.com',
  password: 'demo1234',
  role: 'pembeli',
  phone: '081234567890',
  location: 'Medan',
  createdAt: new Date().toISOString(),
};

export function getUserByEmail(email: string): UserProfile | undefined {
  return users[email.toLowerCase()];
}

export function createUser(data: Omit<UserProfile, 'id' | 'createdAt'>): UserProfile {
  const id = String(Object.keys(users).length + 1);
  const user: UserProfile = {
    ...data,
    email: data.email.toLowerCase(),
    id,
    createdAt: new Date().toISOString(),
  };
  users[user.email] = user;
  return user;
}

export function userExists(email: string): boolean {
  return !!users[email.toLowerCase()];
}

export function getAllUsers(): Record<string, UserProfile> {
  return users;
}

// --- Password Reset ---

/** Generate a reset token for the given email. Returns the raw token string. */
export function generateResetToken(email: string): string | null {
  const normalised = email.toLowerCase();
  if (!users[normalised]) return null;

  const token = crypto.randomBytes(32).toString('hex');
  resetTokens[token] = { email: normalised, expiresAt: Date.now() + TOKEN_EXPIRY_MS };
  return token;
}

/** Validate a reset token. Returns the associated email or null if invalid/expired. */
export function validateResetToken(token: string): string | null {
  const entry = resetTokens[token];
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    delete resetTokens[token];
    return null;
  }
  return entry.email;
}

/** Consumes the token and updates the user's password. Returns true on success. */
export function resetPassword(token: string, newPassword: string): boolean {
  const email = validateResetToken(token);
  if (!email) return false;

  users[email].password = newPassword;
  delete resetTokens[token];
  return true;
}

