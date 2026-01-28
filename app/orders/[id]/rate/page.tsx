"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function RateOrderPage() {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [selectedAspects, setSelectedAspects] = useState<string[]>([])

  const aspects = ["Quality", "Communication", "Shipping Speed", "Packaging", "Accuracy"]

  const toggleAspect = (aspect: string) => {
    setSelectedAspects((prev) => (prev.includes(aspect) ? prev.filter((a) => a !== aspect) : [...prev, aspect]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Rating submitted:", { rating, review, selectedAspects })
    router.push("/orders")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rate Your Order</h1>
          <p className="text-gray-600">Help us and other buyers by sharing your experience with this seller</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div>
              <label className="text-lg font-semibold text-gray-900 block mb-4">Overall Rating</label>
              <div className="flex gap-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <span
                      className={`text-6xl ${(hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-gray-600">
                {rating === 1 && "Poor - Would not recommend"}
                {rating === 2 && "Fair - Some issues"}
                {rating === 3 && "Good - Meets expectations"}
                {rating === 4 && "Very Good - Excellent experience"}
                {rating === 5 && "Excellent - Highly recommend"}
              </p>
            </div>

            {/* Aspect Ratings */}
            <div>
              <label className="text-lg font-semibold text-gray-900 block mb-4">
                What went well? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {aspects.map((aspect) => (
                  <button
                    key={aspect}
                    type="button"
                    onClick={() => toggleAspect(aspect)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedAspects.includes(aspect)
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-gray-200 bg-white text-gray-900"
                    }`}
                  >
                    <span className="font-medium">{aspect}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Written Review */}
            <div>
              <label htmlFor="review" className="text-lg font-semibold text-gray-900 block mb-4">
                Your Review (Optional)
              </label>
              <Textarea
                id="review"
                placeholder="Share details about your experience. What did you like? Any suggestions for improvement?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-40"
              />
              <p className="text-sm text-gray-500 mt-2">{review.length}/500 characters</p>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                Skip
              </Button>
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Submit Review
              </Button>
            </div>
          </form>
        </Card>

        {/* Why Reviews Matter */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">Why Your Review Matters</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>Helps other buyers make informed decisions</li>
            <li>Encourages sellers to maintain high standards</li>
            <li>Builds trust and transparency in the EchoCycle community</li>
            <li>Your feedback helps improve platform quality</li>
          </ul>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
