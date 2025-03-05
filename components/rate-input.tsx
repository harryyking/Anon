"use client"

import { useState } from "react"

type Emotion = {
  emoji: string
  label: string
  color: string
}

const emotions: Emotion[] = [
  { emoji: "😍", label: "Amazing", color: "bg-pink-100 hover:bg-pink-200 border-pink-300" },
  { emoji: "😊", label: "Great", color: "bg-green-100 hover:bg-green-200 border-green-300" },
  { emoji: "🙂", label: "Good", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
  { emoji: "😐", label: "Okay", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
  { emoji: "😕", label: "Meh", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
]

interface RateInputProps {
  question?: string
  onChange?: (value: number) => void
}

const RateInput = ({ question = "How would you rate this person?", onChange }: RateInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    if (onChange) {
      // Convert to 1-5 scale
      onChange(index + 1)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">{question}</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`
              flex flex-col items-center p-4 rounded-xl transition-all duration-200
              ${emotion.color}
              ${selectedIndex === index ? "border-4 scale-110 shadow-lg" : "border-2 shadow-sm hover:scale-105"}
            `}
          >
            <span className="text-5xl md:text-6xl mb-2">{emotion.emoji}</span>
            <span className={`text-sm font-medium ${selectedIndex === index ? "text-gray-800" : "text-gray-600"}`}>
              {emotion.label}
            </span>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="mt-6 text-center">
          <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm border">
            <p className="text-sm font-medium text-gray-700">
              You selected <span className="font-bold">{emotions[selectedIndex].label}</span>{" "}
              {emotions[selectedIndex].emoji}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RateInput

