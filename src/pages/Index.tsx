
import Header from "../components/Header";
import ChatContainer from "../components/ChatContainer";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, PieChart, Shield } from "lucide-react";
import { FEATURE_QUESTIONS } from "../components/ChatInput";
import { useRef } from "react";

const Index = () => {
  // Reference to the ChatContainer component
  const chatContainerRef = useRef<{ handleSendMessage: (message: string) => void }>(null);

  // Function to handle feature button clicks
  const handleFeatureClick = (feature: 'dataInsights' | 'portfolioOptimization' | 'riskManagement' | 'security' | 'privacy' | 'support') => {
    if (chatContainerRef.current) {
      // Select a random question from the feature category
      const questions = FEATURE_QUESTIONS[feature];
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      chatContainerRef.current.handleSendMessage(randomQuestion);
    }
  };

  // Function to handle header navigation clicks or direct message sends
  const handleNavItemClick = (message: string) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.handleSendMessage(message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onNavItemClick={handleNavItemClick} />
      
      <main className="container flex-grow mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-finance-primary mb-2">Investment Portfolio Advisor</h1>
              <p className="text-gray-600 mb-4">
                Get personalized investment advice tailored to your financial goals and risk tolerance.
                Chat with our AI advisor to create a diversified portfolio strategy.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <button 
                  onClick={() => handleFeatureClick('dataInsights')}
                  className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <TrendingUp className="text-finance-secondary mr-2" size={20} />
                  <span className="text-sm font-medium">Data-Driven Insights</span>
                </button>
                <button 
                  onClick={() => handleFeatureClick('portfolioOptimization')}
                  className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <PieChart className="text-finance-secondary mr-2" size={20} />
                  <span className="text-sm font-medium">Portfolio Optimization</span>
                </button>
                <button 
                  onClick={() => handleFeatureClick('riskManagement')}
                  className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Shield className="text-finance-secondary mr-2" size={20} />
                  <span className="text-sm font-medium">Risk Management</span>
                </button>
              </div>
            </div>
            
            {/* Single ChatContainer component */}
            <div className="h-[600px]">
              <ChatContainer ref={chatContainerRef} />
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-finance-secondary text-white rounded-full min-w-[20px] h-5 flex items-center justify-center mr-2 text-xs">1</span>
                      <span>Ask about different risk profiles to understand which matches your goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-finance-secondary text-white rounded-full min-w-[20px] h-5 flex items-center justify-center mr-2 text-xs">2</span>
                      <span>Get portfolio recommendations based on your risk tolerance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-finance-secondary text-white rounded-full min-w-[20px] h-5 flex items-center justify-center mr-2 text-xs">3</span>
                      <span>Learn about different asset classes and investment vehicles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Sample Questions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>"What's a conservative investment portfolio?"</li>
                    <li>"Can you explain ETFs and how they work?"</li>
                    <li>"What's the difference between stocks and bonds?"</li>
                    <li>"How should I diversify my investments?"</li>
                    <li>"What's a good retirement investment strategy?"</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-finance-primary text-white">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
                  <p className="text-sm">
                    This chatbot provides general investment information for educational purposes only. It does not constitute financial advice and should not be relied upon for making investment decisions. Always consult with a qualified financial advisor for personalized recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer onFeatureClick={(feature) => {
        if (chatContainerRef.current && FEATURE_QUESTIONS[feature]) {
          const questions = FEATURE_QUESTIONS[feature];
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
          chatContainerRef.current.handleSendMessage(randomQuestion);
        }
      }} />
    </div>
  );
};

export default Index;