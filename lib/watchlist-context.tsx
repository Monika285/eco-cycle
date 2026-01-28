"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface WatchlistItem {
  id: string
  title: string
  category: string
  quantity: string
  location: string
  price: string
  image: string
  seller: string
  condition: string
  addedDate: string
}

interface WatchlistContextType {
  items: WatchlistItem[]
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (id: string) => void
  isWatched: (id: string) => boolean
  clearWatchlist: () => void
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WatchlistItem[]>([])

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("ecocycle_watchlist")
    if (storedWatchlist) {
      try {
        setItems(JSON.parse(storedWatchlist))
      } catch {
        localStorage.removeItem("ecocycle_watchlist")
      }
    }
  }, [])

  // Save watchlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("ecocycle_watchlist", JSON.stringify(items))
  }, [items])

  const addToWatchlist = (item: WatchlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) return prev
      return [...prev, { ...item, addedDate: new Date().toISOString() }]
    })
  }

  const removeFromWatchlist = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const isWatched = (id: string) => {
    return items.some((i) => i.id === id)
  }

  const clearWatchlist = () => {
    setItems([])
  }

  return (
    <WatchlistContext.Provider value={{ items, addToWatchlist, removeFromWatchlist, isWatched, clearWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider")
  }
  return context
}
