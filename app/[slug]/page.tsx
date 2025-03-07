import { notFound } from 'next/navigation';
import { sendMessage, submitRating, getProfileData, getUserMessages } from '@/actions/actions';
import AnonCard from '@/components/anon-card';
import AnonForm from '@/components/anon-form';
import EmotionResults from '@/components/rate-card';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';


export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userInfo = await prisma.user.findUnique({
    where: { slug },
  });

  // If no user is found for the slug, trigger a 404
  if (!userInfo) {
    notFound(); // Explicitly handle invalid slug
  }

  const session = await getServerSession(authOptions);
  const profileData = await getProfileData(userInfo.id);
  const getMessages = await getUserMessages(userInfo.id);

  // If no session, show only the AnonForm
  if (!session) {
    return (
      <div>
        <AnonForm profile={userInfo.id} />
      </div>
    );
  }

  // If session exists, show messages and ratings
  return (
    <div className='max-w-3xl mx-auto space-y-2'>
      {getMessages.map((message) => (
        <div key={message.id} className='space-y-4'>
          <AnonCard messages={message} />
        </div>
      ))}
      <EmotionResults ratings={profileData} />
    </div>
  );
}