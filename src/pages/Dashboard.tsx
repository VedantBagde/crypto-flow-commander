
import Layout from "@/components/Layout";
import MarketOverview from "@/components/MarketOverview";
import PortfolioSummary from "@/components/PortfolioSummary";
import RecentActivities from "@/components/RecentActivities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Wallet, BarChart } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Summary Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$27,500.00</div>
              <p className="text-xs text-muted-foreground">+$1,560 (7.35%)</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">24h Trading Volume</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,240.00</div>
              <p className="text-xs text-muted-foreground">12 trades</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
              <ArrowUp className="h-4 w-4 text-crypto-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SOL</div>
              <p className="text-xs text-crypto-green">+5.67%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Worst Performing</CardTitle>
              <ArrowDown className="h-4 w-4 text-crypto-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">BNB</div>
              <p className="text-xs text-crypto-red">-0.85%</p>
            </CardContent>
          </Card>
        </div>
        
        <PortfolioSummary />
        
        <div className="grid gap-6 md:grid-cols-2">
          <MarketOverview />
          <RecentActivities />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
