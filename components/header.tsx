"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useWatchlist } from "@/lib/watchlist-context"
import Link from "next/link"
import { Heart } from "lucide-react"

export function Header() {
  const { user } = useAuth()
  const { items } = useWatchlist()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
              <span className="text-sm font-bold text-white">EC</span>
            </div>
            <span className="text-lg font-bold text-gray-900">EcoCycle</span>
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Link href="/marketplace" className="text-sm font-medium text-gray-700 transition hover:text-emerald-600">
              Buy Materials
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 transition hover:text-emerald-600">
              Upcycled Products
            </Link>
            {user && (
              <>
                <Link href="/matching" className="text-sm font-medium text-gray-700 transition hover:text-emerald-600">
                  Smart Matches
                </Link>
                {user.userType !== "buyer" && (
                  <Link href="/seller/dashboard" className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700 font-semibold">
                    Seller Hub
                  </Link>
                )}
              </>
            )}
            <Link
              href="/watchlist"
              className="text-sm font-medium text-gray-700 transition hover:text-emerald-600 relative"
            >
              Watchlist
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex gap-3">
            {user ? (
              <>
                <Link href="/watchlist" className="relative md:hidden">
                  <Button variant="outline" size="sm" className="bg-transparent border-gray-300">
                    <Heart className="w-4 h-4" />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {items.length}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-gray-300 bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
