import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Palette, Video, CreditCard } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Play },
    { name: "Features", path: "/features", icon: Sparkles },
    { name: "Canvas", path: "/canvas", icon: Palette },
    { name: "Pipeline", path: "/pipeline", icon: Video },
    { name: "Pricing", path: "/pricing", icon: CreditCard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StoryAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "secondary" : "ghost"} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm" className="hover-glow hover:scale-105 transition-transform">
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;