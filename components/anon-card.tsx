"use client"

import React from 'react'
import { useState } from 'react'

type AnonMessage = {
  id: string
  message: string
  timestamp: Date
  likes: number
}

interface AnonCardProps {
  message?: AnonMessage
  withActions?: boolean
  className?: string
}

const AnonCard = ({ 
  message = {
    id: '1',
    message: 'This is an anonymous message. The sender remains unknown.',
    timestamp: new Date(),
    likes: 0
  },
  withActions = true,
  className = ''
}: AnonCardProps) => {
  const [likes, setLikes] = useState(message.likes)
  const [copied, setCopied] = useState(false)
  
  const handleLike = () => {
    setLikes(prev => prev + 1)
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(message.timestamp)

  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all ${className}`}>
      <div className="card-body p-4">
        {/* Anonymous icon and timestamp */}
        <div className="flex items-center mb-2">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-xs">?</span>
            </div>
          </div>
          <div className="ml-2 text-xs opacity-70">Anonymous • {formattedTime}</div>
        </div>
        
        {/* Message content */}
        <p className="text-sm md:text-base">{message.message}</p>
        
        {/* Action buttons */}
        {withActions && (
          <div className="card-actions justify-end mt-3">
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={handleCopy}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={handleLike}
            >
              {likes > 0 ? `❤️ ${likes}` : '🤍 Like'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnonCard