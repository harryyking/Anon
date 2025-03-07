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
    async signIn({ user, profile, account }) {
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
           // Check if a user with the same email exists
          if (profile.email) {
            const emailUser = await prisma.user.findUnique({
              where: { email: profile.email },
            });

            if (emailUser && emailUser.id !== user.id) {
              // User with same email exists, link accounts
              await prisma.account.create({
                data: {
                  userId: emailUser.id,
                  type: account?.type!,
                  provider: account?.provider!,
                  providerAccountId: account?.providerAccountId!,
                  access_token: account?.access_token!,
                  expires_at: account?.expires_at,
                  id_token: account?.id_token,
                  refresh_token: account?.refresh_token,
                  scope: account?.scope,
                  session_state: account?.session_state,
                  token_type: account?.token_type,
                },
              });
              //update the user id of the account that was just created to the user id of the new user.
              await prisma.account.update({
                where: {
                  provider_providerAccountId: {
                    provider: account?.provider!,
                    providerAccountId: account?.providerAccountId!,
                  },
                },
                data: {
                  userId: user.id
                }
              })
            }
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