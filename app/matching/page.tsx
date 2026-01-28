"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Match {
  id: string
  partnerName: string
  partnerType: "seller" | "buyer" | "artisan"
  location: string
  materialType: string
  quantity: string
  matchScore: number
  distance: number
  carbonSavings: number
  reason: string
}

// Mock matching data
const mockMatches: Match[] = [
  {
    id: "1",
    partnerName: "GreenPlas Co.",
    partnerType: "seller",
    location: "San Francisco, CA",
    materialType: "Recycled Plastic Pellets",
    quantity: "500kg",
    matchScore: 98,
    distance: 5,
    carbonSavings: 125,
    reason: "Perfect match for your plastic sourcing needs. Grade A quality, excellent ratings.",
  },
  {
    id: "2",
    partnerName: "Sustainable Woodworks",
    partnerType: "seller",
    location: "Oakland, CA",
    materialType: "Reclaimed Oak Planks",
    quantity: "200 pieces",
    matchScore: 92,
    distance: 15,
    carbonSavings: 280,
    reason: "Specializes in premium wood materials. 4.9 rating with 200+ reviews.",
  },
  {
    id: "3",
    partnerName: "EcoVision Studio",
    partnerType: "artisan",
    location: "San Jose, CA",
    materialType: "Electronic Scrap",
    quantity: "50kg monthly",
    matchScore: 87,
    distance: 50,
    carbonSavings: 95,
    reason: "Seeking electronics for art projects. Great local logistics optimization.",
  },
  {
    id: "4",
    partnerName: "Textile Artisans Studio",
    partnerType: "seller",
    location: "Austin, TX",
    materialType: "Vintage Denim Bulk",
    quantity: "100kg",
    matchScore: 85,
    distance: 1800,
    carbonSavings: 200,
    reason: "High-quality textiles. Could ship via consolidated routes.",
  },
  {
    id: "5",
    partnerName: "Fashion Upcycle Hub",
    partnerType: "artisan",
    location: "Los Angeles, CA",
    materialType: "Polyester Scraps",
    quantity: "75kg",
    matchScore: 81,
    distance: 380,
    carbonSavings: 150,
    reason: "Active buyer of textile materials. Established track record.",
  },
]

export default function MatchingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [filterType, setFilterType] = useState<"all" | "seller" | "buyer" | "artisan">("all")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return null
  }

  const filteredMatches = filterType === "all" ? mockMatches : mockMatches.filter((m) => m.partnerType === filterType)

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    return "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Matches</h1>
          <p className="text-xl text-gray-600">
            Our AI-powered system has found perfect matches for your materials based on type, quantity, location, and
            environmental impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-emerald-200 bg-emerald-50">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{mockMatches.length}</div>
            <p className="text-gray-700 font-medium">Potential Partners</p>
            <p className="text-sm text-gray-600 mt-1">Matched with your profile</p>
          </Card>

          <Card className="p-6 border-blue-200 bg-blue-50">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(mockMatches.reduce((sum, m) => sum + m.carbonSavings, 0) / 1000)}T
            </div>
            <p className="text-gray-700 font-medium">CO₂ Potential Savings</p>
            <p className="text-sm text-gray-600 mt-1">If all matches complete</p>
          </Card>

          <Card className="p-6 border-purple-200 bg-purple-50">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(mockMatches.reduce((sum, m) => sum + m.matchScore, 0) / mockMatches.length)}%
            </div>
            <p className="text-gray-700 font-medium">Average Match Quality</p>
            <p className="text-sm text-gray-600 mt-1">Based on AI analysis</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="matches">All Matches</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          </TabsList>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <Badge
                variant={filterType === "all" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${filterType === "all" ? "bg-emerald-600" : "border-gray-300"}`}
                onClick={() => setFilterType("all")}
              >
                All Matches
              </Badge>
              <Badge
                variant={filterType === "seller" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${filterType === "seller" ? "bg-emerald-600" : "border-gray-300"}`}
                onClick={() => setFilterType("seller")}
              >
                Sellers
              </Badge>
              <Badge
                variant={filterType === "buyer" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${filterType === "buyer" ? "bg-emerald-600" : "border-gray-300"}`}
                onClick={() => setFilterType("buyer")}
              >
                Buyers
              </Badge>
              <Badge
                variant={filterType === "artisan" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${filterType === "artisan" ? "bg-emerald-600" : "border-gray-300"}`}
                onClick={() => setFilterType("artisan")}
              >
                Artisans
              </Badge>
            </div>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {filteredMatches.map((match) => (
                  <Card
                    key={match.id}
                    className={`p-6 cursor-pointer transition-all border-2 ${
                      selectedMatch?.id === match.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{match.partnerName}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {match.location} • {match.distance}km away
                        </p>
                      </div>
                      <Badge className={`${getMatchScoreColor(match.matchScore)} text-lg font-bold px-3 py-1`}>
                        {match.matchScore}%
                      </Badge>
                    </div>

                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">Match Details</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Material:</span>
                          <p className="font-medium text-gray-900">{match.materialType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <p className="font-medium text-gray-900">{match.quantity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-emerald-600 font-semibold">{match.carbonSavings}kg</span>
                        <span className="text-gray-600 ml-1">CO₂ savings</span>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {match.partnerType}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Details Panel */}
              <div>
                {selectedMatch ? (
                  <Card className="p-6 sticky top-20">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedMatch.partnerName}</h3>

                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">{selectedMatch.matchScore}%</div>
                        <p className="text-sm text-gray-700">Match Quality Score</p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Material Type</span>
                          <p className="font-medium text-gray-900">{selectedMatch.materialType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity Available</span>
                          <p className="font-medium text-gray-900">{selectedMatch.quantity}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Distance</span>
                          <p className="font-medium text-gray-900">{selectedMatch.distance}km</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Carbon Impact</span>
                          <p className="font-medium text-emerald-600">{selectedMatch.carbonSavings}kg CO₂</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Why this match?</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{selectedMatch.reason}</p>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mb-3">Contact Partner</Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Card>
                ) : (
                  <Card className="p-6 sticky top-20 text-center">
                    <p className="text-gray-600">Select a match to see details</p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how-it-works" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Our Smart Matching Works</h3>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Material Analysis</h4>
                    <p className="text-gray-600">
                      We analyze the materials you're offering or seeking, including type, quantity, condition, and
                      specifications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Location Optimization</h4>
                    <p className="text-gray-600">
                      Our algorithm finds partners near you to minimize shipping distances and reduce carbon emissions
                      from logistics.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Partner Matching</h4>
                    <p className="text-gray-600">
                      We match you with sellers, buyers, and artisans who need exactly what you have or can best use
                      your materials.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Impact Calculation</h4>
                    <p className="text-gray-600">
                      We calculate the environmental impact of each potential transaction, including waste diverted and
                      CO₂ savings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Direct Connection</h4>
                    <p className="text-gray-600">
                      You're connected directly with matched partners to negotiate terms, complete transactions, and
                      build lasting relationships.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Matching Factors */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Consider in Matching</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-emerald-200 rounded-lg bg-emerald-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Material Compatibility</h4>
                  <p className="text-sm text-gray-600">
                    Perfect matches for material type, quantity, and quality level
                  </p>
                </div>

                <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Geographic Proximity</h4>
                  <p className="text-sm text-gray-600">Reduced shipping distances to minimize carbon footprint</p>
                </div>

                <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Partner Ratings</h4>
                  <p className="text-sm text-gray-600">High-quality, trusted partners with proven track records</p>
                </div>

                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Environmental Impact</h4>
                  <p className="text-sm text-gray-600">Maximizing waste diverted and emissions avoided</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
