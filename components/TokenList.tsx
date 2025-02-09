/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Star, StarOff } from "lucide-react";
import { motion } from "framer-motion";
import type React from "react"; // Added import for React
import { dummyTokens } from "@/lib/constants";

// interface Token {
//   address: string;
//   circulating_market_cap: string;
//   decimals: string;
//   exchange_rate: string;
//   holders: string;
//   icon_url: string;
//   name: string;
//   symbol: string;
//   total_supply: string;
//   type: string;
//   volume_24h: string;
//   isTracked: boolean;
// }

interface Token {
  token: string;
  symbol: string
  address: string;
  pair: string;
  isTracked: boolean;
}

interface TokenListProps {
  onTokenSelect: (tokenAddress: string) => void;
}

// const API_URL = "https://base.blockscout.com/api/v2/tokens?type=ERC-20";

export const TokenList: React.FC<TokenListProps> = ({ onTokenSelect }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchTokens = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch tokens");
  //       }
  //       const data = await response.json();
  //       const formattedTokens = data.items.map((item: Token) => ({
  //         ...item,
  //         isTracked: false,
  //       }));
  //       setTokens(formattedTokens);
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTokens();
  // }, []);

  useEffect(() => {

    

    setTokens(dummyTokens)
  }, []);

  const toggleTracking = (address: string) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.address === address
          ? { ...token, isTracked: !token.isTracked }
          : token
      )
    );
  };

  const handleTokenClick = (token: Token) => {
    onTokenSelect(token.pair);
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    if (a.isTracked && !b.isTracked) return -1;
    if (!a.isTracked && b.isTracked) return 1;
    return b.token.localeCompare(a.token);
  });

  // if (loading) {
  //   return (
  //     <div className="h-[calc(100vh-8rem)] flex items-center justify-center rounded-lg bg-gray-900 p-4 shadow-lg">
  //       <Loader2 className="h-8 w-8 animate-spin text-white" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="h-[calc(100vh-8rem)] flex items-center justify-center rounded-lg bg-gray-900 p-4 shadow-lg">
  //       <p className="text-red-500">Error: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-auto rounded-lg bg-gray-900 p-4 shadow-lg scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
      <h2 className="mb-4 text-xl font-semibold text-white">Token Watchlist</h2>
      <div className="space-y-2">
        {sortedTokens.map((token) => (
          <motion.div
            key={token.address} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors ${
              token.isTracked
                ? "bg-gray-700 ring-1 ring-yellow-500/50"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => handleTokenClick(token)}
          >
            <div className="flex items-center space-x-2">
              {/* <img
                src={token.icon_url}
                alt={token.name}
                className="w-6 h-6 rounded-full"
              /> */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{token.symbol}</span>
                  <span className="text-xs text-gray-400">{token.token}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">
                    $
                    {Number.parseFloat(token.exchange_rate).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      }
                    )}
                  </span>
                  <span className="text-xs text-gray-400">
                    Vol: $
                    {Number.parseFloat(token.volume_24h).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </span>
                </div> */}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTracking(token.address);
              }}
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
  );
};
