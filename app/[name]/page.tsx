import { sendMessage, submitRating, getProfileData, getUserMessages } from '@/actions/actions';
import AnonCard from '@/components/anon-card';
import AnonForm from '@/components/anon-form';
import EmotionResults from '@/components/rate-card';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export default async function ProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const userInfo = await prisma.user.findUnique({
    where: {name: name.toLowerCase().concat()},
  })

  if(!userInfo)return

  const session = await getServerSession(authOptions);
  const profileData = await getProfileData(userInfo.id);
  const getMessages = await getUserMessages(userInfo.id)

  if(!session){
    return (
      <div>
        <AnonForm profile={userInfo.id}/>
      </div>
    )
  }

  return (
    <div>
      {
        getMessages.map((messages) => (
          <div>
            <AnonCard messages={messages} key={messages.id}/>
          </div>
        ))
      }

      <EmotionResults ratings={profileData}/>

    </div>
  );
}