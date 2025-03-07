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
          // Check if the user exists
          const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          if (existingUser) {
            // User exists, update slug
            await prisma.user.update({
              where: { id: user.id },
              data: { slug: slug },
            });
          } else {
            // User does not exist, create user with slug
             await prisma.user.create({
                data: {
                  id: user.id, // Ensure you include the id
                  name: profile.name,
                  email: profile.email!,
                  image: profile.image,
                  slug: slug,
                },
              });
          }
        } catch (error) {
          console.error('Error handling user slug:', error);
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