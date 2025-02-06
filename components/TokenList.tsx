"use client"

import { useState } from "react"
import { Star, StarOff } from "lucide-react"
import { motion } from "framer-motion"

interface Token {
  symbol: string
  name: string
  price: number
  change: number
  isTracked: boolean
}

const initialTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", price: 2432.45, change: 2.5, isTracked: false },
  { symbol: "BTC", name: "Bitcoin", price: 43251.78, change: -1.2, isTracked: false },
  { symbol: "SOL", name: "Solana", price: 98.34, change: 5.7, isTracked: false },
  { symbol: "AVAX", name: "Avalanche", price: 34.56, change: -0.8, isTracked: false },
  { symbol: "MATIC", name: "Polygon", price: 1.23, change: 3.4, isTracked: false },
  { symbol: "LINK", name: "Chainlink", price: 18.9, change: 1.9, isTracked: false },
  { symbol: "UNI", name: "Uniswap", price: 7.45, change: -2.1, isTracked: false },
  { symbol: "AAVE", name: "Aave", price: 89.67, change: 4.3, isTracked: false },
]

export const TokenList = () => {
  const [tokens, setTokens] = useState(initialTokens)

  const toggleTracking = (symbol: string) => {
    setTokens((prev) =>
      prev.map((token) => (token.symbol === symbol ? { ...token, isTracked: !token.isTracked } : token)),
    )
  }

  const sortedTokens = [...tokens].sort((a, b) => {
    if (a.isTracked && !b.isTracked) return -1
    if (!a.isTracked && b.isTracked) return 1
    return 0
  })

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-auto rounded-lg bg-gray-900 p-4 shadow-lg scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
      <h2 className="mb-4 text-xl font-semibold text-white">Token Watchlist</h2>
      <div className="space-y-2">
        {sortedTokens.map((token) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between rounded-lg p-2 transition-colors ${
              token.isTracked ? "bg-gray-700 ring-1 ring-yellow-500/50" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{token.symbol}</span>
                <span className="text-xs text-gray-400">{token.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">${token.price.toLocaleString()}</span>
                <span className={`text-xs ${token.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {token.change >= 0 ? "+" : ""}
                  {token.change}%
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleTracking(token.symbol)}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-600 hover:text-white"
            >
              {token.isTracked ? (
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

