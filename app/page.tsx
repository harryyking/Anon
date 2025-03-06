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
    <main className="min-h-screen overflow-hidden bg-black px-4">
      {/* Ticker */}
      <div className="text-white whitespace-nowrap overflow-hidden py-2 select-none">
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

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center rounded-xl p-4 overflow-hidden bg-gradient-to-b from-primary to-secondary">
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
            Send an anonymous message
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <div className="text-primary-content flex flex-col items-center">
            <ChevronDown size={50} />
          </div>
        </div>

        {/* Wave Divider - IMPROVED CONCAVE DESIGN */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#000000"
              d="M0,0L48,5.3C96,11,192,21,288,37.3C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,16C1248,11,1344,21,1392,26.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Features Section - NGL-Inspired */}
      <section className="w-full py-16 px-4 text-center text-primary-content relative">
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
              <h3 className="text-2xl font-bold mb-3 text-primary">Create Your Profile</h3>
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
                <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-3 rounded-full shadow-lg ">
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
              <h3 className="text-2xl font-bold mb-3 text-accent">Share Your Link</h3>
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
              <h3 className="text-2xl font-bold mb-3 text-secondary">Receive Honest Feedback</h3>
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

        {/* ADDED CONVEX WAVE TRANSITION to testimonials */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#gradient-testimonial)"
              d="M0,96L48,85.3C96,75,192,53,288,58.7C384,64,480,96,576,96C672,96,768,64,864,48C960,32,1056,32,1152,48C1248,64,1344,96,1392,112L1440,128L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
            <defs>
              <linearGradient id="gradient-testimonial" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Updated Testimonials - NGL-inspired */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary to-secondary rounded-xl text-center relative">
        {/* ADDED CONCAVE WAVE AT THE TOP */}
        <div className="absolute top-0 left-0 right-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            className="w-full"
            preserveAspectRatio="none"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              fill="#000000"
              d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,58.7C672,64,768,96,864,90.7C960,85,1056,43,1152,32C1248,21,1344,43,1392,53.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-4xl font-bold mb-16 text-primary-content">What People Are Saying</h2>

          <div className="relative">
            {/* Phone frame */}
            <div className="mockup-phone border-primary mx-auto">
              <div className="mockup-phone-camera"></div>
              <div className="mockup-phone-display h-[40rem] w-96">
                <img alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp"/>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 -left-4 bg-white p-4 rounded-full shadow-lg animate-bounce transform -rotate-6">
              ⭐️
            </div>
            <div className="absolute top-32 -right-4 bg-white p-4 rounded-full shadow-lg animate-bounce transform rotate-12">
              ❤️
            </div>
            <div className="absolute bottom-8 -left-4 bg-white p-4 rounded-full shadow-lg animate-bounce transform rotate-6">
              🙌
            </div>
          </div>

          <div className="mt-16 space-y-2">
            <p className="text-xl font-bold text-primary-content">Join thousands of users discovering their true selves</p>
            <Link href="/signup" className="btn btn-lg btn-neutral">
              Get Started Free
            </Link>
          </div>
        </div>

        {/* ADDED CONVEX WAVE AT THE BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#000000"
              d="M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,48C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Updated Footer - Simplified */}
      <footer className="p-10 bg-inherit text-neutral-content text-center">
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