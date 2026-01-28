"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSellerProducts } from "@/lib/seller-products-context"

const MATERIAL_TYPES = ["All", "Plastics", "Textiles", "Electronics", "Wood"]

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    title: "Premium Recycled Plastic Pellets",
    category: "Plastics",
    quantity: "500kg",
    location: "San Francisco, CA",
    price: "$2.50/kg",
    image: "/plastic-pellets.jpg",
    seller: "GreenPlas Co.",
    condition: "Grade A",
  },
  {
    id: 2,
    title: "Vintage Denim Bulk",
    category: "Textiles",
    quantity: "100kg",
    location: "Austin, TX",
    price: "Donating",
    image: "/denim-fabric.jpg",
    seller: "Textile Artisans Studio",
    condition: "Mixed Quality",
  },
  {
    id: 3,
    title: "Electronic Scrap - Copper & Gold",
    category: "Electronics",
    quantity: "50kg",
    location: "Seattle, WA",
    price: "$15.00/kg",
    image: "/circuit-boards.jpg",
    seller: "E-Cycle Innovations",
    condition: "For Processing",
  },
  {
    id: 4,
    title: "Reclaimed Oak Planks",
    category: "Wood",
    quantity: "200 pieces",
    location: "Portland, OR",
    price: "$5.00/piece",
    image: "/wood-planks.jpg",
    seller: "Sustainable Timber",
    condition: "Grade B",
  },
  {
    id: 5,
    title: "Polyester Scraps",
    category: "Textiles",
    quantity: "75kg",
    location: "Los Angeles, CA",
    price: "$1.50/kg",
    image: "/fabric-scraps.jpg",
    seller: "Fashion Upcycle Hub",
    condition: "Grade A",
  },
  {
    id: 6,
    title: "Aluminum Cans - Bulk",
    category: "Plastics",
    quantity: "1000 units",
    location: "Denver, CO",
    price: "$0.05/unit",
    image: "/aluminum-cans.jpg",
    seller: "Recycling Masters",
    condition: "Clean & Sorted",
  },
]

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const { products: sellerProducts } = useSellerProducts()

  // Combine mock materials with seller products
  const allMaterials = useMemo(() => {
    const combinedMaterials = [
      ...mockMaterials,
      ...sellerProducts.map((product) => ({
        id: product.id,
        title: product.title,
        category: product.category,
        quantity: product.quantity,
        location: product.location,
        price: product.price,
        image: product.images[0] || "/placeholder.svg",
        seller: product.seller.company,
        condition: product.condition,
      })),
    ]
    return combinedMaterials
  }, [sellerProducts])

  const filteredMaterials = allMaterials.filter((material) => {
    const matchesCategory = selectedCategory === "All" || material.category === selectedCategory
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.seller.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Material Marketplace</h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse and connect with sellers of reusable materials, or list your own waste streams for purchase and
            donation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Search materials or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Link href="/marketplace/post-material">
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">Post Material</Button>
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 flex-wrap">
            {MATERIAL_TYPES.map((type) => (
              <Badge
                key={type}
                variant={selectedCategory === type ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  selectedCategory === type ? "bg-emerald-600" : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Link key={material.id} href={`/marketplace/${material.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <img
                  src={material.image || "/placeholder.svg"}
                  alt={material.title}
                  className="w-full h-48 object-cover bg-gray-100"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {material.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{material.condition}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{material.title}</h3>

                  <div className="mb-4 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Quantity:</span> {material.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {material.location}
                    </p>
                    <p>
                      <span className="font-medium">Seller:</span> {material.seller}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">{material.price}</span>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No materials found matching your filters.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Clear Filters</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
