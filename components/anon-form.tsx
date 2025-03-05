"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

interface AnonFormProps {
  placeholder?: string
  maxLength?: number
  onSubmit?: (message: string) => void
}

const AnonForm = ({
  placeholder = "Share something positive about this person...",
  maxLength = 500,
  onSubmit,
}: AnonFormProps) => {
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxLength) {
      setMessage(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim().length === 0) return

    if (onSubmit) {
      onSubmit(message)
    }

    // Show success state
    setSubmitted(true)

    // Reset form after delay
    setTimeout(() => {
      setMessage("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {submitted ? (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h3>
          <p className="text-gray-600">Your anonymous message has been sent successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={handleChange}
              placeholder={placeholder}
              className="textarea w-full text-primary-content min-h-44 textarea-lg"
              aria-label="Anonymous feedback"
            />

            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {message.length}/{maxLength}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={message.trim().length === 0} className="btn btn-primary gap-2 px-6">
              <Send size={18} />
              Send Anonymously
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AnonForm

