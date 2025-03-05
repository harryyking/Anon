"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tickerItems = [
    "tell me what you think of me",
    "share your honest opinion",
    "what's my best quality?",
    "how would you describe me?",
    "what should I improve on?",
    "tell me something I don't know about myself",
    "what's your first impression of me?",
    "rate my personality",
    "tell me what you think of me",
    "share your honest opinion",
  ]

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Ticker */}
      <div className="bg-neutral text-neutral-content whitespace-nowrap overflow-hidden py-2 select-none">
        <div className="inline-block animate-marquee">
          {tickerItems.map((item, index) => (
            <span key={index} className="mx-4">
              • {item} •
            </span>
          ))}
        </div>
        <div className="inline-block animate-marquee">
          {tickerItems.map((item, index) => (
            <span key={index} className="mx-4">
              • {item} •
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section - Kept unchanged as requested */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-primary to-secondary">
        {/* Navigation */}
        <div className="navbar absolute top-0 left-0 z-10 bg-transparent">
          <div className="navbar-start">
            <div className="text-primary-content font-bold text-3xl">Reflect</div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-primary-content">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/safety">Safety</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <Link href="/download" className="btn btn-neutral">
              Get Started
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-[10%] top-[30%] animate-float-slow transform rotate-[-10deg]">
          <div className="rounded-3xl overflow-hidden border-4 border-base-100 shadow-lg">
            <Image
              src="/placeholder.svg?height=200&width=150"
              alt="Person smiling"
              width={150}
              height={200}
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute right-[15%] top-[20%] animate-float transform rotate-[10deg]">
          <div className="w-16 h-16 md:w-24 md:h-24">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Hand wave"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute right-[20%] bottom-[20%] animate-float-slow transform rotate-[5deg]">
          <div className="rounded-3xl overflow-hidden border-4 border-base-100 shadow-lg">
            <Image
              src="/placeholder.svg?height=200&width=150"
              alt="Person giving feedback"
              width={150}
              height={200}
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute left-[20%] bottom-[15%] animate-float transform rotate-[-5deg]">
          <div className="w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Star emoji"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 mt-16">
          <h1 className="text-primary-content text-5xl md:text-7xl font-bold leading-tight mb-6">
            honest <br /> feedback <br /> real growth
          </h1>
          <Link href="/signup" className="btn btn-lg btn-neutral">
            Create Your Profile
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
          <div className="text-primary-content flex flex-col items-center">
            <ChevronDown size={40} />
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Updated Features Section - NGL-Inspired */}
      <section className="w-full py-16 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">How It Works</h2>
          
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Create Your Profile</h3>
              <p className="max-w-md mx-auto text-lg text-gray-600">
                Sign up and customize your profile with the questions you want answered about yourself
              </p>
              <div className="mt-8 relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Profile creation illustration"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-3 rounded-full shadow-lg">
                  🚀
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Share Your Link</h3>
              <p className="max-w-md mx-auto text-lg text-gray-600">
                Send your personalized link to friends, family, or anyone whose feedback you value
              </p>
              <div className="mt-8 relative">
                <div className="bg-base-200 rounded-xl p-6 shadow-lg flex items-center">
                  <span className="text-lg font-mono text-gray-700 mr-2">reflect.me/yourname</span>
                  <button className="btn btn-sm btn-primary">Copy</button>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-full shadow-lg">
                  🔗
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Receive Honest Feedback</h3>
              <p className="max-w-md mx-auto text-lg text-gray-600">
                Get anonymous insights that help you grow and understand how others perceive you
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-base-100 rounded-xl p-4 shadow-md">
                  <p className="italic">"You're a great listener!"</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 shadow-md">
                  <p className="italic">"Your creativity inspires me!"</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 shadow-md">
                  <p className="italic">"I admire your determination."</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 shadow-md">
                  <p className="italic">"You always brighten my day."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Testimonials - NGL-inspired */}
      <section className="py-20 px-4 bg-gradient-to-b from-base-200 to-base-300 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">What People Are Saying</h2>

          <div className="relative">
            {/* Phone frame */}
            <div className="w-64 h-96 bg-gray-900 rounded-3xl mx-auto p-3 shadow-2xl border-4 border-gray-800">
              <div className="w-full h-full bg-base-100 rounded-2xl overflow-hidden p-4">
                <div className="space-y-4">
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                      "This has helped me understand how others see me. So eye-opening!"
                    </div>
                  </div>

                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-secondary">
                      "I discovered strengths I never knew I had!"
                    </div>
                  </div>

                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                      "The anonymous format made people more honest. I got feedback I needed to hear."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 -left-4 bg-white p-4 rounded-full shadow-lg transform -rotate-6">
              ⭐️
            </div>
            <div className="absolute top-32 -right-4 bg-white p-4 rounded-full shadow-lg transform rotate-12">
              ❤️
            </div>
            <div className="absolute bottom-8 -left-4 bg-white p-4 rounded-full shadow-lg transform rotate-6">
              🙌
            </div>
          </div>

          <div className="mt-16 space-y-2">
            <p className="text-xl font-bold">Join thousands of users discovering their true selves</p>
            <Link href="/signup" className="btn btn-lg btn-primary inline-block">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Updated CTA Section */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-4">Ready to Reflect?</h2>
          <p className="text-xl mb-8">Get honest, anonymous feedback and discover the real you.</p>
          
          <div className="bg-base-200 rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <input 
                type="text" 
                placeholder="Choose your username" 
                className="input input-bordered w-full max-w-md"
              />
            </div>
            <button className="btn btn-lg btn-primary">Create Your Profile</button>
            <p className="mt-4 text-sm text-gray-500">No credit card required. Start in seconds.</p>
          </div>
        </div>
      </section>

      {/* Updated Footer - Simplified */}
      <footer className="p-10 bg-neutral text-neutral-content text-center">
        <div className="max-w-md mx-auto">
          <div className="text-3xl font-bold mb-4">Reflect</div>
          <p className="mb-6">The personal feedback platform for real growth</p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a className="btn btn-circle btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="btn btn-circle btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="btn btn-circle btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link href="/about" className="link link-hover">About</Link>
            <Link href="/privacy" className="link link-hover">Privacy</Link>
            <Link href="/terms" className="link link-hover">Terms</Link>
            <Link href="/contact" className="link link-hover">Contact</Link>
            <Link href="/faq" className="link link-hover">FAQ</Link>
            <Link href="/blog" className="link link-hover">Blog</Link>
          </div>
          
          <p className="text-sm">© 2025 Reflect. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}