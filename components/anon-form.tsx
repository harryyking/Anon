"use client"

import type React from "react"

import { useState } from "react"
import { Send, Star, CheckCircle, Loader2 } from "lucide-react"
import RateInput from "./rate-input"
import { sendMessage } from "@/actions/actions"

interface AnonFormProps {
  placeholder?: string
  maxLength?: number
  onSubmit?: (message: string) => void
  profile: string
}

const AnonForm = ({
  profile,
  placeholder = "Share something positive about this person...",
  maxLength = 500,
  onSubmit,
}: AnonFormProps) => {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showRateInput, setShowRateInput] = useState(false)
  const [activeTab, setActiveTab] = useState<"message" | "rate">("message")

  const characterCount = message.length
  const isOverLimit = characterCount > maxLength
  const isEmpty = message.trim().length === 0

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEmpty || isOverLimit) return

    try {
      setIsSubmitting(true)
      await sendMessage(profile, message)
      setSubmitted(true)
      setMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
      // You could add error state handling here
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-base-100 rounded-xl shadow-sm p-6">
      {/* Tab Navigation */}

      
      <div className="tabs tabs-box gap-4 mb-6">
        <button
          className={`tab  ${activeTab === "message" ? "tab tab-active btn-secondary w-full " : ""}`}
          onClick={() => setActiveTab("message")}
        >
          Send Message 👂🏽
        </button>
        <button className={`tab ${activeTab === "rate" ? "tab tab-active btn-secondary w-full" : ""}`} onClick={() => setActiveTab("rate")}>
          Rate Me 🙈
        </button>
      </div>

      {activeTab === "message" && (
        <>
          {submitted ? (
            <div className="bg-success/10 border border-success rounded-xl p-6 text-center text-neutral">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank you!</h3>
              <p className="text-base-content/80 mb-4">Your anonymous message has been sent successfully.</p>
              <button onClick={resetForm} className="btn btn-outline btn-success btn-sm">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-neutral">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your Anonymous Message</span>
                  <span
                    className={`label-text-alt ${isOverLimit ? "text-error" : characterCount > maxLength * 0.8 ? "text-warning" : "text-base-content/60"}`}
                  >
                    {characterCount}/{maxLength}
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`textarea textarea-bordered text-neutral w-full min-h-32 focus:textarea-primary ${isOverLimit ? "textarea-error" : ""}`}
                  aria-label="Anonymous feedback"
                  maxLength={maxLength + 10} // Allow slight overflow but highlight as error
                />
              </div>

              <button
                type="submit"
                disabled={isEmpty || isOverLimit || isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Anonymously
                  </>
                )}
              </button>
            </form>
          )}
        </>
      )}

      {activeTab === "rate" && (
        <div className="animate-fadeIn">
          <RateInput profile={profile} />
        </div>
      )}
    </div>
  )
}

export default AnonForm

