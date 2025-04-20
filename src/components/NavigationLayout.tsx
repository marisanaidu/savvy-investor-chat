
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "sonner";
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Settings,
  HelpCircle,
  Lock,
  FileText,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";

const NavigationLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("authUser");
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    } else if (user) {
      setIsAuthenticated(true);
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleNavItemClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleFeatureClick = (feature: 'security' | 'privacy' | 'support') => {
    setMobileMenuOpen(false);
    
    switch (feature) {
      case 'security':
        toast.info("Security features and information");
        break;
      case 'privacy':
        toast.info("Privacy policy information");
        break;
      case 'support':
        toast.info("Support information and contact options");
        break;
      default:
        break;
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: PieChart, label: "Portfolio", path: "/portfolio" },
    { icon: TrendingUp, label: "Investments", path: "/investments" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const footerItems = [
    { icon: Lock, label: "Privacy", feature: 'privacy' as const },
    { icon: FileText, label: "Terms", feature: 'security' as const },
    { icon: HelpCircle, label: "Contact", feature: 'support' as const }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onNavItemClick={(message) => {
        if (message) {
          navigate('/');
        }
      }} />
      
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden absolute top-4 right-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold text-finance-primary">Menu</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            
            {isAuthenticated && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-finance-secondary rounded-full p-2 text-white">
                    <User size={16} />
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">User Account</div>
                    <div className="text-xs text-gray-500">user@example.com</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavItemClick(item.path)}
                  className={`w-full flex items-center p-2 rounded-md text-left ${
                    location.pathname === item.path
                      ? "bg-finance-secondary/10 text-finance-secondary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-2" size={16} />
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-2 rounded-md text-left text-gray-600 hover:bg-gray-100"
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </button>
              )}
            </div>
            
            <div className="absolute bottom-8 left-0 w-full px-4">
              <div className="border-t pt-4">
                <div className="flex justify-around">
                  {footerItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleFeatureClick(item.feature)}
                      className="flex flex-col items-center text-gray-500 hover:text-finance-secondary"
                    >
                      <item.icon size={16} />
                      <span className="text-xs mt-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavItemClick(item.path)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    location.pathname === item.path
                      ? "bg-finance-secondary/10 text-finance-secondary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-1" size={14} />
                  {item.label}
                </button>
              ))}
            </div>
            
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:bg-gray-100"
              >
                <LogOut className="mr-1" size={14} />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer onFeatureClick={handleFeatureClick} />
    </div>
  );
};

export default NavigationLayout;