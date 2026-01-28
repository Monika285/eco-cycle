"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useSellerProducts } from "@/lib/seller-products-context"
import Link from "next/link"
import { Trash2, Edit2 } from "lucide-react"

export default function SellerDashboard() {
  const { user } = useAuth()
  const { getProductsBySeller, deleteProduct } = useSellerProducts()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const products = user ? getProductsBySeller(user.id) : []

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600">Please sign in</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-xl text-gray-600">Manage your listed materials and track sales</p>
          </div>
          <Link href="/seller/upload-product">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Upload New Product</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Listings", value: products.length, color: "emerald" },
            { label: "Total Sales", value: "$2,450", color: "blue" },
            { label: "Seller Rating", value: "4.8/5", color: "yellow" },
            { label: "Response Rate", value: "98%", color: "purple" },
          ].map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Products List */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products uploaded yet</p>
              <Link href="/seller/upload-product">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Upload Your First Product</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.quantity} • {product.location}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                            {product.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              product.listingType === "sell"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {product.listingType === "sell" ? "For Sale" : "Donation"}
                          </Badge>
                          <Badge variant="outline">{product.condition}</Badge>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-emerald-600">{product.price}</p>
                        <div className="flex gap-2 mt-4">
                          <Link href={`/marketplace/${product.id}`}>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              View
                            </Button>
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(product.id)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
                          >
                            <Trash2 size={16} className="inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Delete Confirmation Dialog */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 max-w-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Product?</h3>
              <p className="text-gray-600 mb-6">This action cannot be undone.</p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    deleteProduct(confirmDelete)
                    setConfirmDelete(null)
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
