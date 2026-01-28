"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SellerSetup() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    company: user?.company || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    businessLicense: "",
    gstNumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.company || !formData.phone || !formData.address) {
        throw new Error("Please fill in all required fields")
      }

      // Update user profile with seller details
      await updateProfile({
        company: formData.company,
        location: `${formData.city}, ${formData.state}`,
      })

      // Store seller details
      const sellerData = {
        ...formData,
        userId: user?.id,
      }
      localStorage.setItem("echocycle_seller_profile", JSON.stringify(sellerData))

      // Redirect to product upload
      router.push("/seller/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to setup seller profile")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign in to become a seller</h1>
            <p className="text-gray-600 mb-8">Please log in or create an account first.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/login">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Become a Seller</h1>
          <p className="text-xl text-gray-600">Complete your seller profile to start uploading materials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-6">Setup Steps</h3>
              <div className="space-y-4">
                {[
                  { num: 1, title: "Business Info" },
                  { num: 2, title: "Contact Details" },
                  { num: 3, title: "Verification" },
                ].map((stepItem) => (
                  <div key={stepItem.num} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= stepItem.num
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {stepItem.num}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          step >= stepItem.num ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {stepItem.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Business Info */}
                {step === 1 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="company">Company/Business Name *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your business name"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Enter phone number"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="businessLicense">Business License Number</Label>
                          <Input
                            id="businessLicense"
                            value={formData.businessLicense}
                            onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })}
                            placeholder="Optional - helps build trust"
                          />
                        </div>

                        <div>
                          <Label htmlFor="gstNumber">GST Number</Label>
                          <Input
                            id="gstNumber"
                            value={formData.gstNumber}
                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                            placeholder="Optional - for registered businesses"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Address</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Enter your business address"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              placeholder="City"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              placeholder="State"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code *</Label>
                            <Input
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                              placeholder="ZIP"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Verification */}
                {step === 3 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification & Review</h2>

                      <div className="space-y-6">
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                          <h3 className="font-semibold text-emerald-900 mb-4">Your Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Company:</span>
                              <span className="font-medium text-gray-900">{formData.company}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium text-gray-900">{formData.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium text-gray-900">
                                {formData.address}, {formData.city}, {formData.state}
                              </span>
                            </div>
                            {formData.gstNumber && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">GST Number:</span>
                                <span className="font-medium text-gray-900">{formData.gstNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-900">
                            ✓ Your seller profile will be verified within 24 hours. You can start uploading products
                            immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {error && <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">{error}</div>}

                {/* Navigation */}
                <div className="flex gap-4 pt-8 border-t">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setStep(step - 1)}
                      disabled={loading}
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
                    <Button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      disabled={loading}
                    >
                      {loading ? "Setting up..." : "Complete Setup"}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
