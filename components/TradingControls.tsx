"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowUpDown, Loader2, DollarSign, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const TradingControls = () => {
  const [buyPrice, setBuyPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [stopLoss, setStopLoss] = useState("20")
  const [stopLossPrice, setStopLossPrice] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const executeTrade = async () => {
    setIsExecuting(true)
    // Simulate trade execution
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExecuting(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const updateStopLoss = (value: string) => {
    setStopLoss(value)
    if (buyPrice) {
      const price = Number.parseFloat(buyPrice.replace(/[^0-9.]/g, ""))
      const stopPrice = price * (1 - Number.parseInt(value) / 100)
      setStopLossPrice(stopPrice.toFixed(2))
    }
  }

  return (
    <div className="rounded-lg bg-gray-900 p-4 shadow-lg h-full">
      <h2 className="mb-6 text-xl font-semibold text-white">Trading Controls</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Buy Target Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="e.g. 2900"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 pl-10 text-white placeholder-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Sell Target Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="e.g. 3100"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 pl-10 text-white placeholder-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Stop Loss</label>
            <span className="text-sm font-medium text-gray-300">{stopLoss}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={stopLoss}
            onChange={(e) => updateStopLoss(e.target.value)}
            className="w-full accent-red-500"
          />
          {stopLossPrice && buyPrice && (
            <div className="mt-2 rounded-md bg-red-900/50 p-2 text-sm text-red-300 flex items-center">
              <AlertTriangle size={16} className="mr-2" />
              Stop Loss Price: ${stopLossPrice}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Button
            onClick={executeTrade}
            disabled={isExecuting}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white disabled:bg-green-800 disabled:text-gray-300 transition-colors duration-200"
          >
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Executing Trade...
              </>
            ) : (
              <>
                <ArrowUpDown className="mr-2 h-5 w-5" />
                Execute Trade
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg bg-green-900/50 p-4 text-center text-green-300"
            >
              AgentKit is now executing trades on your behalf! 🚀
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

