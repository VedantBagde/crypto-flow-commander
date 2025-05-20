
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Eye, EyeOff, KeyRound, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || !secretKey) {
      toast({
        title: "Validation Error",
        description: "Please provide both API Key and Secret Key",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    // This would connect to your backend in production
    setTimeout(() => {
      toast({
        title: "API Connected",
        description: "Your Binance API has been connected successfully",
      });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" /> 
          Connect to Binance API
        </CardTitle>
        <CardDescription>
          Enter your Binance API credentials to access your trading account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Binance API key"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Key</Label>
            <div className="relative">
              <Input
                id="secretKey"
                type={showSecret ? "text" : "password"}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your Binance Secret key"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 mt-0.5 shrink-0" />
            <p>
              Your API keys are securely stored and never shared with third parties. For security, we recommend creating API keys with trading permissions only.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90" 
            disabled={submitting}
          >
            {submitting ? "Connecting..." : "Connect API"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApiKeyForm;
