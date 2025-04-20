
import { Briefcase, TrendingUp, BarChart, Mic, User, Bell, Menu } from "lucide-react";
import { FEATURE_QUESTIONS } from "./ChatInput";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface HeaderProps {
  onNavItemClick?: (questionType: string) => void;
}

const Header = ({ onNavItemClick }: HeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use a try-catch to handle the case where the component is rendered outside Router context
  let navigate;
  let location;
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    console.log("Router context not available for navigation");
  }

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("authUser");
    setIsAuthenticated(!!user);
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavItemClick = (feature: 'smartPortfolios' | 'marketAnalysis') => {
    if (onNavItemClick) {
      // Select a specific question for each category
      if (feature === 'smartPortfolios') {
        // Choose a question from portfolio optimization category
        const questions = FEATURE_QUESTIONS.portfolioOptimization;
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        onNavItemClick(randomQuestion);
      } else if (feature === 'marketAnalysis') {
        // Choose a question from data insights category
        const questions = FEATURE_QUESTIONS.dataInsights;
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        onNavItemClick(randomQuestion);
      }
    } else if (navigate) {
      // If no click handler is provided but navigation is available, navigate to home page
      navigate("/");
    }
  };

  const handleLogoClick = () => {
    if (navigate) {
      navigate("/");
    }
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      if (navigate) {
        navigate("/settings");
      }
    } else {
      if (navigate) {
        navigate("/login");
      } else {
        toast.info("Please sign in to access your account");
      }
    }
  };

  const handleNotificationsClick = () => {
    toast.info("You have no new notifications", {
      description: "We'll notify you when there are updates to your investments"
    });
  };

  return (
    <header 
      className={`w-full ${isScrolled ? 'bg-finance-primary/95 backdrop-blur-sm shadow-lg' : 'bg-finance-primary'} py-4 text-white transition-all duration-300 z-50`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <Briefcase className="mr-2" size={28} />
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold">Savvy Investor</span>
            <div className="flex items-center bg-finance-secondary/40 rounded-full px-2 py-0.5 text-xs">
              <Mic size={12} className="mr-1" />
              <span>Voice Enabled</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button
            className="flex items-center text-finance-secondary hover:text-white transition-colors group"
            onClick={() => handleNavItemClick('smartPortfolios')}
          >
            <TrendingUp className="mr-1 group-hover:scale-110 transition-transform" size={16} />
            <span className="text-sm">Smart Portfolios</span>
          </button>
          <button
            className="flex items-center text-finance-secondary hover:text-white transition-colors group"
            onClick={() => handleNavItemClick('marketAnalysis')}
          >
            <BarChart className="mr-1 group-hover:scale-110 transition-transform" size={16} />
            <span className="text-sm">Market Analysis</span>
          </button>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNotificationsClick}
              className="rounded-full hover:bg-white/10"
            >
              <Bell size={18} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleAccountClick}
              className="rounded-full hover:bg-white/10"
            >
              <User size={18} />
            </Button>
          </div>
        </div>
        
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full hover:bg-white/10"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;