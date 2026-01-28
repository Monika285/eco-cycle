"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: string
  title: string
  category: string
  quantity: number
  unit: string
  price: number
  seller: string
  totalPrice: number
  listingType: "sell" | "donate"
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("ecocycle_cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch {
        localStorage.removeItem("ecocycle_cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("ecocycle_cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity, totalPrice: (i.quantity + item.quantity) * i.price }
            : i,
        )
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity, totalPrice: quantity * i.price } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    if (item.listingType === "sell") {
      // Use item.totalPrice which should already be quantity * price
      return sum + (item.totalPrice || 0)
    }
    return sum
  }, 0)
  const tax = Math.round(subtotal * 0.1 * 100) / 100 // 10% tax on sold items only
  const total = subtotal + tax

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, tax, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
