"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock upcycled products
const mockProducts = [
  {
    id: 1,
    title: "Recycled Ocean Plastic Sunglasses",
    price: "$45.00",
    image: "/upcycled-sunglasses.jpg",
    creator: "EcoVision Studio",
    rating: 4.9,
    reviews: 234,
    impact: "Prevents 2kg plastic from ocean",
    category: "Accessories",
  },
  {
    id: 2,
    title: "Handmade Textile Patchwork Bag",
    price: "$89.00",
    image: "/upcycled-textile-bag.jpg",
    creator: "Textile Artisans",
    rating: 4.8,
    reviews: 156,
    impact: "Saves 1.5kg textile waste",
    category: "Fashion",
  },
  {
    id: 3,
    title: "Reclaimed Wood Desk Organizer",
    price: "$65.00",
    image: "/wood-organizer.jpg",
    creator: "Sustainable Woodworks",
    rating: 4.7,
    reviews: 98,
    impact: "Upcycles 3kg of reclaimed wood",
    category: "Home",
  },
  {
    id: 4,
    title: "Circuit Board Wall Art",
    price: "$120.00",
    image: "/electronics-art.jpg",
    creator: "Digital Craftworks",
    rating: 5.0,
    reviews: 45,
    impact: "Diverts 500g e-waste",
    category: "Art",
  },
  {
    id: 5,
    title: "Upcycled Leather Notebook",
    price: "$35.00",
    image: "/leather-notebook.jpg",
    creator: "Eco Pages Studio",
    rating: 4.6,
    reviews: 178,
    impact: "Prevents 800g leather waste",
    category: "Stationery",
  },
  {
    id: 6,
    title: "Plastic Bottle Planter Set",
    price: "$42.00",
    image: "/plastic-planter.jpg",
    creator: "Green Crafts Co.",
    rating: 4.8,
    reviews: 267,
    impact: "Recycles 6 plastic bottles",
    category: "Garden",
  },
]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("popular")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Upcycled Products</h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful, eco-friendly products created by talented artisans from reclaimed materials. Every purchase
            supports the circular economy.
          </p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {mockProducts.length} products</div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover bg-gray-100"
                />
                <div className="p-6">
                  <Badge className="bg-teal-100 text-teal-700 mb-3">{product.category}</Badge>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-sm">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-1">{product.creator}</p>
                  <p className="text-sm text-emerald-600 font-medium mb-4">{product.impact}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
