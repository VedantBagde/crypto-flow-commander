
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from API in production
const mockActivities = [
  {
    id: "1",
    type: "buy",
    pair: "BTC/USDT",
    amount: "0.05",
    price: "36241.50",
    total: "1812.08",
    status: "completed",
    time: "2023-05-20 14:32"
  },
  {
    id: "2",
    type: "sell",
    pair: "ETH/USDT",
    amount: "1.2",
    price: "2418.32",
    total: "2901.98",
    status: "completed",
    time: "2023-05-19 09:45"
  },
  {
    id: "3",
    type: "buy",
    pair: "SOL/USDT",
    amount: "10",
    price: "124.56",
    total: "1245.60",
    status: "completed",
    time: "2023-05-18 16:20"
  },
  {
    id: "4",
    type: "deposit",
    asset: "USDT",
    amount: "5000",
    status: "completed",
    time: "2023-05-17 11:05"
  },
  {
    id: "5",
    type: "withdrawal",
    asset: "BTC",
    amount: "0.1",
    status: "completed",
    time: "2023-05-15 13:45"
  }
];

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "buy" ? "bg-crypto-green/20 text-crypto-green" :
                  activity.type === "sell" ? "bg-crypto-red/20 text-crypto-red" :
                  activity.type === "deposit" ? "bg-crypto-yellow/20 text-crypto-yellow" :
                  "bg-primary/20 text-primary"
                }`}>
                  {activity.type === "buy" ? "B" :
                   activity.type === "sell" ? "S" :
                   activity.type === "deposit" ? "D" : "W"}
                </div>
                <div>
                  <div className="font-medium">
                    {activity.type === "buy" ? "Buy " :
                     activity.type === "sell" ? "Sell " :
                     activity.type === "deposit" ? "Deposit " : "Withdrawal "}
                    {activity.pair ? activity.pair.split("/")[0] : activity.asset}
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {activity.type === "buy" || activity.type === "deposit" ? "+" : "-"}
                  {activity.amount} {activity.pair ? activity.pair.split("/")[0] : activity.asset}
                </div>
                {activity.total && (
                  <div className="text-sm text-muted-foreground">
                    ${activity.total}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
