"use client"

import { useAuth } from "@/lib/auth-context"
import { useSellerProducts } from "@/lib/seller-products-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const { getProductsBySeller } = useSellerProducts()
  const router = useRouter()

  // Get seller's products
  const sellerProducts = user ? getProductsBySeller(user.id) : []

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-1">Manage your EcoCycle profile and activities</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="bg-transparent">
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="inline-block bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium mt-2 capitalize">
                  {user.userType}
                </span>
              </p>
              <div className="mt-4 flex gap-4">
                <Link href="/dashboard/profile">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Edit Profile</Button>
                </Link>
              </div>
            </div>
            {user.rating && (
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">{user.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
                <div className="text-xs text-gray-500 mt-1">{user.reviews} reviews</div>
              </div>
            )}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Impact Metrics Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Environmental Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-emerald-200">
                  <div className="text-emerald-600 text-4xl font-bold mb-2">{user.impactStats?.wasteSaved || 0}</div>
                  <p className="text-gray-600 font-medium">kg Waste Saved</p>
                  <p className="text-sm text-gray-500 mt-1">Total materials diverted from landfills</p>
                </Card>

                <Card className="p-6 border-blue-200">
                  <div className="text-blue-600 text-4xl font-bold mb-2">{user.impactStats?.emissionsSaved || 0}</div>
                  <p className="text-gray-600 font-medium">kg CO₂ Avoided</p>
                  <p className="text-sm text-gray-500 mt-1">Equivalent carbon emissions prevented</p>
                </Card>

                <Card className="p-6 border-purple-200">
                  <div className="text-purple-600 text-4xl font-bold mb-2">{user.impactStats?.productsSold || 0}</div>
                  <p className="text-gray-600 font-medium">Items Processed</p>
                  <p className="text-sm text-gray-500 mt-1">Transactions completed on EchoCycle</p>
                </Card>
              </div>
            </div>



            {/* Impact Breakdown */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">How You're Contributing</h4>
                {user.preferences?.completedPreferences && (
                  <Link href="/onboarding/preferences">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Adjust
                    </Button>
                  </Link>
                )}
              </div>

              {user.preferences?.completedPreferences ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">🛒 Buying Materials</span>
                      <span className="font-medium text-gray-900">{user.preferences.buyingPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${user.preferences.buyingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">📦 Selling Materials</span>
                      <span className="font-medium text-gray-900">{user.preferences.sellingPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${user.preferences.sellingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">🤝 Community Donations</span>
                      <span className="font-medium text-gray-900">{user.preferences.donationPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${user.preferences.donationPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Preferences Summary */}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">Your Focus:</span> {user.preferences.contributionFocus}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">Participation:</span> {user.preferences.frequency}
                    </p>
                    {user.preferences.materialInterests.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Materials:</span> {user.preferences.materialInterests.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Complete your preferences to personalize your impact stats</p>
                  <Link href="/onboarding/preferences">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Complete Setup</Button>
                  </Link>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Your Materials</h3>
              <Link href="/marketplace/post-material">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Post New Material</Button>
              </Link>
            </div>

            {user.userType === "seller" && sellerProducts.length > 0 ? (
              <div className="grid gap-6">
                {sellerProducts.map((product) => (
                  <Card key={product.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{product.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{product.quantity} available</p>
                        <div className="flex gap-2 mt-3">
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {product.category}
                          </span>
                          <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                            {product.listingType === "sell" ? "Selling" : "Donating"}
                          </span>
                        </div>
                      </div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t flex gap-2">
                      <Link href={`/dashboard/materials/${product.id}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/dashboard/materials/${product.id}/edit`}>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : user.userType === "seller" ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">No materials listed yet</p>
                <Link href="/seller/upload-product">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Upload Your First Material</Button>
                </Link>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">Materials section is for sellers only</p>
              </Card>
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
            <div className="space-y-4">
              <Card className="p-6 border-l-4 border-l-emerald-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Listed Plastic Pellets</h4>
                    <p className="text-sm text-gray-600 mt-1">500kg | Grade A Condition</p>
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Purchased Textile Materials</h4>
                    <p className="text-sm text-gray-600 mt-1">75kg Polyester Scraps</p>
                  </div>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Completed Transaction</h4>
                    <p className="text-sm text-gray-600 mt-1">100kg Wood Planks Donated</p>
                  </div>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
