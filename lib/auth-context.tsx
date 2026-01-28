"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  userType: "buyer" | "seller" | "artisan"
  company?: string
  avatar?: string
  bio?: string
  location?: string
  rating?: number
  reviews?: number
  impactStats?: {
    wasteSaved: number
    emissionsSaved: number
    productsSold: number
  }
  preferences?: {
    contributionFocus: "buying" | "selling" | "donating" | "balanced"
    materialInterests: string[]
    frequency: "occasional" | "regular" | "frequent"
    donationPercentage: number
    buyingPercentage: number
    sellingPercentage: number
    completedPreferences: boolean
    environmentImpact?: {
      monthlyWasteGoal: number // kg per month
      carbonReductionGoal: number // kg CO2
      productsPerMonth: number
      donationGoal: number // items per month
    }
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: Omit<User, "id"> & { password: string }) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  updatePreferences: (preferences: Partial<User["preferences"]>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ecocycle_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("ecocycle_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production would call API
    if (!email || !password) {
      throw new Error("Email and password required")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      userType: "seller",
      avatar: "/avatar-placeholder.svg",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 45,
      impactStats: {
        wasteSaved: 1500,
        emissionsSaved: 350,
        productsSold: 12,
      },
    }

    setUser(mockUser)
    localStorage.setItem("ecocycle_user", JSON.stringify(mockUser))
  }

  const signup = async (data: Omit<User, "id"> & { password: string }) => {
    if (!data.email || !data.password) {
      throw new Error("Email and password required")
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      avatar: "/avatar-placeholder.svg",
      impactStats: {
        wasteSaved: 0,
        emissionsSaved: 0,
        productsSold: 0,
      },
    }

    setUser(newUser)
    localStorage.setItem("ecocycle_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecocycle_user")
  }

  const updateProfile = async (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...data }
      localStorage.setItem("ecocycle_user", JSON.stringify(updated))
      return updated
    })
  }

  const updatePreferences = async (preferences: Partial<User["preferences"]>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = {
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      }
      localStorage.setItem("ecocycle_user", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, updateProfile, updatePreferences }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
