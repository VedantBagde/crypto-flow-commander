
import { useState } from "react";
import Layout from "@/components/Layout";
import ApiKeyForm from "@/components/ApiKeyForm";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    tradeExecutions: true,
    marketUpdates: false,
    newsletter: false
  });
  
  const [defaultFiat, setDefaultFiat] = useState("USD");
  const [theme, setTheme] = useState("dark");
  
  return (
    <Layout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="api">
          <TabsList className="mb-4">
            <TabsTrigger value="api">API Connection</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Binance API Connection</CardTitle>
                  <CardDescription>
                    Connect to Binance to access your trading account and execute trades.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiKeyForm />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Connection Guide</CardTitle>
                  <CardDescription>
                    Follow these steps to set up your Binance API connection securely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 bg-card">
                    <h3 className="font-medium mb-2">Step 1: Create API Keys on Binance</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                      <li>Log in to your Binance account</li>
                      <li>Navigate to API Management (under User Center)</li>
                      <li>Create a new API key (you may need to complete 2FA verification)</li>
                      <li>Set a label for your API key like "CryptoFlow Trading Platform"</li>
                      <li>
                        <strong>Important:</strong> Only enable trading permissions, not withdrawals,
                        for security
                      </li>
                    </ol>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-card">
                    <h3 className="font-medium mb-2">Step 2: Set Restrictions (Recommended)</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                      <li>Restrict API access to specific IP addresses if possible</li>
                      <li>
                        Set up IP whitelisting in Binance to restrict which IP addresses can use your
                        API keys
                      </li>
                      <li>Enable reading and trading, but NOT withdrawals</li>
                    </ol>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-card">
                    <h3 className="font-medium mb-2">Step 3: Connect to CryptoFlow</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                      <li>
                        Copy the API Key and Secret Key from Binance (you'll only see the Secret Key
                        once)
                      </li>
                      <li>Paste them into the connection form above</li>
                      <li>Your keys are encrypted and securely stored in our database</li>
                      <li>Test the connection by making a small trade</li>
                    </ol>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-card">
                    <h3 className="font-medium mb-2">Security Best Practices</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>
                        <strong>Never</strong> enable withdrawal permissions for API keys used with
                        third-party platforms
                      </li>
                      <li>
                        Create separate API keys for different platforms and services
                      </li>
                      <li>
                        Regularly audit and review your active API keys on Binance
                      </li>
                      <li>
                        If you notice any suspicious activity, immediately disable the API key in
                        Binance
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you want to be notified about your trading activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="priceAlerts">Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when your price alerts are triggered
                      </p>
                    </div>
                    <Switch 
                      id="priceAlerts" 
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, priceAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tradeExecutions">Trade Executions</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your orders are executed or filled
                      </p>
                    </div>
                    <Switch 
                      id="tradeExecutions" 
                      checked={notifications.tradeExecutions}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, tradeExecutions: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketUpdates">Market Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily market summaries and trend alerts
                      </p>
                    </div>
                    <Switch 
                      id="marketUpdates" 
                      checked={notifications.marketUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, marketUpdates: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Subscribe to our weekly newsletter with trading insights
                      </p>
                    </div>
                    <Switch 
                      id="newsletter" 
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newsletter: checked})
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email for Notifications</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                  <p className="text-sm text-muted-foreground">
                    We'll send notifications to this email address
                  </p>
                </div>
                
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>
                  Customize your trading experience based on your preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultFiat">Default Fiat Currency</Label>
                  <Select value={defaultFiat} onValueChange={setDefaultFiat}>
                    <SelectTrigger id="defaultFiat">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                      <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chartType">Default Chart Type</Label>
                  <Select defaultValue="candles">
                    <SelectTrigger id="chartType">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candles">Candlestick</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="bars">Bars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tradingViewCharts">TradingView Charts</Label>
                    <p className="text-sm text-muted-foreground">
                      Use TradingView charts instead of default charts
                    </p>
                  </div>
                  <Switch 
                    id="tradingViewCharts" 
                    defaultChecked
                  />
                </div>
                
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security settings to protect your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable 2FA for additional security
                    </p>
                  </div>
                  <Switch 
                    id="2fa" 
                    defaultChecked
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically logout after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch 
                    id="sessionTimeout" 
                    defaultChecked
                  />
                </div>
                
                <Button>Update Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
