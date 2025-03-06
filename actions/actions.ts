'use server';


import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

// 1. Send a Message (Visitors or Logged-in Users)
export async function sendMessage(recipientId: string, content: string) {
  const session = await getServerSession(authOptions); // Optional sender
  const senderId = session?.user.id;

  await prisma.message.create({
    data: {
      senderId, // Null if not logged in
      recipientId,
      content,
    },
  });

  // Award points: 1 to sender (if logged in) and recipient
  if (senderId) {
    await prisma.user.update({
      where: { id: senderId },
      data: { points: { increment: 1 } },
    });
  }
  await prisma.user.update({
    where: { id: recipientId },
    data: { points: { increment: 1 } },
  });

  revalidatePath(`/profile/${recipientId}`);
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
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');

  const raterId = session.user.id;
  if (raterId === rateeId) throw new Error('Cannot rate yourself');

  await prisma.rating.upsert({
    where: { raterId_rateeId: { raterId, rateeId } },
    update: ratings,
    create: {
      raterId,
      rateeId,
      ...ratings,
    },
  });

  revalidatePath(`/profile/${rateeId}`);
}

// 4. Get Profile Data (Messages, Ratings, and Counts)
export async function getProfileData(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, theme: true, points: true },
  });
  if (!profile) throw new Error('User not found');

  const session = await getServerSession(authOptions);
  const isOwnProfile = session?.user.id === userId;

  const messages = isOwnProfile
    ? await prisma.message.findMany({
        where: { recipientId: userId },
        orderBy: { createdAt: 'desc' },
      })
    : [];

  const ratings = await prisma.rating.findMany({
    where: { rateeId: userId },
  });
  const count = ratings.length;
  const averages = count > 0 ? {
    adore: (ratings.reduce((sum, r) => sum + r.adore, 0) / count).toFixed(1),
    hilarious: (ratings.reduce((sum, r) => sum + r.hilarious, 0) / count).toFixed(1),
    wow: (ratings.reduce((sum, r) => sum + r.wow, 0) / count).toFixed(1),
    cool: (ratings.reduce((sum, r) => sum + r.cool, 0) / count).toFixed(1),
    warm: (ratings.reduce((sum, r) => sum + r.warm, 0) / count).toFixed(1),
    smart: (ratings.reduce((sum, r) => sum + r.smart, 0) / count).toFixed(1),
    chill: (ratings.reduce((sum, r) => sum + r.chill, 0) / count).toFixed(1),
    curious: (ratings.reduce((sum, r) => sum + r.curious, 0) / count).toFixed(1),
    awkward: (ratings.reduce((sum, r) => sum + r.awkward, 0) / count).toFixed(1),
  } : {
    adore: '0', hilarious: '0', wow: '0', cool: '0', warm: '0', smart: '0', chill: '0', curious: '0', awkward: '0',
  };

  return {
    profile,
    messages,
    ratings: { ...averages, count },
  };
}