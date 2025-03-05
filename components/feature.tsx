import React from 'react'

const Feature = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-accent-content">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="text-muted-foreground md:text-xl">
            Three simple steps to gain valuable insights about yourself
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold">Create Your Profile</h3>
            <p className="text-muted-foreground text-center">
              Sign up and customize your profile with questions you want answered
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold">Share Your Link</h3>
            <p className="text-muted-foreground text-center">
              Send your unique link to friends, family, or colleagues
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold">Receive Feedback</h3>
            <p className="text-muted-foreground text-center">
              Get anonymous insights about your strengths and personality
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Feature