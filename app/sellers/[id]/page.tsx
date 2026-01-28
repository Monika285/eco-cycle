"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const sellerProfile = {
  id: "seller-001",
  name: "GreenPlas Co.",
  category: "Plastics Recycling",
  location: "San Francisco, CA",
  joinDate: "2023-06-15",
  verified: true,
  rating: 4.8,
  reviewCount: 127,
  responseTime: "2 hours",
  successRate: 99.2,
  bio: "Leading provider of high-quality recycled plastic pellets and materials for manufacturers and artisans. Committed to sustainable waste management.",
  certifications: ["ISO 14001", "REACH Compliant", "Fair Trade Certified"],
  avatar: "GP",
  followers: 450,
  successfulTransactions: 287,
  totalMaterialsSold: 52400,
  trustBadges: [
    { label: "Verified Seller", desc: "Identity and business verified" },
    { label: "Top Rated", desc: "Consistently 4.5+ rating" },
    { label: "Reliable", desc: "99%+ completion rate" },
    { label: "Responsive", desc: "Replies within 2 hours" },
  ],
  reviews: [
    {
      id: 1,
      author: "Eco Artisan Studio",
      rating: 5,
      date: "2024-01-10",
      title: "Excellent quality pellets!",
      text: "Outstanding material quality and fast shipping. Exactly as described. Highly recommend!",
      helpful: 23,
      verified: true,
    },
    {
      id: 2,
      author: "Sustainable Goods Co.",
      rating: 5,
      date: "2024-01-05",
      title: "Great communication",
      text: "Very responsive seller. All questions answered promptly. Materials arrived in perfect condition.",
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      author: "Upcycle Ventures",
      rating: 4,
      date: "2023-12-28",
      title: "Good quality, minor delay",
      text: "Materials are excellent quality. Shipping took longer than expected but product is great.",
      helpful: 12,
      verified: true,
    },
  ],
  ratingDistribution: [
    { stars: 5, count: 115, percentage: 91 },
    { stars: 4, count: 10, percentage: 8 },
    { stars: 3, count: 2, percentage: 1 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ],
  policies: {
    returns: "Full refund within 14 days if materials don't match description",
    shipping: "Free shipping on orders over 500kg. Standard rates for smaller orders.",
    quality: "Grade A materials guaranteed. 99%+ purity certification included.",
  },
}

export default function SellerProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Seller Header */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {sellerProfile.avatar}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{sellerProfile.name}</h1>
                  <p className="text-gray-600 mt-1">{sellerProfile.category}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < Math.floor(sellerProfile.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{sellerProfile.rating}</span>
                    <span className="text-gray-600">({sellerProfile.reviewCount} reviews)</span>
                  </div>

                  {sellerProfile.verified && (
                    <Badge className="mt-3 bg-green-100 text-green-700">✓ Verified Seller</Badge>
                  )}
                </div>

                <Link href={`/marketplace?seller=${sellerProfile.id}`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">View Listings</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{sellerProfile.successfulTransactions}</p>
              <p className="text-sm text-gray-600 mt-1">Successful Sales</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{sellerProfile.successRate}%</p>
              <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                ~{(sellerProfile.totalMaterialsSold / 1000).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Metric Tons Sold</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-cyan-600">{sellerProfile.responseTime}</p>
              <p className="text-sm text-gray-600 mt-1">Avg Response Time</p>
            </Card>
          </div>

          {/* Trust Badges */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Trust Badges</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sellerProfile.trustBadges.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-emerald-200 bg-emerald-50">
                  <p className="text-sm font-semibold text-gray-900">{badge.label}</p>
                  <p className="text-xs text-gray-600 mt-1">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Rating Summary */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Rating Breakdown</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-4">
                    <p className="text-5xl font-bold text-gray-900">{sellerProfile.rating}</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${i < Math.floor(sellerProfile.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2">Based on {sellerProfile.reviewCount} reviews</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {sellerProfile.ratingDistribution.map((dist, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-600">{dist.stars} Star</span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${dist.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{dist.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {sellerProfile.reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        By {review.author}
                        {review.verified && <span className="text-green-600 ml-2">✓ Verified Purchase</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.text}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About {sellerProfile.name}</h3>
              <p className="text-gray-700 mb-6">{sellerProfile.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(sellerProfile.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg font-semibold text-gray-900">{sellerProfile.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="text-lg font-semibold text-gray-900">{sellerProfile.followers}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Returns & Refunds</h3>
              <p className="text-gray-700">{sellerProfile.policies.returns}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Shipping Policy</h3>
              <p className="text-gray-700">{sellerProfile.policies.shipping}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quality Guarantee</h3>
              <p className="text-gray-700">{sellerProfile.policies.quality}</p>
            </Card>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            {sellerProfile.certifications.map((cert, idx) => (
              <Card key={idx} className="p-6 border-l-4 border-l-emerald-600">
                <h3 className="font-bold text-gray-900">{cert}</h3>
                <p className="text-sm text-gray-600 mt-2">Verified and up to date</p>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
