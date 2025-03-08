import { Message } from '@prisma/client'
import React from 'react'
import { Contact } from 'lucide-react'

const AnonCard = ({ 
 messages
}: {messages : Message}) => {
  
  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(messages.createdAt)

  return (
    <div className={`card bg-base-100 text-neutral shadow-md hover:shadow-lg transition-all max-w-3xl mx-auto`}>
      <div className="card-body p-4">
        {/* Anonymous icon and timestamp */}
        <div className="flex items-center mb-2">
          <div className="avatar avatar-placeholder">
            <div className="bg-accent rounded-full w-8">
              <span className='text-lg'>👻</span>
            </div>
          </div>
          <div className="ml-2 text-xs opacity-70">Anonymous • {formattedTime}</div>
        </div>
        
        {/* Message content */}
        <p className="text-sm md:text-base text-neutral">{messages.content}</p>
        
      </div>
    </div>
  )
}

export default AnonCard