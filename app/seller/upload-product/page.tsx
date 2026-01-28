"use client"

export const dynamic = "force-dynamic"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useSellerProducts } from "@/lib/seller-products-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, Upload } from "lucide-react"

const CATEGORIES = ["Plastics", "Textiles", "Electronics", "Wood"]

export default function UploadProduct() {
  const router = useRouter()
  const { user } = useAuth()
  const { addProduct } = useSellerProducts()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [images, setImages] = useState<string[]>([])

  const [seller, setSeller] = useState<any>(null)
  const [sellerLoading, setSellerLoading] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    category: "Plastics" as const,
    quantity: "",
    unit: "kg",
    listingType: "sell" as "sell" | "donate",
    condition: "Grade A",
    price: "",
    description: "",
    specifications: [""],
    minimumOrder: "",
    leadTime: "",
    certifications: [""],
  })

  useEffect(() => {
    const profile = localStorage.getItem("echocycle_seller_profile")
    setSeller(profile ? JSON.parse(profile) : null)
    setSellerLoading(false)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setImages((prev) => [...prev, base64])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.title || !formData.quantity || !images.length) {
        throw new Error("Please fill in all required fields and upload at least one image")
      }

      if (formData.listingType === "sell" && !formData.price) {
        throw new Error("Price is required for selling")
      }

      if (!seller) {
        throw new Error("Please complete seller setup first")
      }

      const newProduct = {
        sellerId: user?.id || "",
        title: formData.title,
        category: formData.category,
        quantity: `${formData.quantity}${formData.unit}`,
        location: seller.city,
        price:
          formData.listingType === "sell"
            ? `$${formData.price}/${formData.unit}`
            : "Donating",
        listingType: formData.listingType,
        condition: formData.condition,
        description: formData.description,
        specifications: formData.specifications.filter((s) => s.trim()),
        images,
        minimumOrder: formData.minimumOrder,
        leadTime: formData.leadTime,
        certifications: formData.certifications.filter((c) => c.trim()),
        seller: {
          name: user?.name || "",
          company: seller.company || "",
          phone: seller.phone || "",
          address: seller.address || "",
          city: seller.city || "",
          state: seller.state || "",
          zipCode: seller.zipCode || "",
          rating: 4.8,
          reviews: 0,
        },
      }

      await addProduct(newProduct)
      setSuccess("Product uploaded successfully!")

      setTimeout(() => {
        router.push("/seller/dashboard")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload product")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 text-center text-gray-600">
          Please sign in first
        </main>
        <Footer />
      </div>
    )
  }

  if (!seller && !sellerLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Complete Seller Setup First</h1>
          <Link href="/seller/setup">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Complete Setup
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Material</h1>
          <p className="text-xl text-gray-600">Share your recycled materials or waste streams with buyers</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Section */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Product Images *</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image || "/placeholder.svg"} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {images.length < 6 && (
                  <label className="border-2 border-dashed border-emerald-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 h-32">
                    <Upload size={24} className="text-emerald-600 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-600">Upload up to 6 images (max 5MB each)</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Recycled Plastic Pellets"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity and Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <div className="flex gap-2">
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Amount"
                    required
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option>kg</option>
                    <option>units</option>
                    <option>pieces</option>
                    <option>tons</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="listingType">Type *</Label>
                <select
                  id="listingType"
                  value={formData.listingType}
                  onChange={(e) => setFormData({ ...formData, listingType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="sell">For Sale</option>
                  <option value="donate">Donate</option>
                </select>
              </div>

              {formData.listingType === "sell" && (
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Price per unit"
                    required
                  />
                </div>
              )}
            </div>

            {/* Condition and Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Mixed Quality</option>
                  <option>For Processing</option>
                  <option>Clean & Sorted</option>
                </select>
              </div>

              <div>
                <Label htmlFor="leadTime">Lead Time</Label>
                <Input
                  id="leadTime"
                  value={formData.leadTime}
                  onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                  placeholder="e.g., 5-7 business days"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your material in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
              />
            </div>

            {/* Dynamic Fields */}
            <div>
              <Label className="font-semibold mb-3 block">Specifications</Label>
              <div className="space-y-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => {
                        const newSpecs = [...formData.specifications]
                        newSpecs[index] = e.target.value
                        setFormData({ ...formData, specifications: newSpecs })
                      }}
                      placeholder={`Specification ${index + 1}`}
                    />
                    {formData.specifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newSpecs = formData.specifications.filter((_, i) => i !== index)
                          setFormData({ ...formData, specifications: newSpecs })
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-2 bg-transparent"
                onClick={() => setFormData({ ...formData, specifications: [...formData.specifications, ""] })}
              >
                Add Specification
              </Button>
            </div>

            <div>
              <Label className="font-semibold mb-3 block">Certifications</Label>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={cert}
                      onChange={(e) => {
                        const newCerts = [...formData.certifications]
                        newCerts[index] = e.target.value
                        setFormData({ ...formData, certifications: newCerts })
                      }}
                      placeholder={`Certification ${index + 1}`}
                    />
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newCerts = formData.certifications.filter((_, i) => i !== index)
                          setFormData({ ...formData, certifications: newCerts })
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-2 bg-transparent"
                onClick={() => setFormData({ ...formData, certifications: [...formData.certifications, ""] })}
              >
                Add Certification
              </Button>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">{error}</div>}
            {success && <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm">{success}</div>}

            {/* Submit */}
            <div className="flex gap-4 pt-6 border-t">
              <Link href="/seller/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? "Uploading..." : "Upload Product"}
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
