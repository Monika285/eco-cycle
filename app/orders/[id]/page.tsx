"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ContactSellerDialog } from "@/components/contact-seller-dialog"
import { useState } from "react"

const mockOrderDetail = {
  id: "EC-2024-001",
  date: "2024-01-15",
  status: "accepted",
  items: [
    {
      id: 1,
      title: "Recycled Plastic Pellets",
      quantity: 500,
      unit: "kg",
      price: 2.5,
      total: 1250,
      category: "Plastics",
      condition: "Grade A",
    },
  ],
  subtotal: 1250,
  tax: 125,
  total: 1375,
  seller: {
    name: "GreenPlas Co.",
    rating: 4.8,
    reviews: 89,
    location: "San Francisco, CA",
    verified: true,
  },
  deliveryInfo: {
    type: "Logistics Partner",
    address: "123 Eco Street, San Francisco, CA 94102",
    estimatedDate: "2024-01-20",
    trackingId: "SHIP-2024-001",
  },
  paymentMethod: "Card ending in 4242",
  impactMetrics: {
    wasteSaved: 500,
    carbonSaved: 250,
    waterSaved: 5000,
  },
}

export default function OrderDetailPage() {
  const [showDispute, setShowDispute] = useState(false)
  const [disputeMessage, setDisputeMessage] = useState("")
  const [contactDialog, setContactDialog] = useState({
    isOpen: false,
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600 mt-2">Order ID: {mockOrderDetail.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-blue-900">In Progress</p>
                  <p className="text-sm text-blue-800 mt-1">
                    Seller has accepted your order. Pickup scheduled for Jan 20.
                  </p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </Card>

            {/* Items Ordered */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {mockOrderDetail.items.map((item) => (
                  <div key={item.id} className="flex justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.quantity} {item.unit} • {item.category} • {item.condition}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.total}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} per {item.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Seller Information */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{mockOrderDetail.seller.name}</p>
                  {mockOrderDetail.seller.verified && <p className="text-sm text-green-600 mt-1">✓ Verified Seller</p>}
                  <p className="text-sm text-gray-600 mt-2">{mockOrderDetail.seller.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-600">{mockOrderDetail.seller.rating}</p>
                  <p className="text-sm text-gray-600">{mockOrderDetail.seller.reviews} reviews</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => setContactDialog({ isOpen: true })}
              >
                Contact Seller
              </Button>
            </Card>

            {/* Delivery Information */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Delivery Method</p>
                  <p className="font-semibold text-gray-900">{mockOrderDetail.deliveryInfo.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-semibold text-gray-900">{mockOrderDetail.deliveryInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(mockOrderDetail.deliveryInfo.estimatedDate).toLocaleDateString()}
                  </p>
                </div>
                {mockOrderDetail.deliveryInfo.trackingId && (
                  <div>
                    <p className="text-sm text-gray-600">Tracking ID</p>
                    <p className="font-semibold text-gray-900 font-mono">{mockOrderDetail.deliveryInfo.trackingId}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Environmental Impact */}
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-bold text-gray-900 mb-4">Your Environmental Impact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{mockOrderDetail.impactMetrics.wasteSaved}</p>
                  <p className="text-xs text-green-800 mt-1">kg Waste Diverted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{mockOrderDetail.impactMetrics.carbonSaved}</p>
                  <p className="text-xs text-blue-800 mt-1">kg CO₂ Avoided</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">{mockOrderDetail.impactMetrics.waterSaved}</p>
                  <p className="text-xs text-cyan-800 mt-1">L Water Saved</p>
                </div>
              </div>
            </Card>

            {/* Dispute Section */}
            {!showDispute ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => setShowDispute(true)}
                >
                  Report Issue
                </Button>
              </div>
            ) : (
              <Card className="p-6 bg-red-50 border-red-200">
                <h3 className="font-bold text-red-900 mb-4">Report a Quality Issue</h3>
                <Textarea
                  placeholder="Describe the issue with your order..."
                  value={disputeMessage}
                  onChange={(e) => setDisputeMessage(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">Submit Report</Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setShowDispute(false)
                      setDisputeMessage("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Order Summary */}
            <Card className="p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${mockOrderDetail.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${mockOrderDetail.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-emerald-600">${mockOrderDetail.total}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900">{mockOrderDetail.paymentMethod}</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <ContactSellerDialog
        isOpen={contactDialog.isOpen}
        onClose={() => setContactDialog({ isOpen: false })}
        sellerName={mockOrderDetail.seller.name}
        sellerLocation={mockOrderDetail.seller.location}
        materialTitle={mockOrderDetail.items[0].title}
      />

      <Footer />
    </div>
  )
}
