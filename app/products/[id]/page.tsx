"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Heart, ShoppingCart, Truck, Package } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWatchlist } from "@/lib/watchlist-context"

// Mock upcycled products database
const mockProducts = [
  {
    id: 1,
    title: "Recycled Ocean Plastic Sunglasses",
    price: 45.0,
    image: "/upcycled-sunglasses.jpg",
    images: ["/upcycled-sunglasses.jpg", "/plastic-pellets.jpg"],
    creator: "EcoVision Studio",
    creatorRating: 4.9,
    creatorReviews: 234,
    impact: "Prevents 2kg plastic from ocean",
    category: "Accessories",
    description:
      "Stylish sunglasses made from 100% recycled ocean plastic. Each pair prevents waste from entering our oceans and supports marine conservation efforts. UV protection and durable frames.",
    specifications: [
      "Material: Recycled Ocean Plastic",
      "UV Protection: 100% UV400",
      "Polarized Lenses: Yes",
      "Frame Size: Medium",
      "Weight: 28g",
      "Warranty: 1 Year",
    ],
    inStock: 45,
    materials: ["Ocean Plastic", "Recycled Nylon"],
    creatorInfo: "EcoVision Studio specializes in creating fashionable eyewear from ocean waste.",
    shippingTime: "3-5 business days",
  },
  {
    id: 2,
    title: "Handmade Textile Patchwork Bag",
    price: 89.0,
    image: "/upcycled-textile-bag.jpg",
    images: ["/upcycled-textile-bag.jpg", "/fabric-scraps.jpg"],
    creator: "Textile Artisans",
    creatorRating: 4.8,
    creatorReviews: 156,
    impact: "Saves 1.5kg textile waste",
    category: "Fashion",
    description:
      "One-of-a-kind handmade bag created from premium textile scraps and upcycled denim. Perfect for daily use with multiple pockets and a stylish patchwork design.",
    specifications: [
      "Material: Mixed Upcycled Textiles & Denim",
      "Size: 35cm x 30cm x 12cm",
      "Pockets: 5 (3 interior, 2 exterior)",
      "Closure: Zipper",
      "Handle: Reinforced Stitching",
      "Capacity: 12L",
    ],
    inStock: 12,
    materials: ["Recycled Denim", "Textile Scraps"],
    creatorInfo: "Textile Artisans creates unique handmade pieces from discarded fabrics.",
    shippingTime: "5-7 business days",
  },
  {
    id: 3,
    title: "Reclaimed Wood Desk Organizer",
    price: 65.0,
    image: "/wood-organizer.jpg",
    images: ["/wood-organizer.jpg", "/wood-planks.jpg"],
    creator: "Sustainable Woodworks",
    creatorRating: 4.7,
    creatorReviews: 98,
    impact: "Upcycles 3kg of reclaimed wood",
    category: "Home",
    description:
      "Beautiful desk organizer crafted from reclaimed oak wood. Features multiple compartments for pens, clips, and papers. Each piece is unique with natural wood grain patterns.",
    specifications: [
      "Material: Reclaimed Oak Wood",
      "Dimensions: 30cm x 20cm x 15cm",
      "Compartments: 6",
      "Finish: Natural Wood Oil",
      "Weight: 1.2kg",
      "Eco-Friendly: 100% Reclaimed",
    ],
    inStock: 8,
    materials: ["Reclaimed Oak"],
    creatorInfo: "Sustainable Woodworks transforms salvaged wood into functional furniture.",
    shippingTime: "7-10 business days",
  },
  {
    id: 4,
    title: "Circuit Board Wall Art",
    price: 120.0,
    image: "/electronics-art.jpg",
    images: ["/electronics-art.jpg", "/circuit-boards.jpg"],
    creator: "Digital Craftworks",
    creatorRating: 5.0,
    creatorReviews: 45,
    impact: "Diverts 500g e-waste",
    category: "Art",
    description:
      "Modern wall art piece featuring repurposed circuit boards from old electronics. A conversation starter that celebrates the beauty of technology while reducing e-waste.",
    specifications: [
      "Material: Recycled Circuit Boards",
      "Size: 40cm x 50cm",
      "Frame: Black Metal",
      "Mounting: Ready to Hang",
      "Artwork: Original Design",
      "Sustainability Score: 9.5/10",
    ],
    inStock: 5,
    materials: ["Circuit Boards", "Recycled Metal"],
    creatorInfo: "Digital Craftworks transforms e-waste into stunning artistic creations.",
    shippingTime: "5-7 business days",
  },
  {
    id: 5,
    title: "Upcycled Leather Notebook",
    price: 35.0,
    image: "/leather-notebook.jpg",
    images: ["/leather-notebook.jpg", "/plastic-pellets.jpg"],
    creator: "Eco Pages Studio",
    creatorRating: 4.6,
    creatorReviews: 178,
    impact: "Prevents 800g leather waste",
    category: "Stationery",
    description:
      "Handcrafted notebook with a cover made from upcycled leather scraps. Perfect for journaling, sketching, or note-taking with sustainably sourced paper pages.",
    specifications: [
      "Cover Material: Upcycled Leather",
      "Pages: 200 (Recycled Paper)",
      "Size: 14cm x 21cm",
      "Binding: Hand-Stitched",
      "Weight: 280g",
      "Cruelty-Free: Yes",
    ],
    inStock: 30,
    materials: ["Upcycled Leather", "Recycled Paper"],
    creatorInfo: "Eco Pages Studio creates beautiful stationery from sustainable materials.",
    shippingTime: "3-5 business days",
  },
  {
    id: 6,
    title: "Plastic Bottle Planter Set",
    price: 42.0,
    image: "/plastic-planter.jpg",
    images: ["/plastic-planter.jpg", "/aluminum-cans.jpg"],
    creator: "Green Crafts Co.",
    creatorRating: 4.8,
    creatorReviews: 267,
    impact: "Recycles 6 plastic bottles",
    category: "Garden",
    description:
      "Set of 3 beautiful planters made from upcycled plastic bottles. Lightweight, durable, and perfect for indoor or outdoor gardens. Soil and seeds not included.",
    specifications: [
      "Material: Recycled Plastic Bottles",
      "Quantity: 3 Planters",
      "Sizes: Small, Medium, Large",
      "Drainage: Built-in Drainage Holes",
      "Colors: Assorted Earth Tones",
      "Total Capacity: 8L",
    ],
    inStock: 25,
    materials: ["Plastic Bottles"],
    creatorInfo: "Green Crafts Co. creates garden accessories from post-consumer plastic.",
    shippingTime: "3-5 business days",
  },
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id)
  const product = mockProducts.find((p) => p.id === productId)
  const { addItem } = useCart()
  const { addToWatchlist, removeFromWatchlist, isWatched } = useWatchlist()
  const [mainImage, setMainImage] = useState(product?.images[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600">Product not found</p>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const watched = isWatched(params.id)

  const handleBuy = () => {
    const cartItem: any = {
      id: params.id,
      title: product.title,
      category: product.category,
      quantity: quantity,
      unit: "unit",
      price: product.price,
      seller: product.creator,
      totalPrice: product.price * quantity,
      listingType: "sell",
    }
    addItem(cartItem)
  }

  const handleAddToWatchlist = () => {
    if (watched) {
      removeFromWatchlist(params.id)
    } else {
      addToWatchlist({
        id: params.id,
        title: product.title,
        category: product.category,
        quantity: "1",
        location: "Online",
        price: `$${product.price.toFixed(2)}`,
        image: product.image,
        seller: product.creator,
        condition: "New",
        addedDate: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/products" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg bg-gray-100"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(image)}
                  className={`rounded-lg overflow-hidden border-2 transition ${
                    mainImage === image ? "border-emerald-600" : "border-gray-200"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{product.creatorRating}</span>
                <span className="text-gray-500">({product.creatorReviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">Unit Price</p>
              <p className="text-2xl font-bold text-emerald-600">${product.price.toFixed(2)}</p>
              <div className="mt-3 pt-3 border-t border-emerald-200">
                <p className="text-sm text-gray-600 mb-1">Total (with tax)</p>
                <p className="text-3xl font-bold text-emerald-600">${(product.price * quantity * 1.1).toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">Qty: {quantity} × ${product.price.toFixed(2)} + 10% tax</p>
              </div>
              <p className="text-sm text-gray-600 mt-3">{product.impact}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <span className={product.inStock > 0 ? "text-emerald-600" : "text-red-600"}>
                {product.inStock > 0 ? `${product.inStock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy Options */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                disabled={product.inStock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                {showPaymentOptions ? "Hide Payment Options" : "Buy Now"}
              </Button>

              {showPaymentOptions && (
                <Card className="p-4 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                          <p className="text-xs text-gray-600">Pay online securely</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">UPI</p>
                          <p className="text-xs text-gray-600">Instant payment</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Cash on Delivery</p>
                          <p className="text-xs text-gray-600">Pay when you receive</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <Link href="/checkout" onClick={handleBuy}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Proceed to Checkout ({quantity})
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Actions */}
            <Button
              onClick={handleAddToWatchlist}
              variant="outline"
              className={`w-full bg-transparent ${watched ? "border-emerald-600 text-emerald-600" : ""}`}
            >
              <Heart size={18} fill={watched ? "currentColor" : "none"} className="mr-2" />
              {watched ? "Saved to Watchlist" : "Add to Watchlist"}
            </Button>

            {/* Shipping Info */}
            <Card className="p-4 bg-blue-50 border-blue-200 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">Delivery in {product.shippingTime}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Product</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Materials Used</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <Badge key={material} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Specifications</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About the Creator</h3>
              <p className="text-gray-700 mb-4">{product.creatorInfo}</p>
              <p className="text-sm text-gray-600">
                <strong>Creator:</strong> {product.creator}
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
