import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './db';
import { PrismaAdapter } from '@auth/prisma-adapter';

function createProfileSlug(fullName: string): string {
  if (!fullName) return '';
  return fullName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
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
    async signIn() {

      return true; // Allow the sign-in to proceed
    },

    async session({ session, user }) {

      const slug = createProfileSlug(user.name!);
      await prisma.user.update({
        where: { id: user.id },
        data: { slug },
      }).catch((error) => {
        console.error('Error updating slug:', error);
      });


      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
};