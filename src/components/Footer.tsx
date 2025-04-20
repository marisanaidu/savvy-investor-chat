
import { Shield, Lock, HelpCircle, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FooterProps {
  onFeatureClick: (feature: 'security' | 'privacy' | 'support') => void;
}

const Footer = ({ onFeatureClick }: FooterProps) => {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    console.log("Router context not available for navigation");
  }

  const handleNavigateToHome = () => {
    if (navigate) {
      navigate("/");
    }
  };

  const handleSocialMediaClick = (platform: string) => {
    switch (platform) {
      case 'instagram':
        window.open('https://instagram.com/__n300__', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/maha-lakshmi-naidu-marisa', '_blank');
        break;
      case 'facebook':
        window.open('https://facebook.com/naidu.marisa', '_blank');
        break;
      default:
        break;
    }
  };

  // Handle navigation with toast notification
  const handleNavigation = (path: string) => {
    if (navigate) {
      navigate(path);
    }
    toast.info(`Navigated to ${path.slice(1) || 'home'}`);
  };

  return (
    <footer className="bg-finance-accent text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4 cursor-pointer" onClick={handleNavigateToHome}>
              <Shield className="mr-2" size={24} />
              <span className="text-lg font-bold text-white">Savvy Investor</span>
            </div>
            <p className="text-sm mb-4">Created by:</p>
            <ul className="text-sm list-disc pl-5 mb-4">
              <li>Maha Lakshmi Naidu</li>
              <li>Varshitha</li>
              <li>Manikanta</li>
            </ul>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialMediaClick('facebook')}
              >
                <Facebook size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialMediaClick('linkedin')}
              >
                <Linkedin size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialMediaClick('instagram')}
              >
                <Instagram size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/")}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/portfolio")}
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/investments")}
                  className="hover:text-white transition-colors"
                >
                  Investments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/settings")}
                  className="hover:text-white transition-colors"
                >
                  Settings
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onFeatureClick('security')}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Shield className="mr-1" size={14} />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onFeatureClick('privacy')}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Lock className="mr-1" size={14} />
                  <span>Privacy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onFeatureClick('support')}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <HelpCircle className="mr-1" size={14} />
                  <span>Support</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Terms of Service information");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Get the latest investment insights and updates</p>
            <form className="flex" onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks for subscribing!");
            }}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md bg-gray-700 border-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-finance-secondary text-sm"
              />
              <Button 
                className="rounded-l-none bg-finance-secondary hover:bg-finance-secondary/80" 
                size="sm"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 Savvy Investor. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => toast.info("Disclaimer information")} 
              className="text-xs hover:text-white transition-colors"
            >
              Disclaimer
            </button>
            <button 
              onClick={() => toast.info("Sitemap information")} 
              className="text-xs hover:text-white transition-colors"
            >
              Sitemap
            </button>
            <button 
              onClick={() => toast.info("Accessibility information")} 
              className="text-xs hover:text-white transition-colors"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;