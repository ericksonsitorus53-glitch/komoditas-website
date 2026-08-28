// Shared in-memory user store for demo purposes
// In production, replace this with a real database

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
