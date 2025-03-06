import {NextAuthOptions} from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import prisma from './db'
import {PrismaAdapter} from '@auth/prisma-adapter'




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
  
          return true;
          },

      
          // Optionally, you can add the session callback to pass more info to the client
          async session({ session, user }) {
            // Add user info to the session object
            session.user.id = user.id;
            return session;
          },
          
          


        },
        pages: {
          signIn: '/auth/signin',
          verifyRequest: '/auth/verify'
        }
    
}