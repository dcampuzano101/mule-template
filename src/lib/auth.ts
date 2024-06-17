import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (!existingUser) return null;

        const passwordMatch = credentials?.password === existingUser?.password;

        if (!passwordMatch) return null;

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          role: existingUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(`token: ${JSON.stringify(token)}`);
        return {
          ...token,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log(`session: ${JSON.stringify(session)}`);
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
        },
      };
    },
  },
};
