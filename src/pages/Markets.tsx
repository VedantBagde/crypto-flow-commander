
import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Search } from "lucide-react";

// Mock market data - would come from API in production
const mockMarkets = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 36241.50, change: 2.45, volume: "1.2B", marketCap: "705.4B" },
  { symbol: "ETHUSDT", name: "Ethereum", price: 2418.32, change: 1.23, volume: "623.5M", marketCap: "290.8B" },
  { symbol: "BNBUSDT", name: "Binance Coin", price: 567.89, change: -0.85, volume: "142.7M", marketCap: "86.9B" },
  { symbol: "SOLUSDT", name: "Solana", price: 124.56, change: 5.67, volume: "318.4M", marketCap: "53.2B" },
  { symbol: "ADAUSDT", name: "Cardano", price: 0.5123, change: -1.23, volume: "89.3M", marketCap: "18.2B" },
  { symbol: "XRPUSDT", name: "Ripple", price: 0.6574, change: 0.32, volume: "105.8M", marketCap: "35.7B" },
  { symbol: "DOGEUSDT", name: "Dogecoin", price: 0.0912, change: 1.87, volume: "76.4M", marketCap: "12.8B" },
  { symbol: "DOTUSDT", name: "Polkadot", price: 6.78, change: -0.45, volume: "42.1M", marketCap: "8.6B" },
  { symbol: "AVAXUSDT", name: "Avalanche", price: 35.67, change: 3.24, volume: "87.9M", marketCap: "12.9B" },
  { symbol: "MATICUSDT", name: "Polygon", price: 0.7821, change: 0.98, volume: "65.3M", marketCap: "7.3B" },
];

const Markets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null,
    direction: 'ascending' | 'descending'
  }>({
    key: null,
    direction: 'ascending'
  });
  
  const filteredMarkets = mockMarkets.filter((market) => 
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'ascending' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Markets</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search markets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Spot</Button>
            <Button variant="outline" size="sm">Futures</Button>
            <Button variant="outline" size="sm">Favorites</Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] cursor-pointer" onClick={() => requestSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort('price')}>
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort('change')}>
                  24h Change {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort('volume')}>
                  24h Volume {sortConfig.key === 'volume' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort('marketCap')}>
                  Market Cap {sortConfig.key === 'marketCap' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMarkets.map((market) => (
                <TableRow key={market.symbol}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                        {market.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <div>{market.name}</div>
                        <div className="text-xs text-muted-foreground">{market.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${market.price.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: market.price < 1 ? 4 : 2 
                    })}
                  </TableCell>
                  <TableCell 
                    className={`text-right font-medium flex items-center justify-end ${
                      market.change >= 0 ? "text-crypto-green" : "text-crypto-red"
                    }`}
                  >
                    {market.change >= 0 ? 
                      <TrendingUp className="h-4 w-4 mr-1" /> : 
                      <TrendingDown className="h-4 w-4 mr-1" />
                    }
                    {market.change.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">${market.volume}</TableCell>
                  <TableCell className="text-right">${market.marketCap}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.location.href = `/trade?pair=${market.symbol}`}
                    >
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Markets;
