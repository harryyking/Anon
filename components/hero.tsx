import Link from "next/link"

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-base-100">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              Discover how others truly see you
            </h1>
            <p className="text-base-content opacity-80 md:text-xl">
              Share a link with friends and receive anonymous feedback about your strengths, personality, and more. Gain
              valuable insights in a fun, safe way.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link href="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/how-it-works" className="btn btn-outline">
                How It Works
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 h-72 w-72 bg-primary opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 h-72 w-72 bg-secondary opacity-20 rounded-full blur-3xl"></div>
              <div className="relative bg-base-100 p-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary">What people are saying</h3>

                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                      "You have an amazing ability to make everyone feel comfortable. Your kindness is your superpower!"
                    </div>
                  </div>

                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-secondary">
                      "Your creativity and problem-solving skills are off the charts. You always think outside the box!"
                    </div>
                  </div>

                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                      "I admire your determination and resilience. You never give up, even when things get tough."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

