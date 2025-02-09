"use client";
import { useEffect, useState } from "react";

const PRICE_CHART_ID = "price-chart-widget-container";

export const PriceChartWidget = ({ poolAddress }) => {
  const [address, setAddress] = useState("");
  // const address = poolAddress !==  ? poolAddress : null;

  useEffect(() => {
    if (poolAddress === "0x0000000000000000000000000000000000000000") {
      // alert("Pool does not exist on Uniswap v3");
      return;
    } 
      setAddress(poolAddress);
  
  }, [poolAddress]);

  useEffect(() => {
    if (typeof window === "undefined" || !poolAddress) return;

    const loadWidget = () => {
      if (typeof window.createMyWidget === "function") {
        window.createMyWidget(PRICE_CHART_ID, {
          autoSize: true,
          chainId: "0x2105",
          pairAddress: poolAddress,
          defaultInterval: "1D",
          timeZone:
            Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
          theme: "moralis",
          locale: "en",
          backgroundColor: "#071321",
          gridColor: "#0d2035",
          textColor: "#68738D",
          candleUpColor: "#4CE666",
          candleDownColor: "#E64C4C",
          hideLeftToolbar: false,
          hideTopToolbar: false,
          hideBottomToolbar: false,
        });
      } else {
        console.error("createMyWidget function is not defined.");
      }
    };

    if (!document.getElementById("moralis-chart-widget")) {
      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error("Failed to load the chart widget script.");
      };
      document.body.appendChild(script);
    } else {
      loadWidget();
    }

    // Cleanup function
    return () => {
      const widgetContainer = document.getElementById(PRICE_CHART_ID);
      if (widgetContainer) {
        widgetContainer.innerHTML = "";
      }
    };
  }, [address]);

  return (
    <div className="w-full h-full">
      {poolAddress ? (
        <div
          id={PRICE_CHART_ID}
          style={{ width: "100%", height: "100%" }}
          className="text-sm"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Select a token to view its price chart
        </div>
      )}
    </div>
  );
};
