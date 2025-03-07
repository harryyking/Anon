import { sendMessage, submitRating, getProfileData, getUserMessages } from '@/actions/actions';
import AnonCard from '@/components/anon-card';
import AnonForm from '@/components/anon-form';
import EmotionResults from '@/components/rate-card';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';


function createProfileSlug(fullName: string): string {
  if (!fullName) return "";
  const slug = fullName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userInfo = await prisma.user.findUnique({
    where: {slug: slug},
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