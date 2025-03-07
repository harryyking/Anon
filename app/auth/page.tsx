"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const [googleIsLoading, setGoogleIsLoading] = useState(false);
  const router = useRouter()

  const handleSignInGoogle = async() => {
    setGoogleIsLoading(true);
    const signInResult = await signIn("google");
    if (!signInResult) {
      setGoogleIsLoading(false);
      return;
    }

    if(signInResult.ok) {
      router.push("/main");

    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-primary to-secondary p-4">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center text-center p-6">
          {/* Logo */}
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <Link href="/" className="text-3xl font-bold ml-2 text-primary">Reflect</Link>
            </div>
            <p className="text-base-content/70 mt-2">Sign in to continue to your account</p>
          </div>

          {/* Divider */}
          <div className="divider mb-4"></div>

          {/* Sign in buttons */}
      
          <button className="btn bg-white btn-lg w-full text-black border-[#e5e5e5]"  onClick={handleSignInGoogle}
              disabled={googleIsLoading}>
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
            </button>

          {/* Additional info */}
          <div className="mt-6 text-sm text-base-content/70">
            By continuing, you agree to Reflect's
            <a href="#" className="link link-primary ml-1">Terms of Service</a> and
            <a href="#" className="link link-primary ml-1">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage