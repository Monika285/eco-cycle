"use client"

import React from "react"

import { useAuth } from "@/lib/auth-context"
import { useSellerProducts } from "@/lib/seller-products-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function MaterialEditPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth()
  const { getProductById, updateProduct } = useSellerProducts()
  const router = useRouter()

  const product = getProductById(params.id)

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    price: "",
    location: "",
    condition: "",
    description: "",
    minimumOrder: "",
    leadTime: "",
  })

  const [specifications, setSpecifications] = useState<string[]>([])
  const [newSpec, setNewSpec] = useState("")
  const [certifications, setCertifications] = useState<string[]>([])
  const [newCert, setNewCert] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        quantity: product.quantity,
        price: product.price,
        location: product.location,
        condition: product.condition,
        description: product.description,
        minimumOrder: product.minimumOrder,
        leadTime: product.leadTime,
      })
      setSpecifications(product.specifications)
      setCertifications(product.certifications)
    }
  }, [product])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSpecification = () => {
    if (newSpec.trim()) {
      setSpecifications((prev) => [...prev, newSpec])
      setNewSpec("")
    }
  }

  const handleRemoveSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddCertification = () => {
    if (newCert.trim()) {
      setCertifications((prev) => [...prev, newCert])
      setNewCert("")
    }
  }

  const handleRemoveCertification = (index: number) => {
    setCertifications((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      await updateProduct(params.id, {
        title: formData.title,
        quantity: formData.quantity,
        price: formData.price,
        location: formData.location,
        condition: formData.condition,
        description: formData.description,
        minimumOrder: formData.minimumOrder,
        leadTime: formData.leadTime,
        specifications,
        certifications,
      })
      router.push(`/dashboard/materials/${params.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update material")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/dashboard/materials/${params.id}`}>
            <Button variant="outline" className="mb-6 bg-transparent">
              <ChevronLeft size={18} className="mr-2" />
              Back to Material Details
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Edit Material</h1>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6">{error}</div>}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Premium Recycled Plastic Pellets"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <Input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    placeholder="e.g., Grade A"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <Input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 500kg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <Input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $0.75/kg"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order</label>
                  <Input
                    type="text"
                    name="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={handleInputChange}
                    placeholder="e.g., 100kg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time</label>
                  <Input
                    type="text"
                    name="leadTime"
                    value={formData.leadTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 5-7 business days"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your material in detail..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3 mb-4">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{spec}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveSpecification(idx)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 border-red-200 bg-transparent"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  placeholder="Add a specification"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSpecification()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddSpecification}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3 mb-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{cert}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveCertification(idx)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 border-red-200 bg-transparent"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="Add a certification"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddCertification()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddCertification}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Link href={`/dashboard/materials/${params.id}`}>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
