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
  
  // If no session, show only the AnonForm
  if (!session) {
    return (
      <div className='p-2 min-h-screen flex justify-center items-center'>
        <AnonForm profile={userInfo.id} />
      </div>
    );
  }
  const profileData = await getProfileData(userInfo.id);
  const getMessages = await getUserMessages(userInfo.id);


  // If session exists, show messages and ratings
  return (
    <div className='bg-gradient-to-b from-primary to-secondary p-2 flex justify-center items-center'>

    <div className='space-y-2'>
      {getMessages.map((message) => (
        <div key={message.id} className='space-y-4'>
          <AnonCard messages={message} />
        </div>
      ))}
      <EmotionResults ratings={profileData} />
    </div>
    </div>
  );
}