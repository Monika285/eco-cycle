"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ContactSellerDialogProps {
  isOpen: boolean
  onClose: () => void
  sellerName: string
  sellerLocation: string
  materialTitle: string
}

export function ContactSellerDialog({
  isOpen,
  onClose,
  sellerName,
  sellerLocation,
  materialTitle,
}: ContactSellerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to a backend API
    console.log("[v0] Contact seller form submitted:", { ...formData, seller: sellerName, material: materialTitle })
    setSubmitted(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setFormData({ name: "", email: "", phone: "", message: "" })
    setSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Contact Seller</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">
                Your message has been sent to {sellerName}. They will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Seller:</span> {sellerName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span> {sellerLocation}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Material:</span> {materialTitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi! I'm interested in this material. Could you provide more details about availability and pricing?"
                    required
                    className="w-full min-h-32"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    disabled={!formData.name || !formData.email || !formData.message}
                  >
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
