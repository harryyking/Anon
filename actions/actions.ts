// 'use server'; // Marks this file as server-only

// import prisma from '@/lib/db';
// import { revalidatePath } from 'next/cache';

// // 1. Send a Message
// export async function sendMessage(recipientId: number, content: string) {
//   const session = await getSession(); // Get current user (if logged in)
//   const senderId = session?.user.id; // Optional sender

//   await prisma.message.create({
//     data: {
//       senderId,
//       recipientId,
//       content,
//     },
//   });

//   // Update points for sender (if logged in) and recipient
//   if (senderId) {
//     await prisma.user.update({
//       where: { id: senderId },
//       data: { points: { increment: 1 } },
//     });
//   }
//   await prisma.user.update({
//     where: { id: recipientId },
//     data: { points: { increment: 1 } },
//   });

//   revalidatePath(`/profile/${recipientId}`); // Refresh profile page
// }

// // 2. Submit a Rating
// export async function submitRating(rateeId: number, beauty: number, intelligence: number, personality: number) {
//   const session = await getSession();
//   if (!session) throw new Error('Unauthorized');

//   const raterId = session.user.id;
//   if (raterId === rateeId) throw new Error('Cannot rate yourself');

//   const existingRating = await prisma.rating.findUnique({
//     where: { raterId_rateeId: { raterId, rateeId } },
//   });

//   if (existingRating) {
//     await prisma.rating.update({
//       where: { id: existingRating.id },
//       data: { beauty, intelligence, personality },
//     });
//   } else {
//     await prisma.rating.create({
//       data: { raterId, rateeId, beauty, intelligence, personality },
//     });
//   }

//   revalidatePath(`/profile/${rateeId}`); // Refresh profile page
// }

// // 3. Update Settings
// export async function updateSettings(theme: string) {
//   const session = await getSession();
//   if (!session) throw new Error('Unauthorized');

//   await prisma.user.update({
//     where: { id: session.user.id },
//     data: { theme },
//   });

//   revalidatePath('/settings'); // Refresh settings page
// }

// // 4. Fetch Profile Data (Server-side Helper)
// export async function getProfileData(userId: number) {
//   const profile = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { id: true, email: true, theme: true, points: true },
//   });
//   if (!profile) throw new Error('User not found');

//   const messages = await prisma.message.findMany({
//     where: { recipientId: userId },
//     orderBy: { createdAt: 'desc' },
//   });

//   const ratings = await prisma.rating.findMany({
//     where: { rateeId: userId },
//   });
//   const count = ratings.length;
//   const beautyAvg = count > 0 ? ratings.reduce((sum, r) => sum + r.beauty, 0) / count : 0;
//   const intelligenceAvg = count > 0 ? ratings.reduce((sum, r) => sum + r.intelligence, 0) / count : 0;
//   const personalityAvg = count > 0 ? ratings.reduce((sum, r) => sum + r.personality, 0) / count : 0;

//   return {
//     profile,
//     messages,
//     ratings: {
//       beauty: beautyAvg.toFixed(1),
//       intelligence: intelligenceAvg.toFixed(1),
//       personality: personalityAvg.toFixed(1),
//       count,
//     },
//   };
// }