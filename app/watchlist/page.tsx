"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWatchlist } from "@/lib/watchlist-context"
import { useCart } from "@/lib/cart-context"
import { Heart, ChevronLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ContactSellerDialog } from "@/components/contact-seller-dialog"

export default function WatchlistPage() {
  const { items, removeFromWatchlist } = useWatchlist()
  const { addItem } = useCart()
  const [contactDialog, setContactDialog] = useState<{
    isOpen: boolean
    sellerName: string
    sellerLocation: string
    materialTitle: string
  }>({
    isOpen: false,
    sellerName: "",
    sellerLocation: "",
    materialTitle: "",
  })

  const handleContactSeller = (seller: string, location: string, material: string) => {
    setContactDialog({
      isOpen: true,
      sellerName: seller,
      sellerLocation: location,
      materialTitle: material,
    })
  }

  const handleBuy = (item: any) => {
    // Extract price and unit from format like "$0.75/kg" or just "$35"
    const priceStr = item.price.replace("$", "").split("/")[0]
    const price = parseFloat(priceStr) || 0
    
    // Extract unit if available (e.g., "kg", "piece", "unit")
    const unitMatch = item.price.match(/\/(.+)$/)
    const unit = unitMatch ? unitMatch[1] : "unit"

    const cartItem: any = {
      id: item.id,
      title: item.title,
      category: item.category,
      quantity: 1,
      unit: unit,
      price: price,
      seller: item.seller,
      totalPrice: price * 1,
      listingType: "sell",
    }
    addItem(cartItem)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/marketplace" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4">
            <ChevronLeft className="w-5 h-5" />
            Back to Marketplace
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">My Watchlist</h1>
          <p className="text-gray-600 mt-2">{items.length} items saved</p>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-600 mb-6">
              Start adding materials to your watchlist to keep track of items you're interested in.
            </p>
            <Link href="/marketplace">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Marketplace</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="hidden sm:block w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <Badge className="bg-emerald-100 text-emerald-700 mb-2">{item.category}</Badge>
                        <Link href={`/marketplace/${item.id}`}>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition cursor-pointer">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">{item.condition}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-emerald-600">{item.price}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Added {new Date(item.addedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Quantity</p>
                        <p className="font-semibold text-gray-900">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{item.location}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <p className="text-gray-600">Seller</p>
                        <p className="font-semibold text-gray-900">{item.seller}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <Link href="/checkout" onClick={() => handleBuy(item)}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
                          <ShoppingCart size={18} />
                          Buy Now
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleContactSeller(item.seller, item.location, item.title)}
                        variant="outline"
                        className="bg-transparent"
                      >
                        Contact Seller
                      </Button>
                      <Link href={`/marketplace/${item.id}`}>
                        <Button variant="outline" className="bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 border-red-200 bg-transparent"
                        onClick={() => removeFromWatchlist(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ContactSellerDialog
        isOpen={contactDialog.isOpen}
        onClose={() => setContactDialog({ ...contactDialog, isOpen: false })}
        sellerName={contactDialog.sellerName}
        sellerLocation={contactDialog.sellerLocation}
        materialTitle={contactDialog.materialTitle}
      />

      <Footer />
    </div>
  )
}
