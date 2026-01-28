import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { WatchlistProvider } from "@/lib/watchlist-context"
import { CartProvider } from "@/lib/cart-context"
import { SellerProductsProvider } from "@/lib/seller-products-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EchoCycle - Smart Upcycling Marketplace",
  description:
    "Transform waste into opportunity. Buy, sell, and donate reusable materials while tracking your environmental impact.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <SellerProductsProvider>
            <CartProvider>
              <WatchlistProvider>
                {children}
                <Analytics />
              </WatchlistProvider>
            </CartProvider>
          </SellerProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
