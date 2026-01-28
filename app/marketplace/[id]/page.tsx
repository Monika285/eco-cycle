"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Heart } from "lucide-react"
import Link from "next/link"
import { useWatchlist } from "@/lib/watchlist-context"
import { ContactSellerDialog } from "@/components/contact-seller-dialog"
import { useSellerProducts } from "@/lib/seller-products-context"
import { useParams } from "next/navigation"


/* ---------------- MOCK MATERIALS ---------------- */

const mockMaterials = [
  {
    id: 1,
    title: "Premium Recycled Plastic Pellets",
    category: "Plastics",
    quantity: "500kg",
    location: "San Francisco, CA",
    price: "$0.75/kg",
    images: ["/plastic-pellets.jpg", "/plastic-material.jpg"],
    seller: "GreenPlas Co.",
    sellerRating: 4.8,
    sellerReviews: 156,
    condition: "Grade A",
    description:
      "High-quality recycled plastic pellets suitable for injection molding, extrusion, or 3D printing.",
    specifications: [
      "Material Type: LDPE/HDPE Mix",
      "Color: Natural/Translucent",
      "Moisture Content: <0.5%",
      "Melting Point: 120-140°C",
      "Tensile Strength: 25-35 MPa",
    ],
    minimumOrder: "100kg",
    leadTime: "5-7 business days",
    shipping: "Available",
    certifications: ["ISO 9001", "Recycled Content Certificate"],
  },
  {
    id: 2,
    title: "Vintage Denim Bulk",
    category: "Textiles",
    quantity: "100kg",
    location: "Austin, TX",
    price: "Donating",
    images: ["/denim-fabric.jpg", "/fabric-scraps.jpg"],
    seller: "Textile Artisans Studio",
    sellerRating: 4.9,
    sellerReviews: 203,
    condition: "Mixed Quality",
    description:
      "Vintage denim bulk from clothing production. Perfect for upcycling.",
    specifications: [
      "Material Type: 100% Cotton Denim",
      "Colors: Blue, Black, Light Blue",
      "Weight: 500g-800g per piece",
      "Durability: High",
      "Pre-washed: Yes",
    ],
    minimumOrder: "10kg",
    leadTime: "3-5 business days",
    shipping: "Available",
    certifications: ["Organic Cotton Verified"],
  },
  { 
    id: 3, 
    title: "Electronic Scrap - Copper & Gold", 
    category: "Electronics", quantity: "50kg", 
    location: "Seattle, WA", price: "$5.50/kg", 
    images: ["/circuit-boards.jpg", "/electronics-art.jpg"], 
    seller: "E-Cycle Innovations", 
    sellerRating: 4.7, 
    sellerReviews: 128, 
    condition: "For Processing", 
    description: "Scrap electronic components rich in copper and gold. Suitable for metal recovery and recycling. Includes circuit boards, connectors, and components.", 
    specifications: [ "Copper Content: 8-12%", "Gold Content: 0.5-1%", "Mixed Electronic Components", "Sorted & Cleaned", "Weight: 50kg per batch", ], 
    minimumOrder: "10kg", 
    leadTime: "7-10 business days", 
    shipping: "Available", 
    certifications: ["E-Waste Processing Certificate", "ISO 14001"], 
  }, 
  { 
    id: 4, 
    title: "Reclaimed Oak Planks", 
    category: "Wood", 
    quantity: "200 pieces", 
    location: "Portland, OR", 
    price: "$2.50/piece", 
    images: ["/wood-planks.jpg", "/wood-organizer.jpg"], 
    seller: "Sustainable Timber", 
    sellerRating: 4.9, 
    sellerReviews: 189, 
    condition: "Grade B", 
    description: "Premium reclaimed oak planks from salvaged buildings. Perfect for furniture, flooring, or interior design projects. Each piece is unique with character marks.", 
    specifications: [ "Wood Type: Oak", "Average Size: 30cm x 10cm x 2cm", "Finish: Raw/Unfinished", "Age: 50+ years", "Sustainability: 100% Reclaimed", ], 
    minimumOrder: "10 pieces", 
    leadTime: "10-14 business days", 
    shipping: "Available", 
    certifications: ["Reclaimed Wood Certification"], 
  }, 
  { 
    id: 5, 
    title: "Polyester Scraps", 
    category: "Textiles", 
    quantity: "75kg", 
    location: "Los Angeles, CA", 
    price: "$0.50/kg", 
    images: ["/fabric-scraps.jpg", "/upcycled-textile-bag.jpg"], 
    seller: "Fashion Upcycle Hub", 
    sellerRating: 4.6, 
    sellerReviews: 94, 
    condition: "Grade A", 
    description: "High-quality polyester scraps from fashion industry. Ideal for filling, padding, or textile art projects. Sorted by color and weight.", 
    specifications: [ "Material: 100% Polyester", "Available Colors: Mixed", "Weight: 1-5kg per package", "Moisture Content: <2%", "Softness: High", ], 
    minimumOrder: "5kg", 
    leadTime: "3-5 business days", 
    shipping: "Available", 
    certifications: ["Textile Quality Standard"],
   }, 
   {
     id: 6, 
     title: "Aluminum Cans - Bulk", 
     category: "Plastics", 
     quantity: "1000 units", 
     location: "Denver, CO", 
     price: "$0.02/unit", 
     images: ["/aluminum-cans.jpg", "/plastic-pellets.jpg"], 
     seller: "Recycling Masters", 
     sellerRating: 4.8, 
     sellerReviews: 312,
      condition: "Clean & Sorted", 
      description: "Clean, sorted aluminum cans ready for melting and reprocessing. High purity aluminum with excellent recycling potential. Food-grade quality.", 
      specifications: [ "Material: 100% Aluminum", "Condition: Clean & Crushed", "Weight: 15g per can (average)", "Purity: 99%+", "Quantity: 1000 units minimum", ], 
      minimumOrder: "500 units", 
      leadTime: "2-3 business days", 
      shipping: "Available", 
      certifications: ["Aluminum Association Certified"],
     },
 ]

/* ---------------- PAGE ---------------- */

export default function MaterialDetail() {
  const params = useParams()
  const materialId = params?.id ? Number(params.id) : null

  const [mainImage, setMainImage] = useState("")
  const [contactDialog, setContactDialog] = useState({ isOpen: false })

  const { addToWatchlist, removeFromWatchlist, isWatched } = useWatchlist()
  const { getProductById } = useSellerProducts()

  // Fetch product from seller context
  const sellerProduct = getProductById(String(params?.id))

  // Fallback to mock materials if product not found
  const mockMaterial = mockMaterials.find((m) => m.id === materialId)

  const material = sellerProduct
    ? {
        id: sellerProduct.id,
        title: sellerProduct.title,
        category: sellerProduct.category,
        quantity: sellerProduct.quantity,
        location: sellerProduct.location,
        price: sellerProduct.price,
        images: sellerProduct.images,
        seller: sellerProduct.seller.company,
        sellerRating: sellerProduct.seller.rating,
        sellerReviews: sellerProduct.seller.reviews,
        condition: sellerProduct.condition,
        description: sellerProduct.description,
        specifications: sellerProduct.specifications,
        minimumOrder: sellerProduct.minimumOrder,
        leadTime: sellerProduct.leadTime,
        shipping: "Available",
        certifications: sellerProduct.certifications,
      }
    : mockMaterial

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    if (material?.images?.length && !mainImage) {
      setMainImage(material.images[0])
    }
  }, [material, mainImage])

  if (!materialId || !material) {
    return <p className="text-center mt-20">Product not found</p>
  }

  /* ---------------- HANDLERS ---------------- */

  // Ensure watched works for both seller products and mock materials
  const watched = isWatched(String(material.id))

  const handleToggleWatchlist = () => {
    if (watched) {
      removeFromWatchlist(String(material.id))
    } else {
      addToWatchlist({
        id: String(material.id),
        title: material.title,
        category: material.category,
        quantity: material.quantity,
        location: material.location,
        price: material.price,
        image: material.images[0],
        seller: material.seller,
        condition: material.condition,
        addedDate: new Date().toISOString(),
      })
    }
  }

  const handleContactSeller = () => {
    setContactDialog({ isOpen: true })
  }

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/marketplace"
          className="flex items-center gap-2 text-emerald-600 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Images */}
          <div className="lg:col-span-2">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={material.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {material.images.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)}>
                  <img
                    src={img}
                    alt={`${material.title} thumbnail ${i + 1}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{material.title}</h1>

            <div className="flex gap-2">
              <Badge>{material.category}</Badge>
              <Badge variant="outline">{material.condition}</Badge>
            </div>

            <Card className="p-6 space-y-4">
              <p className="text-2xl font-bold text-emerald-600">
                {material.price}
              </p>
              <p>{material.quantity}</p>
              <p>{material.location}</p>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={handleContactSeller}>
                  Contact Seller
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleToggleWatchlist}
                >
                  <Heart className="mr-2" />
                  {watched ? "Saved" : "Save"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <ContactSellerDialog
        isOpen={contactDialog.isOpen}
        onClose={() => setContactDialog({ isOpen: false })}
        sellerName={material.seller}
        sellerLocation={material.location}
        materialTitle={material.title}
      />

      <Footer />
    </div>
  )
}