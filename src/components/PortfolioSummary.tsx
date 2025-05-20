
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data - this would come from the real API
const mockPortfolioData = [
  { name: "Jan", value: 12400 },
  { name: "Feb", value: 14800 },
  { name: "Mar", value: 13200 },
  { name: "Apr", value: 16900 },
  { name: "May", value: 15800 },
  { name: "Jun", value: 21000 },
  { name: "Jul", value: 19500 },
];

const mockAssets = [
  { name: "Bitcoin", symbol: "BTC", value: 12400, percentage: 45 },
  { name: "Ethereum", symbol: "ETH", value: 5800, percentage: 21 },
  { name: "Binance Coin", symbol: "BNB", value: 3200, percentage: 12 },
  { name: "Others", symbol: "", value: 6100, percentage: 22 },
];

const PortfolioSummary = () => {
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-crypto-green mb-6">+$1,560 (7.35%)</div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockPortfolioData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Assets Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAssets.map((asset) => (
              <div key={asset.name || "others"}>
                <div className="flex justify-between mb-1">
                  <div className="font-medium">
                    {asset.name}
                    {asset.symbol && <span className="text-muted-foreground ml-1">({asset.symbol})</span>}
                  </div>
                  <div>${asset.value.toLocaleString()}</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${asset.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 text-right">{asset.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
