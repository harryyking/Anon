"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Copy, Instagram, Twitter, Link as LinkIcon } from 'lucide-react'

const ShareCard = ({ 
  user = {
    username: "sarahj",
    displayName: "Sarah Johnson",
    bio: "Digital artist & coffee enthusiast. Ask me anything!",
    avatar: "/placeholder.svg?height=200&width=200",
    socials: {
      instagram: "sarahjcreates",
      twitter: "sarahjohnson",
      tiktok: "sarahj_creates"
    }
  }
}) => {
  const [copied, setCopied] = useState(false)
  const profileLink = `reflect.me/${user.username}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${profileLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Cover/Banner Area */}
      <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute -bottom-12 left-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-white ring-offset-0 bg-white">
              <Image 
                src={user.avatar}
                alt={user.displayName}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-6 pb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
        
        <p className="text-gray-700 mb-6">{user.bio}</p>

        {/* Share Link */}
        <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <LinkIcon size={18} className="text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium text-sm truncate mr-2">
              {profileLink}
            </span>
          </div>
          <button 
            onClick={handleCopyLink} 
            className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'}`}
          >
            {copied ? (
              <>
                <CheckCircle size={16} />
                <span className="ml-1">Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="ml-1">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-base-200 rounded-xl p-4 mb-6">
          <p className="text-center text-gray-700">
            Share this link with friends to get anonymous feedback
          </p>
        </div>
        
        {/* Social Links */}
        <div>
          <h3 className="font-bold mb-3">Connect with {user.displayName.split(' ')[0]}</h3>
          <div className="grid grid-cols-3 gap-3">
            {user.socials.instagram && (
              <a 
                href={`https://instagram.com/${user.socials.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline hover:bg-pink-500 hover:border-pink-500 flex justify-between"
              >
                <Instagram size={18} />
                <span>Instagram</span>
              </a>
            )}
            
            {user.socials.twitter && (
              <a 
                href={`https://twitter.com/${user.socials.twitter}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline hover:bg-blue-400 hover:border-blue-400 flex justify-between"
              >
                <Twitter size={18} />
                <span>Twitter</span>
              </a>
            )}
            
            {user.socials.tiktok && (
              <a 
                href={`https://tiktok.com/@${user.socials.tiktok}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline hover:bg-black hover:border-black flex justify-between"
              >
                <span>TikTok</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-6 bg-base-200 flex flex-col items-center">
        <button className="btn btn-primary w-full mb-2">
          Send Anonymous Message
        </button>
        <p className="text-xs text-gray-500 text-center">
          Your feedback will help {user.displayName.split(' ')[0]} grow!
        </p>
      </div>
    </div>
  )
}

export default ShareCard