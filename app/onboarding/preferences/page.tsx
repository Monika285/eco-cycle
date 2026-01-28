"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

const MATERIALS = ["Plastics", "Textiles", "Electronics", "Wood", "Metals", "Paper", "Glass", "Ceramics"]

const PieChart = ({ buying, selling, donating }: { buying: number; selling: number; donating: number }) => {
  const total = buying + selling + donating
  if (total === 0) return null

  const buyingPercent = (buying / total) * 100
  const sellingPercent = (selling / total) * 100
  const donatingPercent = (donating / total) * 100

  const getPath = (startPercent: number, endPercent: number, color: string) => {
    const startAngle = (startPercent / 100) * 360 - 90
    const endAngle = (endPercent / 100) * 360 - 90
    const radius = 45
    const circumference = 2 * Math.PI * radius

    const startOffset = (startPercent / 100) * circumference
    const endOffset = (endPercent / 100) * circumference

    return { offset: startOffset, length: endOffset - startOffset, color }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
        <circle cx="80" cy="80" r="45" fill="none" stroke="currentColor" strokeWidth="30" className="text-emerald-500" />
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          strokeDasharray={`${(buyingPercent / 100) * 283} 283`}
          className="text-emerald-500"
        />
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          strokeDasharray={`${(sellingPercent / 100) * 283} 283`}
          strokeDashoffset={-((buyingPercent / 100) * 283)}
          className="text-teal-500"
        />
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          strokeDasharray={`${(donatingPercent / 100) * 283} 283`}
          strokeDashoffset={-(((buyingPercent + sellingPercent) / 100) * 283)}
          className="text-blue-500"
        />
      </svg>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="font-bold text-emerald-600">{buying}%</div>
          <div className="text-gray-600">Buying</div>
        </div>
        <div>
          <div className="font-bold text-teal-600">{selling}%</div>
          <div className="text-gray-600">Selling</div>
        </div>
        <div>
          <div className="font-bold text-blue-600">{donating}%</div>
          <div className="text-gray-600">Donating</div>
        </div>
      </div>
    </div>
  )
}

export default function PreferencesPage() {
  const { user, updatePreferences } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedFocus, setSelectedFocus] = useState("")
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedFrequency, setSelectedFrequency] = useState("")
  const [contributions, setContributions] = useState({
    buying: 33,
    selling: 33,
    donating: 34,
  })
  const [environmentImpact, setEnvironmentImpact] = useState({
    monthlyWasteGoal: 100,
    carbonReductionGoal: 50,
    productsPerMonth: 5,
    donationGoal: 10,
  })

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
  }

  // Skip if already completed preferences
  if (user.preferences?.completedPreferences) {
    router.push("/dashboard")
    return null
  }

  const handleToggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    )
  }

  const handleContributionChange = (key: string, value: number) => {
    const newValue = Math.max(0, Math.min(100, value))
    const others = Object.keys(contributions).filter((k) => k !== key)
    const total = newValue + contributions[others[0] as keyof typeof contributions] + contributions[others[1] as keyof typeof contributions]

    if (total <= 100) {
      setContributions((prev) => ({
        ...prev,
        [key]: newValue,
      }))
    }
  }

  const handleNext = () => {
    if (step === 1 && !selectedFocus) {
      alert("Please select how you want to contribute")
      return
    }
    if (step === 2 && selectedMaterials.length === 0) {
      alert("Please select at least one material type")
      return
    }
    if (step === 3 && !selectedFrequency) {
      alert("Please select your contribution frequency")
      return
    }

    if (step < 5) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      await updatePreferences({
        contributionFocus: selectedFocus as "buying" | "selling" | "donating" | "balanced",
        materialInterests: selectedMaterials,
        frequency: selectedFrequency as "occasional" | "regular" | "frequent",
        donationPercentage: contributions.donating,
        buyingPercentage: contributions.buying,
        sellingPercentage: contributions.selling,
        environmentImpact: environmentImpact,
        completedPreferences: true,
      })
      router.push("/dashboard")
    } catch (error) {
      alert("Failed to save preferences")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Personalize Your Impact</h1>
          <p className="text-lg text-gray-600">Tell us how you want to contribute to the circular economy</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? "bg-emerald-600 w-8" : "bg-gray-300 w-4"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Contribution Focus */}
        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How do you want to contribute?</h2>
              <p className="text-gray-600">Choose the primary way you want to impact the circular economy</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "buying",
                  title: "Buying Recycled Materials",
                  desc: "Purchase reusable materials for manufacturing or projects",
                  icon: "🛒",
                },
                {
                  id: "selling",
                  title: "Selling Materials",
                  desc: "Sell your waste materials and byproducts to others",
                  icon: "📦",
                },
                {
                  id: "donating",
                  title: "Donating & Giving",
                  desc: "Donate materials and support community initiatives",
                  icon: "🤝",
                },
                {
                  id: "balanced",
                  title: "Balanced Approach",
                  desc: "Mix of buying, selling, and donating based on situation",
                  icon: "⚖️",
                },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFocus(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    selectedFocus === option.id
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{option.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    </div>
                    {selectedFocus === option.id && (
                      <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Material Interests */}
        {step === 2 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which materials interest you most?</h2>
              <p className="text-gray-600">Select the material types you want to focus on (select at least one)</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {MATERIALS.map((material) => (
                <button
                  key={material}
                  onClick={() => handleToggleMaterial(material)}
                  className={`p-3 rounded-lg border-2 transition text-center font-medium ${
                    selectedMaterials.includes(material)
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300"
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 3: Frequency */}
        {step === 3 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How often will you participate?</h2>
              <p className="text-gray-600">This helps us customize your experience and recommendations</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "occasional", title: "Occasional", desc: "A few times a year", color: "blue" },
                { id: "regular", title: "Regular", desc: "Several times a month", color: "emerald" },
                { id: "frequent", title: "Frequent", desc: "Weekly or more often", color: "teal" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFrequency(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    selectedFrequency === option.id
                      ? `border-${option.color}-600 bg-${option.color}-50`
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    </div>
                    {selectedFrequency === option.id && (
                      <CheckCircle2 className={`text-${option.color}-600 flex-shrink-0`} size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 4: Contribution Breakdown */}
        {step === 4 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Adjust Your Contribution Mix</h2>
              <p className="text-gray-600">How would you like to balance your activities? (Total must equal 100%)</p>
            </div>

            <div className="space-y-6">
              {[
                { key: "buying", label: "Buying Materials", icon: "🛒", color: "emerald" },
                { key: "selling", label: "Selling Materials", icon: "📦", color: "teal" },
                { key: "donating", label: "Donating", icon: "🤝", color: "blue" },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-900 font-medium">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={contributions[item.key as keyof typeof contributions]}
                      onChange={(e) => handleContributionChange(item.key, parseInt(e.target.value))}
                      className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-${item.color}-500 h-3 rounded-full transition-all`}
                      style={{ width: `${contributions[item.key as keyof typeof contributions]}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span
                    className={`text-xl font-bold ${
                      contributions.buying + contributions.selling + contributions.donating === 100
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {contributions.buying + contributions.selling + contributions.donating}%
                  </span>
                </div>
              </div>
            </div>

            {/* Pie Chart Preview */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-gray-900 mb-6">Your Contribution Mix</h3>
              <div className="flex justify-center">
                <PieChart
                  buying={contributions.buying}
                  selling={contributions.selling}
                  donating={contributions.donating}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 5: Environment Impact Goals */}
        {step === 5 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Environmental Impact Goals</h2>
              <p className="text-gray-600">These goals help us track your positive impact on the environment</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Monthly Waste Goal (kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={environmentImpact.monthlyWasteGoal}
                  onChange={(e) =>
                    setEnvironmentImpact((prev) => ({
                      ...prev,
                      monthlyWasteGoal: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="e.g., 100"
                />
                <p className="text-sm text-gray-600 mt-2">How much waste do you want to recycle monthly?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Carbon Reduction Goal (kg CO2 per month)
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={environmentImpact.carbonReductionGoal}
                  onChange={(e) =>
                    setEnvironmentImpact((prev) => ({
                      ...prev,
                      carbonReductionGoal: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="e.g., 50"
                />
                <p className="text-sm text-gray-600 mt-2">Approximate CO2 emissions you want to avoid</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Products to Buy/Sell Per Month
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={environmentImpact.productsPerMonth}
                  onChange={(e) =>
                    setEnvironmentImpact((prev) => ({
                      ...prev,
                      productsPerMonth: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="e.g., 5"
                />
                <p className="text-sm text-gray-600 mt-2">Number of items you plan to trade monthly</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Donation Items Goal Per Month
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={environmentImpact.donationGoal}
                  onChange={(e) =>
                    setEnvironmentImpact((prev) => ({
                      ...prev,
                      donationGoal: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="e.g., 10"
                />
                <p className="text-sm text-gray-600 mt-2">Items you want to donate to community</p>
              </div>

              {/* Impact Summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Annual Impact Projection</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Waste Recycled</p>
                    <p className="text-xl font-bold text-emerald-600">{environmentImpact.monthlyWasteGoal * 12} kg/year</p>
                  </div>
                  <div>
                    <p className="text-gray-600">CO2 Avoided</p>
                    <p className="text-xl font-bold text-emerald-600">{environmentImpact.carbonReductionGoal * 12} kg/year</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Products Traded</p>
                    <p className="text-xl font-bold text-teal-600">{environmentImpact.productsPerMonth * 12}/year</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Items Donated</p>
                    <p className="text-xl font-bold text-blue-600">{environmentImpact.donationGoal * 12}/year</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            {step === 5 ? "Complete Setup" : "Next"}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
