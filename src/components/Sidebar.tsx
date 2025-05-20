
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart, 
  CreditCard, 
  Send, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Markets", icon: BarChart, path: "/markets" },
  { name: "Trade", icon: Send, path: "/trade" },
  { name: "Portfolio", icon: CreditCard, path: "/portfolio" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 bg-sidebar shrink-0 border-r border-border h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">CryptoFlow</span>
        </div>
      </div>
      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-6 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary transition-colors">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
