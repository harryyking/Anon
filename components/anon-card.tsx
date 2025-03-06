import React from 'react'
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
 message
}: AnonCardProps) => {
  
  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(message?.timestamp)

  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all`}>
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
        <p className="text-sm md:text-base">{message?.message}</p>
        
      </div>
    </div>
  )
}

export default AnonCard