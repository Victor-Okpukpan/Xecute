import { PriceChartWidget } from "@/components/PriceChartWidget";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <ConnectButton />
        
        <div className="grid grid-cols-1 min-h-[100vh] gap-4 sm:gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
            {/* <TokenList /> */}
            <div className="border"></div>
            <div className="order-first lg:order-none w-full h-full border">
              <PriceChartWidget />
            </div>
            .
            {/* <TradingControls /> */}
          </div>
      </div>
    </div>
  </div>
  );
}
