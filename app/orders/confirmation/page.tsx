"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderId = "EC-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <Card className="p-8 bg-green-50 border-green-200 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order ID</p>
            <p className="text-2xl font-bold text-gray-900 font-mono">{orderId}</p>
            <p className="text-sm text-gray-600 mt-4">
              A confirmation email has been sent to your registered email address with all order details.
            </p>
          </Card>

          <Card className="p-6 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-left">What Happens Next</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 text-left">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Seller Acceptance</p>
                      <p className="text-sm text-gray-600 mt-1">
                        The seller will review and accept your order within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 text-left">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Pickup/Delivery Coordination</p>
                      <p className="text-sm text-gray-600 mt-1">
                        You'll receive a message to schedule pickup or arrange delivery
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 text-left">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Material Receipt & Verification</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Verify material condition and confirm receipt via OTP
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 text-left">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Payment Settlement & Impact Update</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Funds released to seller, your environmental impact stats updated
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Track Your Order:</span> Monitor the status in real-time from your
                  dashboard
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href="/orders" className="flex-1">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View My Orders</Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
