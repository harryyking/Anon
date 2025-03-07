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
    async signIn({ user, profile }) {
      if (profile && profile.name && profile.email) {
        const slug = createProfileSlug(profile.name);

        // Update the user's slug if it doesn’t exist or has changed
        await prisma.user.update({
          where: { id: user.id },
          data: { slug },
        }).catch((error) => {
          // If the user doesn’t exist yet, the adapter will create it
          console.error('Error updating slug:', error);
        });
      } else {
        console.error('Profile name or email missing.');
      }

      return true; // Allow the sign-in to proceed
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