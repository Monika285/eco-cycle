"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactSellerDialog } from "@/components/contact-seller-dialog"
import Link from "next/link"
import { useState } from "react"

const mockOrders = [
  {
    id: "EC-2024-001",
    date: "2024-01-15",
    status: "accepted",
    items: [
      { title: "Recycled Plastic Pellets", quantity: 500, unit: "kg", price: 1250 },
      { title: "Polyester Scraps", quantity: 75, unit: "kg", price: 112.5 },
    ],
    total: 1362.5,
    seller: "GreenPlas Co.",
    sellerLocation: "San Francisco, CA",
    deliveryType: "pickup",
    timeline: [
      { step: "Order Placed", date: "2024-01-15", completed: true },
      { step: "Seller Accepted", date: "2024-01-15", completed: true },
      { step: "Pickup Scheduled", date: "2024-01-18", completed: false },
      { step: "Received & Verified", date: "pending", completed: false },
    ],
  },
  {
    id: "EC-2024-002",
    date: "2024-01-10",
    status: "completed",
    items: [{ title: "Reclaimed Oak Planks", quantity: 200, unit: "pieces", price: 1000 }],
    total: 1000,
    seller: "Sustainable Timber",
    sellerLocation: "Portland, OR",
    deliveryType: "delivery",
    timeline: [
      { step: "Order Placed", date: "2024-01-10", completed: true },
      { step: "Seller Accepted", date: "2024-01-10", completed: true },
      { step: "Shipped", date: "2024-01-12", completed: true },
      { step: "Received & Verified", date: "2024-01-15", completed: true },
    ],
  },
  {
    id: "EC-2024-003",
    date: "2024-01-05",
    status: "completed",
    items: [{ title: "Vintage Denim Bulk", quantity: 100, unit: "kg", price: 0 }],
    total: 0,
    seller: "Textile Artisans Studio",
    sellerLocation: "Austin, TX",
    deliveryType: "pickup",
    isDonation: true,
    timeline: [
      { step: "Order Placed", date: "2024-01-05", completed: true },
      { step: "Seller Accepted", date: "2024-01-05", completed: true },
      { step: "Picked Up", date: "2024-01-07", completed: true },
      { step: "Received & Verified", date: "2024-01-07", completed: true },
    ],
  },
]

export default function OrdersPage() {
  const [contactDialog, setContactDialog] = useState<{
    isOpen: boolean
    sellerName: string
    sellerLocation: string
    materialTitle: string
  }>({
    isOpen: false,
    sellerName: "",
    sellerLocation: "",
    materialTitle: "",
  })

  const handleContactSeller = (seller: string, location: string, material: string) => {
    setContactDialog({
      isOpen: true,
      sellerName: seller,
      sellerLocation: location,
      materialTitle: material,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage all your material purchases and donations</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} onContactSeller={handleContactSeller} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {mockOrders
              .filter((o) => o.status !== "completed")
              .map((order) => (
                <OrderCard key={order.id} order={order} onContactSeller={handleContactSeller} />
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {mockOrders
              .filter((o) => o.status === "completed")
              .map((order) => (
                <OrderCard key={order.id} order={order} onContactSeller={handleContactSeller} />
              ))}
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            {mockOrders
              .filter((o) => o.isDonation)
              .map((order) => (
                <OrderCard key={order.id} order={order} onContactSeller={handleContactSeller} />
              ))}
          </TabsContent>
        </Tabs>
      </main>

      <ContactSellerDialog
        isOpen={contactDialog.isOpen}
        onClose={() => setContactDialog({ ...contactDialog, isOpen: false })}
        sellerName={contactDialog.sellerName}
        sellerLocation={contactDialog.sellerLocation}
        materialTitle={contactDialog.materialTitle}
      />

      <Footer />
    </div>
  )
}

function OrderCard({
  order,
  onContactSeller,
}: {
  order: (typeof mockOrders)[0]
  onContactSeller: (seller: string, location: string, material: string) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Order {order.id}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Placed on {new Date(order.date).toLocaleDateString()} • From {order.seller}
          </p>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {order.status === "accepted" ? "In Progress" : order.status === "completed" ? "Completed" : "Pending"}
        </Badge>
      </div>

      {/* Order Items */}
      <div className="space-y-3 mb-6 pb-6 border-b">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-gray-600">
                {item.quantity} {item.unit}
              </p>
            </div>
            {item.price > 0 ? (
              <p className="font-medium text-emerald-600">${item.price.toFixed(2)}</p>
            ) : (
              <p className="text-green-600 font-medium">Free (Donation)</p>
            )}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <p className="font-semibold text-gray-900 mb-4">Order Timeline</p>
        <div className="relative">
          {order.timeline.map((event, idx) => (
            <div key={idx} className="flex gap-4 mb-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${event.completed ? "bg-emerald-600" : "bg-gray-300"}`} />
                {idx < order.timeline.length - 1 && (
                  <div className={`w-0.5 h-8 ${event.completed ? "bg-emerald-600" : "bg-gray-300"}`} />
                )}
              </div>
              <div className="pb-4">
                <p className={`font-medium ${event.completed ? "text-gray-900" : "text-gray-600"}`}>{event.step}</p>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Footer */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <p className="text-sm text-gray-600">Order Total</p>
          <p className="text-2xl font-bold text-emerald-600">${order.total.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/orders/${order.id}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700">View Details</Button>
          </Link>
          {order.status !== "completed" && (
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => onContactSeller(order.seller, order.sellerLocation, order.items[0].title)}
            >
              Contact Seller
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
