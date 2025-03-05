"use client"

import { useState } from "react"

type Emotion = {
  emoji: string
  label: string
  color: string
}

type EmotionVote = {
  emotion: Emotion
  count: number
}

interface EmotionResultsProps {
  title?: string
  totalVotes?: number
  showPercentage?: boolean
  initialData?: EmotionVote[]
}

const emotions: Emotion[] = [
  { emoji: "😍", label: "Amazing", color: "bg-pink-100 hover:bg-pink-200 border-pink-300" },
  { emoji: "😊", label: "Great", color: "bg-green-100 hover:bg-green-200 border-green-300" },
  { emoji: "🙂", label: "Good", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
  { emoji: "😐", label: "Okay", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
  { emoji: "😕", label: "Meh", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
]

const EmotionResults = ({
  title = "How people rated this",
  totalVotes = 0,
  showPercentage = true,
  initialData
}: EmotionResultsProps) => {
  // Default data if none provided
  const [votesData, setVotesData] = useState<EmotionVote[]>(
    initialData || [
      { emotion: emotions[0], count: 35 },
      { emotion: emotions[1], count: 42 },
      { emotion: emotions[2], count: 28 },
      { emotion: emotions[3], count: 15 },
      { emotion: emotions[4], count: 10 },
    ]
  )

  const calculatedTotalVotes = totalVotes || votesData.reduce((sum, item) => sum + item.count, 0)
  
  // Find the highest voted emotion
  const highestVote = [...votesData].sort((a, b) => b.count - a.count)[0]

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-center justify-center mb-4">{title}</h2>
        
        {/* Total votes badge */}
        <div className="flex justify-center mb-6">
          <div className="badge badge-lg badge-primary">{calculatedTotalVotes} total votes</div>
        </div>
        
        {/* Highest voted emotion */}
        <div className="flex flex-col items-center mb-6">
          <div className="stat-title text-center">Most Common Rating</div>
          <div className="flex items-center justify-center mt-2">
            <div className={`stat-value text-4xl p-4 rounded-full flex items-center justify-center ${highestVote.emotion.color.split(" ")[0]}`}>
              {highestVote.emotion.emoji}
            </div>
            <div className="ml-4">
              <div className="font-bold text-lg">{highestVote.emotion.label}</div>
              <div className="text-sm opacity-70">
                {Math.round((highestVote.count / calculatedTotalVotes) * 100)}% of votes
              </div>
            </div>
          </div>
        </div>
        
        {/* All emotions progress bars */}
        <div className="space-y-4">
          {votesData.map((item, index) => {
            const percentage = (item.count / calculatedTotalVotes) * 100
            
            return (
              <div key={index} className="flex items-center">
                <div className="w-10 text-center mr-2">{item.emotion.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium">{item.emotion.label}</span>
                    <span className="text-xs opacity-70 ml-auto">
                      {item.count} {showPercentage && `(${Math.round(percentage)}%)`}
                    </span>
                  </div>
                  <progress 
                    className={`progress ${getDaisyUIColorClass(item.emotion.color)} w-full`} 
                    value={percentage} 
                    max="100"
                  ></progress>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Helper function to convert Tailwind color classes to DaisyUI progress bar classes
function getDaisyUIColorClass(tailwindClass: string): string {
  if (tailwindClass.includes("pink")) return "progress-secondary"
  if (tailwindClass.includes("green")) return "progress-success"
  if (tailwindClass.includes("blue")) return "progress-info"
  if (tailwindClass.includes("yellow")) return "progress-warning"
  if (tailwindClass.includes("orange")) return "progress-error"
  return "progress-primary"
}

export default EmotionResults