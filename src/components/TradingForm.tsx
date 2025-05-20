
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// This would come from API in production
const pairs = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "XRP/USDT"];

const TradingForm = () => {
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [pair, setPair] = useState("BTC/USDT");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [isAdvanced, setIsAdvanced] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast({
        title: "Validation Error",
        description: "Please enter an amount",
        variant: "destructive"
      });
      return;
    }
    
    if (orderType === "limit" && !price) {
      toast({
        title: "Validation Error",
        description: "Please enter a price for limit order",
        variant: "destructive"
      });
      return;
    }
    
    // This would send the order to your backend in production
    toast({
      title: "Order Submitted",
      description: `${side.toUpperCase()} ${amount} ${pair} at ${orderType === "market" ? "market price" : `$${price}`}`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
        <CardDescription>Create a new spot market or limit order</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pair">Trading Pair</Label>
                <Select 
                  value={pair} 
                  onValueChange={setPair}
                >
                  <SelectTrigger id="pair">
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {pairs.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type</Label>
                <Select 
                  value={orderType} 
                  onValueChange={setOrderType}
                >
                  <SelectTrigger id="orderType">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs value={side} onValueChange={setSide} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy" className="data-[state=active]:bg-crypto-green data-[state=active]:text-white">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-crypto-red data-[state=active]:text-white">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {pair.split("/")[0]}
                </div>
              </div>
            </div>
            
            {orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {pair.split("/")[1]}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="advanced" className="cursor-pointer">Advanced options</Label>
              <Switch 
                id="advanced" 
                checked={isAdvanced} 
                onCheckedChange={setIsAdvanced} 
              />
            </div>
            
            {isAdvanced && (
              <div className="space-y-2 animate-slide-up">
                <Label htmlFor="tpsl">Take Profit / Stop Loss</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      id="takeProfit"
                      type="number"
                      placeholder="Take Profit"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {pair.split("/")[1]}
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      id="stopLoss"
                      type="number"
                      placeholder="Stop Loss"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {pair.split("/")[1]}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className={`w-full mt-6 ${side === "buy" ? "bg-crypto-green hover:bg-crypto-green/90" : "bg-crypto-red hover:bg-crypto-red/90"}`}
          >
            {side === "buy" ? "Buy" : "Sell"} {pair.split("/")[0]}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradingForm;
