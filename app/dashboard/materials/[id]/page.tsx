"use client"

import { useAuth } from "@/lib/auth-context"
import { useSellerProducts } from "@/lib/seller-products-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function MaterialDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth()
  const { getProductById } = useSellerProducts()
  const router = useRouter()

  const product = getProductById(params.id)

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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-6 bg-transparent">
              <ChevronLeft size={18} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">Material not found</p>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-transparent">
              <ChevronLeft size={18} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/dashboard/materials/${params.id}/edit`}>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Edit Material</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="space-y-4">
                {product.images.length > 0 ? (
                  <>
                    <div className="relative">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-lg bg-gray-100"
                      />
                    </div>
                    {product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image || "/placeholder.svg"}
                            alt={`View ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">No images available</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Description Section */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About this Material</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Specifications</h4>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">•</span>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Minimum Order</p>
                      <p className="font-semibold text-gray-900">{product.minimumOrder}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lead Time</p>
                      <p className="font-semibold text-gray-900">{product.leadTime}</p>
                    </div>
                    {product.certifications.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Certifications</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.certifications.map((cert) => (
                            <Badge key={cert} variant="outline">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <Badge className="bg-emerald-100 text-emerald-700">{product.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-blue-100 text-blue-700">{product.listingType}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold text-gray-900">{product.condition}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Quantity Available</p>
                  <p className="text-3xl font-bold text-emerald-600">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-bold text-emerald-600">{product.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{product.location}</p>
                </div>
              </div>
            </Card>

            {/* Seller Info Card */}
            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-4">Seller Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-semibold text-gray-900">{product.seller.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-semibold text-gray-900">{product.seller.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{product.seller.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-sm text-gray-900">
                    {product.seller.address}, {product.seller.city}, {product.seller.state} {product.seller.zipCode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-semibold text-gray-900">
                    ⭐ {product.seller.rating} ({product.seller.reviews} reviews)
                  </p>
                </div>
              </div>
            </Card>

            {/* Listed Date */}
            <Card className="p-6 bg-gray-50">
              <p className="text-sm text-gray-600">Listed on</p>
              <p className="font-semibold text-gray-900">
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
