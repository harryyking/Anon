import React from 'react'
import Link from 'next/link'


const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover how others truly see you
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Share a link with friends and receive anonymous feedback about your strengths, personality, and more.
            Gain valuable insights in a fun, safe way.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <button className='btn btn-primary'>
              <Link href="/signup">Get Started</Link>
            </button>
            <button className='btn btn-outline'>
              <Link href="/how-it-works">How It Works</Link>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-4 -left-4 h-72 w-72 bg-primary/20 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 h-72 w-72 bg-secondary/20 rounded-full blur-3xl opacity-70"></div>
            <div className="relative rounded-lg border bg-background p-6 shadow-lg">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">What people are saying</h3>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="italic">
                      "You have an amazing ability to make everyone feel comfortable. Your kindness is your
                      superpower!"
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="italic">
                      "Your creativity and problem-solving skills are off the charts. You always think outside the
                      box!"
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="italic">
                      "I admire your determination and resilience. You never give up, even when things get tough."
                    </p>
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