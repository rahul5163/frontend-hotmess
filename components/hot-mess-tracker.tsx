"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RotateCcwIcon } from "lucide-react"

interface SliderCategory {
  id: string
  label: string
  value: number
}

const sarcasticMessages = [
  "Wow, you're really holding it together! We're impressed.",
  "At least you're consistently chaotic. We love that for you.",
  "Your chaos energy is truly unmatched. Queen/King behavior!",
  "Hot mess express, all aboard! 🚂",
  "You're a beautiful disaster and we're here for it.",
  "This level of chaos takes dedication. Respect.",
  "Living your best chaotic life. No notes.",
  "You're not a hot mess, you're a SPICY disaster.",
  "Honestly? Iconic levels of dysfunction.",
  "Your life is a sitcom and you're the star.",
  "The universe said 'make it messy' and you delivered.",
  "Can't relate, but also... totally relate.",
]

export function HotMessTracker() {
  const [categories, setCategories] = useState<SliderCategory[]>([
    { id: "late", label: "Late to office", value: 0 },
    { id: "charger", label: "Lost charger", value: 0 },
    { id: "text", label: "Sent risky text", value: 0 },
    { id: "procrastination", label: "Procrastination", value: 0 },
  ])

  const [hotMessScore, setHotMessScore] = useState(0)
  const [message, setMessage] = useState("")
  const [savedScores, setSavedScores] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const total = categories.reduce((sum, cat) => sum + cat.value, 0)
    const score = Math.round((total / 400) * 100)
    setHotMessScore(score)
  }, [categories])

  const handleSliderChange = (id: string, value: number[]) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, value: value[0] } : cat)))
  }

  const getEmojiForScore = (score: number) => {
    if (score < 15) return "😇"
    if (score < 30) return "🙂"
    if (score < 50) return "😅"
    if (score < 70) return "😰"
    if (score < 85) return "🥵"
    return "🔥"
  }

  const saveScore = () => {
    const randomMessage = sarcasticMessages[Math.floor(Math.random() * sarcasticMessages.length)]
    setMessage(randomMessage)
    setSavedScores((prev) => [...prev, hotMessScore])
    setShowResult(true)

    setTimeout(() => {
      setShowResult(false)
    }, 5000)
  }

  const resetTracker = () => {
    setCategories((prev) => prev.map((cat) => ({ ...cat, value: 0 })))
    setMessage("")
    setShowResult(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#ffd9da] via-[#cc7178] to-[#89023e]"
        style={{
          background: "linear-gradient(135deg, #ffd9da 0%, #f3e1dd 25%, #cc7178 50%, #89023e 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <Card className="border-none bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center space-y-2 pb-4">
              <CardTitle className="text-3xl md:text-5xl font-bold text-[#89023e] text-balance">
                Hot Mess Tracker
              </CardTitle>
              <p className="text-sm md:text-base text-[#cc7178] text-pretty">
                {"Rate your chaos level today. No judgment... well, maybe a little."}
              </p>
            </CardHeader>

            <CardContent className="space-y-8 pt-4">
              {/* Emoji Face */}
              <div className="flex flex-col items-center gap-4">
                <div
                  className="text-7xl md:text-9xl transition-all duration-300 animate-pulse"
                  style={{
                    transform: `scale(${1 + hotMessScore / 200})`,
                  }}
                >
                  {getEmojiForScore(hotMessScore)}
                </div>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#89023e]">{hotMessScore}%</p>
                  <p className="text-sm text-[#cc7178] mt-1">Hot Mess Score</p>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm md:text-base font-medium text-[#89023e]">{category.label}</label>
                      <span className="text-sm font-semibold text-[#cc7178] min-w-[3ch] text-right">
                        {category.value}
                      </span>
                    </div>
                    <Slider
                      value={[category.value]}
                      onValueChange={(value) => handleSliderChange(category.id, value)}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Button
                  onClick={saveScore}
                  variant="outline"
                  size="lg"
                  className="font-semibold text-[#89023e] border-2 border-[#89023e] hover:bg-[#89023e] hover:text-white transition-colors bg-transparent"
                >
                  {"Save My Chaos"}
                </Button>
                <Button
                  onClick={resetTracker}
                  variant="outline"
                  size="icon"
                  className="border-2 border-[#cc7178] text-[#cc7178] hover:bg-[#cc7178] hover:text-white transition-colors bg-transparent"
                  aria-label="Reset"
                >
                  <RotateCcwIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Result Message */}
              {showResult && (
                <div className="mt-6 p-6 bg-gradient-to-r from-[#c7d9b7] to-[#f3e1dd] rounded-lg border-2 border-[#89023e] animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-center text-base md:text-lg font-semibold text-[#89023e] text-pretty">{message}</p>
                </div>
              )}

              {/* Saved Scores */}
              {savedScores.length > 0 && (
                <div className="mt-6 p-4 bg-[#f3e1dd]/50 rounded-lg">
                  <h3 className="text-sm font-semibold text-[#89023e] mb-2">{"Your Chaos History:"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {savedScores.slice(-10).map((score, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white rounded-full text-sm font-medium text-[#cc7178] border border-[#cc7178]"
                      >
                        {score}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
