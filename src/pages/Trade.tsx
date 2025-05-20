
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TradingForm from "@/components/TradingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";

// Mock order book data - would come from API in production
const mockOrderBook = {
  asks: [
    { price: 36250.5, amount: 1.23, total: 44588.12 },
    { price: 36245.7, amount: 0.56, total: 20297.59 },
    { price: 36244.8, amount: 0.78, total: 28271.77 },
    { price: 36241.2, amount: 2.45, total: 88790.94 },
    { price: 36240.1, amount: 1.05, total: 38052.11 },
  ],
  bids: [
    { price: 36235.6, amount: 0.89, total: 32249.68 },
    { price: 36230.9, amount: 1.67, total: 60505.60 },
    { price: 36225.3, amount: 3.45, total: 124977.29 },
    { price: 36220.7, amount: 0.76, total: 27527.73 },
    { price: 36215.2, amount: 2.12, total: 76776.22 },
  ]
};

// Mock recent trades data - would come from API in production
const mockRecentTrades = [
  { id: "1", price: 36241.50, amount: 0.12, time: "14:32:45", type: "buy" },
  { id: "2", price: 36240.25, amount: 0.05, time: "14:32:12", type: "sell" },
  { id: "3", price: 36242.75, amount: 0.08, time: "14:31:58", type: "buy" },
  { id: "4", price: 36238.90, amount: 0.21, time: "14:31:45", type: "sell" },
  { id: "5", price: 36243.10, amount: 0.15, time: "14:31:30", type: "buy" },
  { id: "6", price: 36240.60, amount: 0.03, time: "14:31:15", type: "sell" },
  { id: "7", price: 36242.30, amount: 0.17, time: "14:31:02", type: "buy" },
];

// Mock open orders - would come from API in production
const mockOpenOrders = [
  { 
    id: "1", 
    pair: "BTC/USDT", 
    type: "limit", 
    side: "buy", 
    price: 35500, 
    amount: 0.1, 
    filled: 0, 
    total: 3550, 
    status: "open",
    date: "2023-05-20 10:23:45"
  },
  { 
    id: "2", 
    pair: "ETH/USDT", 
    type: "limit", 
    side: "sell", 
    price: 2500, 
    amount: 2, 
    filled: 0, 
    total: 5000, 
    status: "open",
    date: "2023-05-19 15:45:12"
  },
];

const Trade = () => {
  const [pair, setPair] = useState("BTC/USDT");
  const [price, setPrice] = useState(36241.50);
  const [priceChange, setPriceChange] = useState(2.45);
  const [orderBookData, setOrderBookData] = useState(mockOrderBook);
  const [recentTrades, setRecentTrades] = useState(mockRecentTrades);
  const location = useLocation();
  
  useEffect(() => {
    // Get pair from URL query params if available
    const searchParams = new URLSearchParams(location.search);
    const pairParam = searchParams.get('pair');
    
    if (pairParam) {
      // Convert BTCUSDT format to BTC/USDT format
      const formattedPair = pairParam.replace(/([A-Z0-9]+)([A-Z]+)$/, '$1/$2');
      setPair(formattedPair);
    }
    
    // Simulate price updates - would use WebSocket in production
    const priceInterval = setInterval(() => {
      const newPrice = price + (Math.random() * 10 - 5);
      const newPriceChange = priceChange + (Math.random() * 0.2 - 0.1);
      setPrice(newPrice);
      setPriceChange(newPriceChange);
      
      // Add a new trade occasionally
      if (Math.random() > 0.7) {
        const newTrade = {
          id: Math.random().toString(36).substring(2, 9),
          price: newPrice,
          amount: Math.random() * 0.2 + 0.01,
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          type: Math.random() > 0.5 ? "buy" : "sell"
        };
        
        setRecentTrades(prev => [newTrade, ...prev.slice(0, 6)]);
      }
      
      // Update order book
      setOrderBookData(prev => ({
        asks: prev.asks.map(ask => ({
          ...ask,
          price: ask.price + (Math.random() * 0.5 - 0.25),
          amount: ask.amount + (Math.random() * 0.1 - 0.05),
          total: ask.price * ask.amount
        })).sort((a, b) => a.price - b.price),
        bids: prev.bids.map(bid => ({
          ...bid,
          price: bid.price + (Math.random() * 0.5 - 0.25),
          amount: bid.amount + (Math.random() * 0.1 - 0.05),
          total: bid.price * bid.amount
        })).sort((a, b) => b.price - a.price)
      }));
    }, 3000);
    
    return () => clearInterval(priceInterval);
  }, [location.search, price, priceChange]);
  
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Order book and recent trades */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{pair}</h1>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-sm font-medium ${priceChange >= 0 ? "text-crypto-green" : "text-crypto-red"}`}>
                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="h-[400px] bg-card border-b border-border flex items-center justify-center text-muted-foreground">
                TradingView Chart Widget would be embedded here in production
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-3">Order Book</h3>
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground mb-2">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount (BTC)</div>
                  <div className="text-right">Total (USDT)</div>
                </div>
                
                <div className="space-y-1">
                  {orderBookData.asks.map((ask, index) => (
                    <div key={`ask-${index}`} className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-crypto-red">{ask.price.toFixed(1)}</div>
                      <div className="text-right">{ask.amount.toFixed(4)}</div>
                      <div className="text-right">{ask.total.toFixed(2)}</div>
                    </div>
                  ))}
                  
                  <div className="py-2 text-center font-bold border-y border-border my-2">
                    {price.toFixed(1)}
                  </div>
                  
                  {orderBookData.bids.map((bid, index) => (
                    <div key={`bid-${index}`} className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-crypto-green">{bid.price.toFixed(1)}</div>
                      <div className="text-right">{bid.amount.toFixed(4)}</div>
                      <div className="text-right">{bid.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-3">Recent Trades</h3>
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground mb-2">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount (BTC)</div>
                  <div className="text-right">Time</div>
                </div>
                
                <div className="space-y-1">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="grid grid-cols-3 gap-4 text-sm">
                      <div className={trade.type === "buy" ? "text-crypto-green" : "text-crypto-red"}>
                        {trade.price.toFixed(2)}
                      </div>
                      <div className="text-right">{trade.amount.toFixed(4)}</div>
                      <div className="text-right text-muted-foreground">{trade.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-3">Open Orders</h3>
              
              {mockOpenOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Pair</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Filled</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOpenOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="text-muted-foreground text-sm">
                          {order.date}
                        </TableCell>
                        <TableCell>{order.pair}</TableCell>
                        <TableCell className="capitalize">{order.type}</TableCell>
                        <TableCell className={
                          order.side === "buy" ? "text-crypto-green" : "text-crypto-red"
                        }>
                          {order.side.toUpperCase()}
                        </TableCell>
                        <TableCell className="text-right">${order.price}</TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                        <TableCell className="text-right">{order.filled}</TableCell>
                        <TableCell className="text-right">${order.total}</TableCell>
                        <TableCell className="text-right capitalize">{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No open orders
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Trading form */}
        <div>
          <TradingForm />
        </div>
      </div>
    </Layout>
  );
};

export default Trade;
