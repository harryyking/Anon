"use client";

import { submitRating } from "@/actions/actions";
import { useState } from "react";

type Emotion = {
  emoji: string;
  label: string;
  color: string;
  key: string; // Add key to map to the rating object
};

const emotions: Emotion[] = [
  { emoji: "🥰", label: "Adore", color: "bg-pink-100 hover:bg-pink-200 border-pink-300", key: "adore" },
  { emoji: "😂", label: "Hilarious", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300", key: "hilarious" },
  { emoji: "🤩", label: "Wow", color: "bg-purple-100 hover:bg-purple-200 border-purple-300", key: "wow" },
  { emoji: "😎", label: "Cool", color: "bg-blue-100 hover:bg-blue-200 border-blue-300", key: "cool" },
  { emoji: "🤗", label: "Warm", color: "bg-orange-100 hover:bg-orange-200 border-orange-300", key: "warm" },
  { emoji: "🤓", label: "Smart", color: "bg-green-100 hover:bg-green-200 border-green-300", key: "smart" },
  { emoji: "😴", label: "Chill", color: "bg-teal-100 hover:bg-teal-200 border-teal-300", key: "chill" },
  { emoji: "🤔", label: "Curious", color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300", key: "curious" },
  { emoji: "😬", label: "Awkward", color: "bg-gray-100 hover:bg-gray-200 border-gray-300", key: "awkward" },
];

interface RateInputProps {
  question?: string;
  onChange?: (value: number) => void;
  profile: string;
}

const RateInput = ({ question = "How do you feel about them?", onChange, profile }: RateInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (index: number) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSelectedIndex(index);
      
      if (onChange) {
        onChange(index + 1); // 1-9 scale for external handlers
      }
      
      // Create a ratings object with all emotions set to 0
      const ratingsObject = {
        adore: 0,
        hilarious: 0,
        wow: 0,
        cool: 0,
        warm: 0,
        smart: 0,
        chill: 0,
        curious: 0,
        awkward: 0,
      };
      
      // Set the selected emotion to 1 (or any value that indicates selection)
      const selectedEmotionKey = emotions[index].key as keyof typeof ratingsObject;
      ratingsObject[selectedEmotionKey] = 1;
      
      // Submit the ratings object to the server
      await submitRating(profile, ratingsObject);
      
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={isSubmitting}
            className={`
              flex flex-col items-center p-2 rounded-lg transition-all duration-200
              ${emotion.color}
              ${selectedIndex === index ? "border-2 scale-105 shadow-md" : "border shadow-sm hover:scale-102"}
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            <span className="text-2xl md:text-3xl">{emotion.emoji}</span>
            <span className={`text-xs font-medium ${selectedIndex === index ? "text-gray-800" : "text-gray-600"}`}>
              {emotion.label}
            </span>
          </button>
        ))}
      </div>

      {selectedIndex !== null && !error && submitSuccess && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border">
            <span className="text-xl">{emotions[selectedIndex].emoji}</span>
            <p className="text-sm font-medium text-gray-700">
              You feel <span className="font-bold">{emotions[selectedIndex].label}</span>
            </p>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border">
            <span className="text-sm font-medium text-gray-700">Submitting...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full shadow-sm border border-red-200">
            <span className="text-sm font-medium text-red-700">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateInput;