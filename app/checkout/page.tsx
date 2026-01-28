"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryType: "pickup",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const calculateDeliveryDate = () => {
    const today = new Date()
    // Add 7-10 business days for delivery
    const deliveryDate = new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000)
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Redirect to payment page
    router.push("/checkout/payment")
  }

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0)
  const tax = subtotal * 0.1

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <Link href="/marketplace">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Continue Shopping</Button>
            </Link>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((stepNum) => (
            <button
              key={stepNum}
              className={`flex-1 h-12 rounded-lg font-semibold transition-all ${
                step === stepNum
                  ? "bg-emerald-600 text-white"
                  : step > stepNum
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNum === 1 ? "Delivery" : stepNum === 2 ? "Payment" : "Review"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Delivery Information */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div>
                    <Label className="font-semibold mb-3 block">Delivery Method</Label>
                    <RadioGroup
                      value={formData.deliveryType}
                      onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                    >
                      <div className="flex items-start space-x-3 p-3 rounded border hover:border-emerald-300 cursor-pointer">
                        <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="pickup" className="cursor-pointer font-semibold">
                            Self Pickup
                          </Label>
                          <p className="text-sm text-gray-600">Coordinate with sellers via chat</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded border hover:border-emerald-300 cursor-pointer">
                        <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="delivery" className="cursor-pointer font-semibold">
                            Logistics Partner
                          </Label>
                          <p className="text-sm text-gray-600">Platform arranges pickup & delivery</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-start space-x-3 p-3 rounded border hover:border-emerald-300 cursor-pointer">
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <Label htmlFor="card" className="cursor-pointer font-semibold flex-1">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded border hover:border-emerald-300 cursor-pointer">
                      <RadioGroupItem value="upi" id="upi" className="mt-1" />
                      <Label htmlFor="upi" className="cursor-pointer font-semibold flex-1">
                        UPI
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded border hover:border-emerald-300 cursor-pointer">
                      <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                      <Label htmlFor="netbanking" className="cursor-pointer font-semibold flex-1">
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "card" && (
                    <Card className="p-4 space-y-4 bg-gray-50">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="4532 1234 5678 9010"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="12/25"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCVC">CVC</Label>
                          <Input
                            id="cardCVC"
                            placeholder="123"
                            value={formData.cardCVC}
                            onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">Review Order</h2>

                  <Card className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
                      <p className="text-gray-600">
                        {formData.fullName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Delivery Method</h3>
                      <p className="text-gray-600 capitalize">{formData.deliveryType}</p>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Estimated Delivery</h3>
                      <p className="text-emerald-600 font-semibold">{calculateDeliveryDate()}</p>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                      <p className="text-gray-600 capitalize">{formData.paymentMethod}</p>
                    </div>
                  </Card>
                </>
              )}

              {/* Navigation */}
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
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  {step === 3 ? "Place Order" : "Continue"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      {item.listingType === "sell" ? (
                        <p className="font-medium text-emerald-600">${item.totalPrice.toFixed(2)}</p>
                      ) : (
                        <p className="text-green-600">Free</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      {item.quantity} {item.unit} × ${item.price.toFixed(2)}/{item.unit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-emerald-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
