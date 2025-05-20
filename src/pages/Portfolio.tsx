
import Layout from "@/components/Layout";
import PortfolioSummary from "@/components/PortfolioSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Mock portfolio data - would come from API in production
const mockAssets = [
  { 
    coin: "Bitcoin", 
    symbol: "BTC", 
    amount: 0.342, 
    price: 36241.50, 
    value: 12394.59, 
    allocation: 45, 
    pnl: 21.5 
  },
  { 
    coin: "Ethereum", 
    symbol: "ETH", 
    amount: 2.4, 
    price: 2418.32, 
    value: 5803.97, 
    allocation: 21, 
    pnl: 8.3 
  },
  { 
    coin: "Binance Coin", 
    symbol: "BNB", 
    amount: 5.63, 
    price: 567.89, 
    value: 3197.22, 
    allocation: 12, 
    pnl: -2.1 
  },
  { 
    coin: "Solana", 
    symbol: "SOL", 
    amount: 24.8, 
    price: 124.56, 
    value: 3089.09, 
    allocation: 11, 
    pnl: 34.7 
  },
  { 
    coin: "Cardano", 
    symbol: "ADA", 
    amount: 3500, 
    price: 0.5123, 
    value: 1793.05, 
    allocation: 6.5, 
    pnl: -5.2 
  },
  { 
    coin: "Ripple", 
    symbol: "XRP", 
    amount: 1850, 
    price: 0.6574, 
    value: 1216.19, 
    allocation: 4.5, 
    pnl: 1.8 
  },
];

// Mock transaction history - would come from API in production
const mockTransactions = [
  { 
    id: "1", 
    type: "buy", 
    coin: "Bitcoin", 
    symbol: "BTC", 
    amount: 0.05, 
    price: 36241.50, 
    total: 1812.08, 
    fee: 1.81, 
    date: "2023-05-20 14:32:45" 
  },
  { 
    id: "2", 
    type: "sell", 
    coin: "Ethereum", 
    symbol: "ETH", 
    amount: 1.2, 
    price: 2418.32, 
    total: 2901.98, 
    fee: 2.90, 
    date: "2023-05-19 09:45:12" 
  },
  { 
    id: "3", 
    type: "buy", 
    coin: "Solana", 
    symbol: "SOL", 
    amount: 10, 
    price: 124.56, 
    total: 1245.60, 
    fee: 1.25, 
    date: "2023-05-18 16:20:33" 
  },
  { 
    id: "4", 
    type: "buy", 
    coin: "Binance Coin", 
    symbol: "BNB", 
    amount: 2, 
    price: 567.89, 
    total: 1135.78, 
    fee: 1.14, 
    date: "2023-05-16 11:15:27" 
  },
  { 
    id: "5", 
    type: "sell", 
    coin: "Cardano", 
    symbol: "ADA", 
    amount: 500, 
    price: 0.5123, 
    total: 256.15, 
    fee: 0.26, 
    date: "2023-05-15 13:45:58" 
  },
];

const Portfolio = () => {
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        
        <PortfolioSummary />
        
        <Card>
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Asset</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Holdings</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Allocation</TableHead>
                  <TableHead className="text-right">PnL (24h)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssets.map((asset) => (
                  <TableRow key={asset.symbol}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                          {asset.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <div>{asset.coin}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${asset.price.toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: asset.price < 1 ? 4 : 2 
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {asset.amount.toLocaleString(undefined, { 
                        minimumFractionDigits: 0, 
                        maximumFractionDigits: asset.amount < 1 ? 4 : 2 
                      })} {asset.symbol}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${asset.value.toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {asset.allocation}%
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      asset.pnl >= 0 ? "text-crypto-green" : "text-crypto-red"
                    }`}>
                      {asset.pnl >= 0 ? "+" : ""}{asset.pnl}%
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/trade?pair=${asset.symbol}USDT`}
                        >
                          Trade
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="text-muted-foreground text-sm">
                          {tx.date}
                        </TableCell>
                        <TableCell className={
                          tx.type === "buy" ? "text-crypto-green" : "text-crypto-red"
                        }>
                          {tx.type.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mr-2">
                              {tx.symbol.substring(0, 1)}
                            </div>
                            <span>{tx.coin}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${tx.price.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: tx.price < 1 ? 4 : 2 
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          {tx.amount.toLocaleString(undefined, { 
                            minimumFractionDigits: 0, 
                            maximumFractionDigits: tx.amount < 1 ? 4 : 2 
                          })} {tx.symbol}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${tx.total.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          ${tx.fee}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="buy">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions
                      .filter(tx => tx.type === "buy")
                      .map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="text-muted-foreground text-sm">
                            {tx.date}
                          </TableCell>
                          <TableCell className="text-crypto-green">
                            {tx.type.toUpperCase()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mr-2">
                                {tx.symbol.substring(0, 1)}
                              </div>
                              <span>{tx.coin}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            ${tx.price.toLocaleString(undefined, { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: tx.price < 1 ? 4 : 2 
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {tx.amount} {tx.symbol}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${tx.total.toLocaleString(undefined, { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: 2 
                            })}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            ${tx.fee}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="sell">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions
                      .filter(tx => tx.type === "sell")
                      .map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="text-muted-foreground text-sm">
                            {tx.date}
                          </TableCell>
                          <TableCell className="text-crypto-red">
                            {tx.type.toUpperCase()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mr-2">
                                {tx.symbol.substring(0, 1)}
                              </div>
                              <span>{tx.coin}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            ${tx.price.toLocaleString(undefined, { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: tx.price < 1 ? 4 : 2 
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {tx.amount} {tx.symbol}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${tx.total.toLocaleString(undefined, { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: 2 
                            })}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            ${tx.fee}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="deposit">
                <div className="text-center py-8 text-muted-foreground">
                  No deposit transactions found
                </div>
              </TabsContent>
              
              <TabsContent value="withdrawal">
                <div className="text-center py-8 text-muted-foreground">
                  No withdrawal transactions found
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Portfolio;
