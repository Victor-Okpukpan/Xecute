"use client"

import { useState } from "react"
import { PriceChartWidget } from "@/components/PriceChartWidget"
import { TradingControls } from "@/components/TradingControls"
import { TokenList } from "@/components/TokenList"
import { ConnectButton } from "@rainbow-me/rainbowkit"
// import { useReadContract } from "wagmi"
// import { abi } from "@/lib/UniswapV3Factory"
import { AiAdviceModal } from "@/components/AiAdviceModal"

// const USDC_ADDRESS = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
// const WETH_ADDRESS="0x4200000000000000000000000000000000000006";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  // const { data: poolAddress } = useReadContract({
  //   abi,
  //   address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  //   functionName: "getPool",
  //   args: [selectedToken, WETH_ADDRESS, 500],
  // })

  const handleTokenSelect = (tokenAddress: string) => {
    setSelectedToken(tokenAddress)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">X-Ecute Trades</h1>
          <ConnectButton />
        </div>
      </header>
      <main className="p-4">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-4">
          <aside className="w-full lg:w-64 shrink-0">
            <TokenList onTokenSelect={handleTokenSelect} />
          </aside>
          <div className="flex-grow">
            <div className="h-[calc(100vh-8rem)] border border-gray-800 rounded-lg overflow-hidden">
              <PriceChartWidget poolAddress={selectedToken as string} />
            </div>
          </div>
          <aside className="w-full lg:w-80 shrink-0">
            <TradingControls />
          </aside>
        </div>
      </main>
      <AiAdviceModal />
    </div>
  )
}

