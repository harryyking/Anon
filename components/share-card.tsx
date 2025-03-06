"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Copy, Instagram, Twitter, MessageSquare, X, ArrowLeft, Link as LinkIcon } from 'lucide-react'

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
    },
    messages: [
      { id: 1, text: "Your art style is so unique! How did you develop it?", date: "2 days ago" },
      { id: 2, text: "The coffee illustrations you made last week were incredible!", date: "5 days ago" },
      { id: 3, text: "Would love to see a tutorial on your digital painting technique.", date: "1 week ago" }
    ]
  }
}) => {
  const [copied, setCopied] = useState(false)
  const [viewingMessages, setViewingMessages] = useState(false)
  const profileLink = `reflect.me/${user.username}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${profileLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {!viewingMessages ? (
        // Profile View
        <>
          {/* Cover/Banner Area */}
          <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
            <div className="absolute -bottom-12 left-6">
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
            <button 
              className="btn btn-primary w-full mb-3"
              onClick={() => setViewingMessages(true)}
            >
              <MessageSquare size={18} className="mr-2" />
              View Anonymous Messages
            </button>
            <p className="text-xs text-gray-500 text-center">
              You have {user.messages?.length || 0} anonymous messages
            </p>
          </div>
        </>
      ) : (
        // Messages View
        <>
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center">
            <button 
              className="btn btn-ghost btn-sm p-0 mr-3 text-white" 
              onClick={() => setViewingMessages(false)}
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold flex-1">Anonymous Messages</h2>
            <span className="badge badge-accent">{user.messages?.length || 0}</span>
          </div>
          
          {/* Messages List */}
          <div className="h-96 overflow-auto">
            {user.messages && user.messages.length > 0 ? (
              <div className="divide-y">
                {user.messages.map(message => (
                  <div key={message.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <span className="text-gray-500">?</span>
                        </div>
                        <span className="text-sm font-medium">Anonymous</span>
                      </div>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">No messages yet</h3>
                <p className="text-gray-500 mb-4">
                  Share your profile link to start receiving anonymous feedback
                </p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setViewingMessages(false)}
                >
                  Back to Profile
                </button>
              </div>
            )}
          </div>
          
          {/* Footer Actions */}
          <div className="p-4 bg-base-200 border-t">
            <button 
              className="btn btn-primary w-full"
              onClick={() => setViewingMessages(false)}
            >
              Back to Share Card
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareCard