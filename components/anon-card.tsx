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
          <div className="avatar placeholder">
            <div className="bg-base-300 flex items-center justify-center text-neutral-content rounded-full w-8">
              <Contact size={16}/>
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