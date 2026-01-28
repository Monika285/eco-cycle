"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface SellerProduct {
  id: string
  sellerId: string
  title: string
  category: "Plastics" | "Textiles" | "Electronics" | "Wood"
  quantity: string
  location: string
  price: string
  listingType: "sell" | "donate"
  condition: string
  description: string
  specifications: string[]
  images: string[] // Base64 encoded images
  minimumOrder: string
  leadTime: string
  certifications: string[]
  createdAt: number
  seller: {
    name: string
    company: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    rating: number
    reviews: number
  }
}

interface SellerProductsContextType {
  products: SellerProduct[]
  addProduct: (product: Omit<SellerProduct, "id" | "createdAt">) => Promise<string>
  updateProduct: (id: string, product: Partial<SellerProduct>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductById: (id: string) => SellerProduct | null
  getProductsBySeller: (sellerId: string) => SellerProduct[]
}

const SellerProductsContext = createContext<SellerProductsContextType | undefined>(undefined)

export function SellerProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<SellerProduct[]>([])

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("ecocycle_seller_products")
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts))
      } catch {
        localStorage.removeItem("ecocycle_seller_products")
      }
    }
  }, [])

  const addProduct = async (product: Omit<SellerProduct, "id" | "createdAt">) => {
    const newProduct: SellerProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    }

    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem("ecocycle_seller_products", JSON.stringify(updatedProducts))

    return newProduct.id
  }

  const updateProduct = async (id: string, product: Partial<SellerProduct>) => {
    const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...product } : p))
    setProducts(updatedProducts)
    localStorage.setItem("ecocycle_seller_products", JSON.stringify(updatedProducts))
  }

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem("ecocycle_seller_products", JSON.stringify(updatedProducts))
  }

  const getProductById = (id: string): SellerProduct | null => {
    return products.find((p) => p.id === id) || null
  }

  const getProductsBySeller = (sellerId: string): SellerProduct[] => {
    return products.filter((p) => p.sellerId === sellerId)
  }

  return (
    <SellerProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsBySeller,
      }}
    >
      {children}
    </SellerProductsContext.Provider>
  )
}

export function useSellerProducts() {
  const context = useContext(SellerProductsContext)
  if (!context) {
    throw new Error("useSellerProducts must be used within SellerProductsProvider")
  }
  return context
}
