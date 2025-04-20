
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Send, Sparkles, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What's a conservative portfolio?",
  "How should I invest during inflation?",
  "Tell me about ESG investing",
  "What are ETFs?",
  "How much should I invest for retirement?",
];

// Custom categories for the main feature buttons
export const FEATURE_QUESTIONS = {
  dataInsights: [
    "Show me market trend analysis",
    "How can I use data to improve my portfolio?",
    "What data points should I track for my investments?",
    "What are the latest market trends?",
    "How do I interpret economic indicators?"
  ],
  portfolioOptimization: [
    "How can I optimize my portfolio?",
    "What is asset allocation?",
    "How often should I rebalance my portfolio?",
    "What's a smart portfolio strategy?",
    "Help me build a balanced investment portfolio"
  ],
  riskManagement: [
    "How can I manage risk in my investments?", 
    "What is diversification?",
    "How do I set up stop-loss orders?",
  ],
  security: [
    "How secure are my investments?",
    "What security measures should I look for in investment platforms?",
  ],
  privacy: [
    "How is my financial data protected?",
    "What privacy concerns should I have with online investing?",
  ],
  support: [
    "How can I get help with my investments?",
    "What resources are available for new investors?",
  ],
  smartPortfolios: [
    "What makes a smart portfolio?",
    "How can AI help with portfolio management?",
    "What are modern portfolio strategies?",
  ],
  marketAnalysis: [
    "What's happening in the markets today?",
    "How do I analyze market trends?",
    "What economic indicators should I follow?",
  ]
};

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>(
    SUGGESTED_QUESTIONS.slice(0, 3)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      
      // Rotate suggestions
      const rotatedSuggestions = [...SUGGESTED_QUESTIONS.slice(3), ...SUGGESTED_QUESTIONS.slice(0, 3)];
      setActiveSuggestions(rotatedSuggestions.slice(0, 3));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (disabled) return;
    
    onSendMessage(suggestion);
    
    // Rotate to different suggestions
    const remainingSuggestions = SUGGESTED_QUESTIONS.filter(q => !activeSuggestions.includes(q));
    setActiveSuggestions(
      remainingSuggestions.length >= 3 
        ? remainingSuggestions.slice(0, 3) 
        : [...remainingSuggestions, ...SUGGESTED_QUESTIONS.filter(q => !remainingSuggestions.includes(q)).slice(0, 3 - remainingSuggestions.length)]
    );
  };

  const clearInput = () => {
    setMessage('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {activeSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={disabled}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full flex items-center transition-colors cursor-pointer"
            type="button"
          >
            <Sparkles size={12} className="mr-1 text-finance-secondary" />
            {suggestion}
          </button>
        ))}
      </div>
      
      <div className="flex items-end gap-2">
        <form onSubmit={handleSubmit} className="flex-1 flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Ask about investments, risk profiles, or portfolio strategies..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-gray-300 focus:border-finance-secondary focus:ring-finance-secondary pr-8"
              disabled={disabled}
            />
            {message && (
              <button 
                type="button"
                onClick={clearInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={!message.trim() || disabled}
            className="bg-finance-primary hover:bg-finance-accent text-white"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;