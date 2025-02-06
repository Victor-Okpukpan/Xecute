import { PriceChartWidget } from "@/components/PriceChartWidget"
import { TradingControls } from "@/components/TradingControls"
import { TokenList } from "@/components/TokenList"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">X-Ecute</h1>
          <ConnectButton />
        </div>
      </header>
      <main className="p-4">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-4">
          <aside className="w-full lg:w-64 shrink-0">
            <TokenList />
          </aside>
          <div className="flex-grow">
            <div className="h-[calc(100vh-8rem)] border border-gray-800 rounded-lg overflow-hidden">
              <PriceChartWidget />
            </div>
          </div>
          <aside className="w-full lg:w-80 shrink-0">
            <TradingControls />
          </aside>
        </div>
      </main>
    </div>
  )
}

