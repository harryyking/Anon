import { notFound } from "next/navigation";
import { getProfileData, getUserMessages } from "@/actions/actions";
import AnonCard from "@/components/anon-card";
import AnonForm from "@/components/anon-form";
import EmotionResults from "@/components/rate-card";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { getSEOTags } from "@/lib/seo";

// Define metadata for the default (non-owner) case
export const metadata = getSEOTags({
  title: "Tell me how you feel, send me an anonymous message",
  description: "Send anonymous messages to share your feelings. Fun, private feedback tool—get started now!",
  keywords: "anonymous messaging, private feedback, send message, social tool, reflect app",
});

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userInfo = await prisma.user.findUnique({
    where: { slug },
  });

  if (!userInfo) {
    notFound();
  }

  // Check if the logged-in user is the profile owner
  const session = await getServerSession(authOptions);
  const isOwner = session?.user.email === userInfo.email;

  // Fetch owner-specific data only if they are the owner
  let profileData = null;
  let messages: any[] = [];
  if (isOwner) {
    try {
      profileData = await getProfileData(userInfo.id);
      messages = await getUserMessages(userInfo.id);
    } catch (error) {
      console.error("Error fetching profile data or messages:", error);
      profileData = null; // Fallback if fetching fails
      messages = [];
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-gradient-to-b from-primary to-secondary">
      {/* Header */}
      <div className="w-full max-w-3xl mx-auto pt-8 md:pt-12">
        <Link href="/" className="flex gap-2 items-center justify-center mb-8">
          <Image
            src="https://utfs.io/f/Bilqtug6OUkPFIEVxRlS54E1zmK6tAd0ZRnIYDwpX2yvhrVP"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <h2 className="text-xl font-bold text-white">Reflect</h2>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl text-center font-semibold text-white mb-8">
          {isOwner
            ? "Here’s what people think about you"
            : "Tell me how you feel, send me an anonymous message"}
        </h1>

        {/* AnonForm is always available */}
        <div className="mb-8">
          <AnonForm profile={userInfo.id} />
        </div>

        {/* Owner-specific content */}
        {isOwner && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile stats/ratings */}
            <div className="lg:col-span-1">
              {profileData ? (
                <EmotionResults ratings={profileData} />
              ) : (
                <p className="text-white/80 text-center">Failed to load ratings.</p>
              )}
            </div>

            {/* Messages */}
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
        )}
      </div>

      {/* Footer */}
      <div className="w-full max-w-3xl mx-auto mt-12 pt-6 border-t border-white/10">
        <p className="text-center text-white/80 text-sm md:text-base mb-8">
          Discover how friends feel about you with anonymous messages & fun ratings—Adore, Hilarious, Wow & more.
          Share your link & get real feedback!
        </p>

        <div className="text-center">
          <Link
            href="https://www.x.com/HarryArthu77860"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white/90 hover:text-white transition-colors py-1 px-3 rounded-full bg-white/10 hover:bg-white/20"
          >
            Made by Harry👑
          </Link>
        </div>
      </div>
    </div>
 