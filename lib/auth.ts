import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './db';
import { PrismaAdapter } from '@auth/prisma-adapter';

function createProfileSlug(fullName: string): string {
  if (!fullName) return '';
  const slug = fullName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return slug;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      if (profile && profile.name) {
        const slug = createProfileSlug(profile.name);

        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { slug: slug },
          });
        } catch (error) {
          console.error('Error updating user slug:', error);
          // Handle the error appropriately (e.g., log, show a message)
        }
      }

      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
};