import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

// In-memory user store (demo)
const users: Record<string, { id: string; name: string; email: string; password: string; role: string }> = {};

// Pre-seed demo user
users['demo@komoditas.com'] = {
  id: '1',
  name: 'Demo User',
  email: 'demo@komoditas.com',
  password: 'demo1234',
  role: 'pembeli',
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'nama@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users[credentials.email.toLowerCase()];
        
        // Auto-register if user doesn't exist (demo mode)
        if (!user) {
          users[credentials.email.toLowerCase()] = {
            id: String(Object.keys(users).length + 1),
            name: credentials.email.split('@')[0],
            email: credentials.email.toLowerCase(),
            password: credentials.password,
            role: 'pembeli',
          };
          const newUser = users[credentials.email.toLowerCase()];
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          };
        }

        // Plain-text comparison for demo
        if (user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      // Auto-register OAuth users (Google, GitHub) into in-memory store
      if (user?.email && !users[user.email]) {
        users[user.email] = {
          id: user.id ?? String(Object.keys(users).length + 1),
          name: user.name ?? user.email.split('@')[0],
          email: user.email,
          password: '',
          role: 'pembeli',
        };
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const fullUser = users[user.email ?? ''];
        if (fullUser) {
          token.role = fullUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'komoditas-sumut-secret-key-2026',
});

export { handler as GET, handler as POST };