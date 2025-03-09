"use client";

import { useState, useEffect } from "react";

type Emotion = {
  emoji: string;
  label: string;
  color: string;
  key: string; // This will be refined by as const
};

type EmotionVote = {
  emotion: Emotion;
  count: number;
};

interface EmotionResultsProps {
  title?: string;
  ratings: {
    profile: {
      id: string;
      slug: string;
      email: string;
      points: number;
      theme: string;
    };
    ratings: {
      count: number;
      adore: number;
      hilarious: number;
      wow: number;
      cool: number;
      warm: number;
      smart: number;
      chill: number;
      curious: number;
      awkward: number;
    };
  };
}

// Use as const to infer literal types
const emotions = [
  { emoji: "🥰", label: "Adore", color: "bg-pink-100 hover:bg-pink-200 border-pink-300", key: "adore" },
  { emoji: "😂", label: "Hilarious", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300", key: "hilarious" },
  { emoji: "🤩", label: "Wow", color: "bg-purple-100 hover:bg-purple-200 border-purple-300", key: "wow" },
  { emoji: "😎", label: "Cool", color: "bg-blue-100 hover:bg-blue-200 border-blue-300", key: "cool" },
  { emoji: "🤗", label: "Warm", color: "bg-orange-100 hover:bg-orange-200 border-orange-300", key: "warm" },
  { emoji: "🤓", label: "Smart", color: "bg-green-100 hover:bg-green-200 border-green-300", key: "smart" },
  { emoji: "😴", label: "Chill", color: "bg-teal-100 hover:bg-teal-200 border-teal-300", key: "chill" },
  { emoji: "🤔", label: "Curious", color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300", key: "curious" },
  { emoji: "😬", label: "Awkward", color: "bg-gray-100 hover:bg-gray-200 border-gray-300", key: "awkward" },
] as const;

// TypeScript now infers: type EmotionKeys = "adore" | "hilarious" | "wow" | ...
type EmotionKeys = typeof emotions[number]["key"];

const EmotionResults = ({ title = "How people rated you", ratings }: EmotionResultsProps) => {
  const [votesData, setVotesData] = useState<EmotionVote[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [highestVote, setHighestVote] = useState<EmotionVote | null>(null);

  useEffect(() => {
    if (!ratings) {
      setVotesData(emotions.map((emotion) => ({ emotion, count: 0 })));
      setTotalVotes(0);
      setHighestVote(null);
      return;
    }

    const emotionVotes = emotions.map((emotion) => ({
      emotion,
      count: Number(ratings.ratings[emotion.key]) || 0, // emotion.key is now a literal union
    }));

    const total = emotionVotes.reduce((sum, item) => sum + item.count, 0);
    setVotesData(emotionVotes);
    setTotalVotes(total);

    if (total > 0) {
      const sortedVotes = [...emotionVotes].sort((a, b) => b.count - a.count);
      setHighestVote(sortedVotes[0]);
    } else {
      setHighestVote(null);
    }
  }, [ratings]);

  // ... (rest of the component unchanged)

  return (
    <div className="card w-full bg-base-100 shadow-xl text-neutral lg:max-w-3xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-center justify-center mb-4">{title}</h2>
        <div className="flex justify-center mb-6">
          <div className="badge badge-lg badge-primary">{totalVotes} total votes</div>
        </div>
        {highestVote && totalVotes > 0 ? (
          <div className="flex flex-col items-center mb-6">
            <div className="stat-title text-center">Top Rating</div>
            <div className="flex items-center justify-center mt-2">
              <div
                className={`stat-value text-4xl p-4 rounded-full flex items-center justify-center ${highestVote.emotion.color.split(" ")[0]}`}
              >
                {highestVote.emotion.emoji}
              </div>
              <div className="ml-4">
                <div className="font-bold text-lg">{highestVote.emotion.label}</div>
                <div className="text-sm opacity-70">{highestVote.count} votes</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-6 opacity-70">No votes yet</div>
        )}
        <div className="space-y-4">
          {votesData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-10 text-center mr-2">{item.emotion.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium">{item.emotion.label}</span>
                  <span className="text-xs opacity-70 ml-auto">{item.count} votes</span>
                </div>
                <progress
                  className={`progress ${getDaisyUIColorClass(item.emotion.color)} w-full`}
                  value={totalVotes > 0 ? (item.count / totalVotes) * 100 : 0}
                  max="100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getDaisyUIColorClass(tailwindClass: string): string {
  if (tailwindClass.includes("pink")) return "progress-secondary";
  if (tailwindClass.includes("yellow")) return "progress-warning";
  if (tailwindClass.includes("purple")) return "progress-primary";
  if (tailwindClass.includes("blue")) return "progress-info";
  if (tailwindClass.includes("orange")) return "progress-error";
  if (tailwindClass.includes("green")) return "progress-success";
  if (tailwindClass.includes("teal")) return "progress-success";
  if (tailwindClass.includes("indigo")) return "progress-info";
  if (tailwindClass.includes("gray")) return "progress-error";
  return "progress-primary";
}

export default EmotionResults;