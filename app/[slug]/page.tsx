import { notFound } from "next/navigation"
import { getProfileData, getUserMessages } from "@/actions/actions"
import AnonCard from "@/components/anon-card"
import AnonForm from "@/components/anon-form"
import EmotionResults from "@/components/rate-card"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import Link from "next/link"
import Image from "next/image"

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const userInfo = await prisma.user.findUnique({
    where: { slug },
  })

  // If no user is found for the slug, trigger a 404
  if (!userInfo) {
    notFound() // Explicitly handle invalid slug
  }

  const session = await getServerSession(authOptions)

  // If no session, show only the AnonForm with proper layout
  if (!session) {
    return (
      <div className="min-h-screen w-full flex justify-center relative items-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-primary to-secondary">
        <div className="space-y-2 text-center">
          <Link href='/'>
        <Image src="https://utfs.io/f/Bilqtug6OUkPpOkP6Xn9dOQqjAs0wWK8ehaxrDilESykTbnL" alt="logo" 
        width={80}
        height={80}
        />
          </Link>

        <h1 className="text-3xl md:text-5xl text-center font-semibold">Tell me how you feel, <br />send me an anonymous message</h1>
        <p className="text-center">Discover how friends feel about you with anonymous messages & fun ratings—Adore, Hilarious, Wow & more. Share your link & get real feedback! </p>
      </div>
        <div className="w-full max-w-3xl mx-auto">
          <AnonForm profile={userInfo.id} />
        </div>

        <Link href="https://www.x.com/HarryArthu77860" target="_blank" rel="noopener noreferrer" className="underline p-2 absolute bottom-0">Made by Harry👑</Link>
      </div>
    )
  }

  // Fetch data for authenticated users
  const profileData = await getProfileData(userInfo.id)
  const messages = await getUserMessages(userInfo.id)

  // If session exists, show messages and ratings with improved layout
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-secondary py-8 px-4 sm:px-6 md:px-8">
      <div className="space-y-2 text-center">
          <Link href='/main'>
        <Image src="https://utfs.io/f/Bilqtug6OUkPpOkP6Xn9dOQqjAs0wWK8ehaxrDilESykTbnL" alt="logo" 
        width={80}
        height={80}
        />
          </Link>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile stats/ratings - takes 1/3 of the space on large screens */}
          <div className="lg:col-span-1">
            <EmotionResults ratings={profileData} />
          </div>

          {/* Messages - takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Anonymous Messages</h2>

            {messages.length > 0 ? (
              messages.map((message) => <AnonCard key={message.id} messages={message} />)
            ) : (
              <div className="bg-base-100 rounded-xl p-6 text-center shadow-md">
                <p className="text-base-content/80">
                  No messages yet. Share this profile to receive anonymous feedback!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

