'use server';


import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

// 1. Send a Message (Visitors or Logged-in Users)
export async function sendMessage(recipientId: string, content: string) {
  
  const slug = await prisma.user.findUnique({
    where: {id: recipientId},
    select: {slug: true}
  })

  await prisma.message.create({
    data: {
      recipientId: recipientId,
      content,
    },
  });

  revalidatePath(`/${slug?.slug}`);
  }



// 2. Get Messages for a User
export async function getUserMessages(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.id !== userId) throw new Error('Unauthorized');

  const messages = await prisma.message.findMany({
    where: { recipientId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return messages;
}

// 3. Submit Personality Ratings (Logged-in Users Only)
export async function submitRating(
  rateeId: string,
  ratings: {
    adore: number;
    hilarious: number;
    wow: number;
    cool: number;
    warm: number;
    smart: number;
    chill: number;
    curious: number;
    awkward: number;
  }
) {
  const user = await prisma.user.findUnique({
    where: { id: rateeId },
    select: { slug: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Use upsert to either create or increment the rating counts
  await prisma.rating.upsert({
    where: { rateeId }, // One rating row per user
    update: {
      adore: { increment: ratings.adore },
      hilarious: { increment: ratings.hilarious },
      wow: { increment: ratings.wow },
      cool: { increment: ratings.cool },
      warm: { increment: ratings.warm },
      smart: { increment: ratings.smart },
      chill: { increment: ratings.chill },
      curious: { increment: ratings.curious },
      awkward: { increment: ratings.awkward },
    },
    create: {
      rateeId,
      ...ratings,
      createdAt: new Date(),
    },
  });

  revalidatePath(`/${user.slug}`);
}
// 4. Get Profile Data (Messages, Ratings, and Counts)
export async function getProfileData(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, theme: true, points: true, slug: true },
  });
  if (!profile) throw new Error("User not found");

  const rating = await prisma.rating.findUnique({
    where: { rateeId: userId },
    select: {
      adore: true,
      hilarious: true,
      wow: true,
      cool: true,
      warm: true,
      smart: true,
      chill: true,
      curious: true,
      awkward: true,
    }, 
  });

  const ratings = rating || {
    adore: 0,
    hilarious: 0,
    wow: 0,
    cool: 0,
    warm: 0,
    smart: 0,
    chill: 0,
    curious: 0,
    awkward: 0,
  };

  return {
    profile,
    ratings: {
      ...ratings,
      count: Object.values(ratings).reduce((sum, val) => sum + val, 0), // Total votes
    },
  };
}