
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

// This would come from a real API in production
const mockCoins = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 36241.50, change: 2.45 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 2418.32, change: 1.23 },
  { symbol: "BNBUSDT", name: "Binance Coin", price: 567.89, change: -0.85 },
  { symbol: "SOLUSDT", name: "Solana", price: 124.56, change: 5.67 },
  { symbol: "ADAUSDT", name: "Cardano", price: 0.5123, change: -1.23 },
  { symbol: "XRPUSDT", name: "Ripple", price: 0.6574, change: 0.32 }
];

const MarketOverview = () => {
  const [markets, setMarkets] = useState(mockCoins);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setMarkets(prev => 
        prev.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() * 0.01 - 0.005)),
          change: coin.change + (Math.random() * 0.2 - 0.1)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 font-medium text-muted-foreground">Asset</th>
                <th className="pb-2 font-medium text-muted-foreground text-right">Price</th>
                <th className="pb-2 font-medium text-muted-foreground text-right">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((coin) => (
                <tr key={coin.symbol} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                        {coin.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={cn(
                    "py-3 text-right font-medium flex items-center justify-end",
                    coin.change >= 0 ? "text-crypto-green" : "text-crypto-red"
                  )}>
                    {coin.change >= 0 ? 
                      <TrendingUp className="h-4 w-4 mr-1" /> : 
                      <TrendingDown className="h-4 w-4 mr-1" />
                    }
                    {coin.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
