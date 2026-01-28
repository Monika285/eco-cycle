"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Get order details from session/URL
  const orderAmount = 2450
  const orderItems = 3

  const [formData, setFormData] = useState({
    // UPI
    upiId: "",
    // Card
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
    // Net Banking
    bank: "",
    accountNumber: "",
    ifscCode: "",
  })

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate based on payment method
      if (paymentMethod === "upi" && !formData.upiId) {
        throw new Error("Please enter UPI ID")
      }
      if (paymentMethod === "card" && (!formData.cardNumber || !formData.cardName)) {
        throw new Error("Please enter valid card details")
      }
      if (paymentMethod === "netbanking" && (!formData.bank || !formData.accountNumber)) {
        throw new Error("Please enter valid bank details")
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/orders/confirmation")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your order has been placed. Redirecting to order confirmation...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Secure Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>

              <form onSubmit={handlePaymentSubmit} className="space-y-8">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* UPI */}
                  <div className="border rounded-lg p-6 cursor-pointer hover:bg-emerald-50 transition">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="upi" id="upi" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="upi" className="text-lg font-semibold cursor-pointer">
                          UPI (Unified Payments Interface)
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay directly using your UPI app (Google Pay, PhonePe, Paytm)
                        </p>

                        {paymentMethod === "upi" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label htmlFor="upiId" className="text-sm">
                                UPI ID *
                              </Label>
                              <Input
                                id="upiId"
                                placeholder="yourname@upi"
                                value={formData.upiId}
                                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                required
                              />
                            </div>
                            <p className="text-xs text-gray-600">
                              ℹ You will receive an OTP on your registered mobile number
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="border rounded-lg p-6 cursor-pointer hover:bg-emerald-50 transition">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="card" className="text-lg font-semibold cursor-pointer">
                          Credit/Debit Card
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Visa, Mastercard, or any other major card
                        </p>

                        {paymentMethod === "card" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label htmlFor="cardName" className="text-sm">
                                Cardholder Name *
                              </Label>
                              <Input
                                id="cardName"
                                placeholder="Name on card"
                                value={formData.cardName}
                                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="cardNumber" className="text-sm">
                                Card Number *
                              </Label>
                              <Input
                                id="cardNumber"
                                placeholder="4532 1234 5678 9010"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                maxLength={19}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cardExpiry" className="text-sm">
                                  Expiry (MM/YY) *
                                </Label>
                                <Input
                                  id="cardExpiry"
                                  placeholder="12/25"
                                  value={formData.cardExpiry}
                                  onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                                  maxLength={5}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cardCVC" className="text-sm">
                                  CVC *
                                </Label>
                                <Input
                                  id="cardCVC"
                                  placeholder="123"
                                  value={formData.cardCVC}
                                  onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                                  maxLength={3}
                                  required
                                />
                              </div>
                            </div>

                            <p className="text-xs text-gray-600">
                              ⚠ Your card details are secure and encrypted
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div className="border rounded-lg p-6 cursor-pointer hover:bg-emerald-50 transition">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="netbanking" className="text-lg font-semibold cursor-pointer">
                          Net Banking
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay directly from your bank account
                        </p>

                        {paymentMethod === "netbanking" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label htmlFor="bank" className="text-sm">
                                Select Bank *
                              </Label>
                              <select
                                id="bank"
                                value={formData.bank}
                                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                              >
                                <option value="">Choose your bank</option>
                                <option value="hdfc">HDFC Bank</option>
                                <option value="icici">ICICI Bank</option>
                                <option value="axis">Axis Bank</option>
                                <option value="sbi">State Bank of India</option>
                                <option value="kotak">Kotak Mahindra Bank</option>
                                <option value="yes">YES Bank</option>
                              </select>
                            </div>

                            <div>
                              <Label htmlFor="accountNumber" className="text-sm">
                                Account Number *
                              </Label>
                              <Input
                                id="accountNumber"
                                placeholder="Enter account number"
                                value={formData.accountNumber}
                                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="ifscCode" className="text-sm">
                                IFSC Code *
                              </Label>
                              <Input
                                id="ifscCode"
                                placeholder="e.g., HDFC0001234"
                                value={formData.ifscCode}
                                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                                required
                              />
                            </div>

                            <p className="text-xs text-gray-600">
                              ℹ You will be redirected to your bank's secure portal
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {error && <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">{error}</div>}

                {/* Terms */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    ✓ Your payment is secure and encrypted with 256-bit SSL
                    <br />✓ Money-back guarantee if transaction fails
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${orderAmount.toLocaleString()}`
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <p className="text-gray-600">Items ({orderItems})</p>
                  <p className="font-semibold text-gray-900">₹{(orderAmount * 0.8).toLocaleString()}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Platform Fee</p>
                  <p className="font-semibold text-gray-900">₹{Math.round(orderAmount * 0.1).toLocaleString()}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold text-gray-900">₹{Math.round(orderAmount * 0.1).toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-emerald-600">₹{orderAmount.toLocaleString()}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <p className="text-gray-600">Fast & Secure</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <p className="text-gray-600">Multiple Payment Methods</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <p className="text-gray-600">Buyer Protection</p>
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
