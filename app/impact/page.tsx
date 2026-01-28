"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"

const impactData = {
  totalWasteSaved: 5200,
  totalCO2Avoided: 2100,
  totalWaterSaved: 45000,
  itemsProcessed: 28,
  donationsProvided: 3,
  carbonCreditsEarned: 42,
  communityContribution: 85,
  monthlyTrend: [
    { month: "Sep", waste: 400, co2: 160, water: 3200 },
    { month: "Oct", waste: 650, co2: 260, water: 5200 },
    { month: "Nov", waste: 920, co2: 368, water: 7360 },
    { month: "Dec", waste: 1200, co2: 480, water: 9600 },
    { month: "Jan", waste: 2030, co2: 812, water: 16240 },
  ],
  materialBreakdown: [
    { type: "Plastics", amount: 2100, percentage: 40 },
    { type: "Textiles", amount: 1560, percentage: 30 },
    { type: "Wood", amount: 1040, percentage: 20 },
    { type: "Electronics", amount: 500, percentage: 10 },
  ],
  badges: [
    { id: 1, name: "Eco Starter", desc: "Completed first transaction", icon: "🌱" },
    { id: 2, name: "Waste Warrior", desc: "Diverted 1000kg of waste", icon: "⚔️" },
    { id: 3, name: "Carbon Crusher", desc: "Avoided 500kg of CO2", icon: "💪" },
    { id: 4, name: "Generous Giver", desc: "Donated 3+ times", icon: "🎁" },
  ],
  equivalents: [
    { label: "Trees Saved", value: 15, icon: "🌳" },
    { label: "Car Emissions Avoided", value: 4.2, unit: "weeks", icon: "🚗" },
    { label: "Landfill Space", value: 5.2, unit: "cubic meters", icon: "🗑️" },
  ],
}

export default function ImpactPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Environmental Impact</h1>
          <p className="text-xl text-gray-600">
            Track your contribution to a circular economy and see the real-world environmental benefit of your actions.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
            <p className="text-gray-600 text-sm font-medium">Total Waste Diverted</p>
            <p className="text-4xl font-bold text-emerald-600 mt-2">{impactData.totalWasteSaved}</p>
            <p className="text-xs text-gray-600 mt-2">Kilograms saved from landfills</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
            <p className="text-gray-600 text-sm font-medium">CO₂ Emissions Avoided</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{impactData.totalCO2Avoided}</p>
            <p className="text-xs text-gray-600 mt-2">Metric tons of carbon offset</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-white">
            <p className="text-gray-600 text-sm font-medium">Water Conserved</p>
            <p className="text-4xl font-bold text-cyan-600 mt-2">{impactData.totalWaterSaved.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-2">Liters saved in production</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
            <p className="text-gray-600 text-sm font-medium">Transactions Completed</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{impactData.itemsProcessed}</p>
            <p className="text-xs text-gray-600 mt-2">Material exchanges on platform</p>
          </Card>
        </div>

        {/* Real-World Equivalents */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Impact in Real-World Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactData.equivalents.map((eq, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl mb-2">{eq.icon}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {eq.value}
                  {eq.unit && <span className="text-lg text-gray-600 ml-2">{eq.unit}</span>}
                </p>
                <p className="text-gray-600 mt-2">{eq.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="reports">CSR Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Monthly Trend */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact Trend (Last 5 Months)</h3>
              <div className="space-y-6">
                {impactData.monthlyTrend.map((month, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{month.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-emerald-600">Waste: {month.waste}kg</span>
                        <span className="text-blue-600">CO₂: {month.co2}kg</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-blue-400 h-3 rounded-full"
                        style={{ width: `${(month.waste / impactData.totalWasteSaved) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contribution Breakdown */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How You're Contributing</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Direct Material Recycling</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Upcycled Products Support</span>
                    <span className="font-medium text-gray-900">22%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Community Donations</span>
                    <span className="font-medium text-gray-900">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Material Type Breakdown</h3>
              {user?.preferences?.completedPreferences && user.preferences.materialInterests.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Showing materials based on your interests: {user.preferences.materialInterests.join(", ")}
                  </p>
                  {impactData.materialBreakdown
                    .filter((m) => user.preferences?.materialInterests.includes(m.type))
                    .map((material, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">{material.type}</span>
                          <div className="flex gap-4 items-center">
                            <span className="text-emerald-600 font-medium">{material.amount}kg</span>
                            <span className="text-gray-600 text-sm">{material.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-emerald-500 h-3 rounded-full"
                            style={{ width: `${material.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {impactData.materialBreakdown.map((material, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{material.type}</span>
                        <div className="flex gap-4 items-center">
                          <span className="text-emerald-600 font-medium">{material.amount}kg</span>
                          <span className="text-gray-600 text-sm">{material.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-emerald-500 h-3 rounded-full"
                          style={{ width: `${material.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievement Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {impactData.badges.map((badge) => (
                  <div key={badge.id} className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50">
                    <p className="text-4xl mb-3">{badge.icon}</p>
                    <h4 className="font-bold text-gray-900">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{badge.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 mb-3">
                  <span className="font-semibold">Next Achievement:</span> Carbon Master - Avoid 1000kg of CO₂
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
                <p className="text-sm text-blue-800 mt-2">670kg of 1000kg needed</p>
              </div>
            </Card>
          </TabsContent>

          {/* CSR Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Social Responsibility Reports</h3>
              <p className="text-gray-600 mb-6">
                Generate downloadable sustainability reports for corporate clients and ESG initiatives.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Annual Sustainability Report 2024</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Comprehensive ESG metrics and environmental impact summary
                      </p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Download PDF</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Q4 2024 CSR Summary</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Quarterly sustainability metrics and compliance documentation
                      </p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Download PDF</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Report Generator</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Create tailored reports based on date range and metrics
                      </p>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Create Custom Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Report Details */}
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4">2024 Annual Report Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Global Impact</p>
                      <p className="text-sm text-gray-600">Contributed to planetary waste reduction</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-semibold text-gray-900">Data Transparency</p>
                      <p className="text-sm text-gray-600">Verified metrics & third-party validation</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-900">Compliance Ready</p>
                      <p className="text-sm text-gray-600">Meets UN SDG and ESG standards</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                      <p className="font-semibold text-gray-900">Secure Export</p>
                      <p className="text-sm text-gray-600">Blockchain-verified impact data</p>
                    </div>
                  </div>
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
