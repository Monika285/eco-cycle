"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const MATERIAL_CATEGORIES = ["Plastics", "Textiles", "Electronics", "Wood", "Other"]

const CERTIFICATIONS = [
  { id: "iso", label: "ISO 14001 Certified" },
  { id: "reach", label: "REACH Compliant" },
  { id: "rosh", label: "RoHS Compliant" },
  { id: "fair", label: "Fair Trade" },
]

export default function PostMaterial() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    unit: "kg",
    location: "",
    description: "",
    condition: "Grade A",
    listingType: "sell",
    price: "",
    images: [] as File[],
    certifications: [] as string[],
    complianceDocs: [] as File[],
    companyName: "",
    batchNumber: "",
    manufacturingDate: "",
  })

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [step, setStep] = useState(1)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }))
      // Mock preview
      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setUploadedImages((prev) => [...prev, event.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
  }

  const toggleCertification = (certId: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(certId)
        ? prev.certifications.filter((c) => c !== certId)
        : [...prev.certifications, certId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post Your Materials</h1>
          <p className="text-gray-600">
            List your reusable materials for sale or donation and connect with eco-entrepreneurs.
          </p>
          {/* Step Indicator */}
          <div className="mt-6 flex gap-2">
            {[1, 2, 3].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setStep(stepNum)}
                className={`h-10 w-10 rounded-full font-semibold transition-all ${
                  step === stepNum
                    ? "bg-emerald-600 text-white"
                    : step > stepNum
                      ? "bg-emerald-200 text-emerald-800"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </button>
            ))}
          </div>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

                {/* Listing Type Selection with Descriptions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <Label className="text-lg font-semibold mb-4 block">What would you like to do?</Label>
                  <RadioGroup
                    value={formData.listingType}
                    onValueChange={(value) => setFormData({ ...formData, listingType: value })}
                  >
                    <div className="flex items-start space-x-3 mb-4 p-3 rounded border border-blue-200 bg-white cursor-pointer">
                      <RadioGroupItem value="sell" id="sell" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="sell" className="cursor-pointer font-semibold">
                          Sell Your Materials
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">Set your own price and earn revenue</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded border border-blue-200 bg-white cursor-pointer">
                      <RadioGroupItem value="donate" id="donate" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="donate" className="cursor-pointer font-semibold">
                          Donate Your Materials
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Contribute to circular economy & earn impact badges
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title">Material Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Premium Recycled Plastic Pellets"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Material Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {MATERIAL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="500"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="ton">Metric Ton (MT)</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="liters">Liters (L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <Label htmlFor="condition">Material Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A">Grade A - Excellent</SelectItem>
                      <SelectItem value="Grade B">Grade B - Good</SelectItem>
                      <SelectItem value="Grade C">Grade C - Fair</SelectItem>
                      <SelectItem value="For Processing">For Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                {/* Price (if selling) */}
                {formData.listingType === "sell" && (
                  <div>
                    <Label htmlFor="price">Price per Unit ({formData.unit})</Label>
                    <Input
                      id="price"
                      placeholder="2.50"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description & Specifications</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your materials in detail. Include specifications, quality, certifications, processing history, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-32"
                  />
                </div>
              </>
            )}

            {/* Step 2: Images & Certifications */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Images & Certifications</h2>

                {/* Material Images Upload */}
                <div>
                  <Label>Material Images (Max 5)</Label>
                  <div className="mt-2 border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadedImages.length >= 5}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <p className="text-gray-600 mb-2">Drag & drop images or click to select</p>
                      <p className="text-sm text-gray-500">PNG, JPG, WebP up to 5MB each</p>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((image, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Material ${idx + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            onClick={() => {
                              setUploadedImages((prev) => prev.filter((_, i) => i !== idx))
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certifications Section */}
                <div>
                  <Label className="text-lg font-semibold mb-3 block">Certifications & Compliance</Label>
                  <div className="space-y-3">
                    {CERTIFICATIONS.map((cert) => (
                      <div key={cert.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert.id}
                          checked={formData.certifications.includes(cert.id)}
                          onCheckedChange={() => toggleCertification(cert.id)}
                        />
                        <Label htmlFor={cert.id} className="cursor-pointer font-normal">
                          {cert.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Batch Information for Bulk Sellers */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <Label className="font-semibold mb-3 block">Batch Information (Optional)</Label>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="batchNumber">Batch Number</Label>
                      <Input
                        id="batchNumber"
                        placeholder="e.g., BATCH-2024-001"
                        value={formData.batchNumber}
                        onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="manufacturingDate">Manufacturing/Collection Date</Label>
                      <Input
                        id="manufacturingDate"
                        type="date"
                        value={formData.manufacturingDate}
                        onChange={(e) => setFormData({ ...formData, manufacturingDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Listing</h2>

                {/* Alert */}
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Your listing will go through basic verification before appearing to buyers. This typically takes 24
                    hours.
                  </AlertDescription>
                </Alert>

                {/* Summary Card */}
                <Card className="p-6 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">
                        {formData.quantity} {formData.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{formData.listingType}</span>
                    </div>
                    {formData.listingType === "sell" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">
                          ${formData.price}/{formData.unit}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{formData.location}</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setStep(step + 1)}
                >
                  Continue
                </Button>
              ) : (
                <>
                  <Link href="/marketplace" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Post Material
                  </Button>
                </>
              )}
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
