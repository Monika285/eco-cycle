"use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function PaymentPage() {
  const router = useRouter()
  const { total, items } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
    bank: "",
    accountNumber: "",
    ifscCode: "",
    password: "",
  })

  // UPI ID validation
  const validateUPIId = (upiId: string): boolean => {
    // Valid UPI format: username@bankname
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/
    return upiRegex.test(upiId)
  }

  // Card number validation (basic Luhn algorithm)
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, "")
    if (!/^\d{16}$/.test(cleaned)) return false

    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  const validateExpiry = (expiry: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(expiry)) return false

    const [month, year] = expiry.split("/")
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    const expiryYear = parseInt(year, 10)
    const expiryMonth = parseInt(month, 10)

    if (expiryYear < currentYear) return false
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false

    return true
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate based on payment method
      if (paymentMethod === "upi") {
        if (!formData.upiId.trim()) {
          throw new Error("Please enter your UPI ID")
        }
        if (!validateUPIId(formData.upiId)) {
          throw new Error("Invalid UPI ID format. Use format: yourname@bankname")
        }
      } else if (paymentMethod === "card") {
        if (!formData.cardNumber.trim()) {
          throw new Error("Please enter your card number")
        }
        if (!validateCardNumber(formData.cardNumber)) {
          throw new Error("Invalid card number. Please check and try again")
        }
        if (!formData.cardName.trim()) {
          throw new Error("Please enter cardholder name")
        }
        if (!validateExpiry(formData.cardExpiry)) {
          throw new Error("Invalid expiry date. Use MM/YY format")
        }
        if (!formData.cardCVC.trim() || formData.cardCVC.length !== 3) {
          throw new Error("Invalid CVC. Must be 3 digits")
        }
      } else if (paymentMethod === "netbanking") {
        if (!formData.bank) {
          throw new Error("Please select a bank")
        }
        if (!formData.accountNumber.trim()) {
          throw new Error("Please enter your account number")
        }
        if (!formData.ifscCode.trim()) {
          throw new Error("Please enter IFSC code")
        }
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        router.push("/orders/confirmation")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle size={64} className="text-emerald-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
            <p className="text-sm text-gray-500">Redirecting to order confirmation...</p>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Complete Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Payment Method Selection */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 rounded border-2 hover:border-emerald-300 cursor-pointer transition"
                      style={{ borderColor: paymentMethod === "upi" ? "#059669" : "#e5e7eb" }}>
                      <RadioGroupItem value="upi" id="upi" className="mt-1" />
                      <Label htmlFor="upi" className="cursor-pointer flex-1">
                        <div className="font-semibold">UPI Payment</div>
                        <div className="text-sm text-gray-600">Pay using UPI ID</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded border-2 hover:border-emerald-300 cursor-pointer transition"
                      style={{ borderColor: paymentMethod === "card" ? "#059669" : "#e5e7eb" }}>
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="font-semibold">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Rupay</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded border-2 hover:border-emerald-300 cursor-pointer transition"
                      style={{ borderColor: paymentMethod === "netbanking" ? "#059669" : "#e5e7eb" }}>
                      <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                      <Label htmlFor="netbanking" className="cursor-pointer flex-1">
                        <div className="font-semibold">Net Banking</div>
                        <div className="text-sm text-gray-600">Bank transfer</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded border-2 hover:border-emerald-300 cursor-pointer transition"
                      style={{ borderColor: paymentMethod === "cod" ? "#059669" : "#e5e7eb" }}>
                      <RadioGroupItem value="cod" id="cod" className="mt-1" />
                      <Label htmlFor="cod" className="cursor-pointer flex-1">
                        <div className="font-semibold">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </Card>

              {/* UPI Payment */}
              {paymentMethod === "upi" && (
                <Card className="p-6 space-y-4 bg-blue-50 border-2 border-blue-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">📱</span>
                    UPI Payment
                  </h3>
                  <div>
                    <Label htmlFor="upiId" className="font-semibold">
                      UPI ID *
                    </Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@bankname (e.g., john@okhdfcbank)"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Format: username@bankname. Common banks: okhdfcbank, okicici, okaxis, okpnb
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg text-sm text-blue-900">
                    You will receive a UPI prompt on your registered mobile. Authenticate to complete payment.
                  </div>
                </Card>
              )}

              {/* Card Payment */}
              {paymentMethod === "card" && (
                <Card className="p-6 space-y-4 bg-purple-50 border-2 border-purple-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">💳</span>
                    Card Details
                  </h3>
                  <div>
                    <Label htmlFor="cardNumber" className="font-semibold">
                      Card Number *
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, "")
                        value = value.replace(/(\d{4})/g, "$1 ").trim()
                        setFormData({ ...formData, cardNumber: value })
                      }}
                      className="mt-2 font-mono"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="font-semibold">
                      Cardholder Name *
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry" className="font-semibold">
                        Expiry (MM/YY) *
                      </Label>
                      <Input
                        id="cardExpiry"
                        placeholder="12/25"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="mt-2"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCVC" className="font-semibold">
                        CVV *
                      </Label>
                      <Input
                        id="cardCVC"
                        placeholder="123"
                        value={formData.cardCVC}
                        onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value.slice(0, 3) })}
                        className="mt-2"
                        type="password"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <Card className="p-6 space-y-4 bg-green-50 border-2 border-green-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">🏦</span>
                    Net Banking
                  </h3>
                  <div>
                    <Label htmlFor="bank" className="font-semibold">
                      Select Bank *
                    </Label>
                    <select
                      id="bank"
                      value={formData.bank}
                      onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Choose your bank...</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="PNB">Punjab National Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="KOTAK">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="accountNumber" className="font-semibold">
                      Account Number *
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="1234567890"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode" className="font-semibold">
                      IFSC Code *
                    </Label>
                    <Input
                      id="ifscCode"
                      placeholder="HDFC0001234"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                      className="mt-2"
                    />
                  </div>
                </Card>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === "cod" && (
                <Card className="p-6 bg-orange-50 border-2 border-orange-200">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-gray-900">Pay on Delivery</p>
                    <p className="text-sm text-gray-600">
                      You can pay in cash or card when the delivery executive arrives at your doorstep.
                    </p>
                  </div>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Complete Payment - ₹${total.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.title}</span>
                    <span className="font-semibold text-gray-900">₹{(item.totalPrice || item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-emerald-600 font-semibold">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-emerald-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                <p className="flex items-center gap-2">🔒 Secure & Encrypted</p>
                <p className="flex items-center gap-2">✓ 100% Safe</p>
                <p className="flex items-center gap-2">✓ Money Back Guarantee</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
