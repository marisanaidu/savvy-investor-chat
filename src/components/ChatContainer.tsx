
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { formatPortfolioRecommendation, generateId, generateResponse, getAIResponseTime } from "@/utils/chatUtils";
import TypingIndicator from "./TypingIndicator";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import PortfolioChart from "./PortfolioChart";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

interface ChatContainerProps {}

const ChatContainer = forwardRef<{ handleSendMessage: (message: string) => void }, ChatContainerProps>(
  (props, ref) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentPortfolio, setCurrentPortfolio] = useState<string | null>(null);
    const [showPortfolio, setShowPortfolio] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // Expose the handleSendMessage method to parent components
    useImperativeHandle(ref, () => ({
      handleSendMessage
    }));

    // Send initial greeting when component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        const initialGreeting: ChatMessageType = {
          id: generateId(),
          role: 'assistant',
          content: "Hello! I'm your investment portfolio advisor. How can I help you today? You can ask me about investment strategies, risk profiles, or specific asset classes.",
          timestamp: new Date(),
        };
        setMessages([initialGreeting]);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    // Auto scroll to bottom when messages change
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const shouldShowPortfolio = (content: string) => {
      const lowerContent = content.toLowerCase();
      return lowerContent.includes("show me a graph") || 
             lowerContent.includes("give me a graph") || 
             lowerContent.includes("display a chart") || 
             lowerContent.includes("give me the graph") ||
             lowerContent.includes("show portfolio") ||
             lowerContent.includes("portfolio visualization");
    };

    const detectPortfolio = (content: string) => {
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes("conservative portfolio") || lowerContent.includes("conservative allocation")) {
        return "conservative";
      } else if (lowerContent.includes("moderate portfolio") || lowerContent.includes("moderate allocation")) {
        return "moderate";
      } else if (lowerContent.includes("aggressive portfolio") || lowerContent.includes("aggressive allocation")) {
        return "aggressive";
      }
      return null;
    };

    const checkForCreatorInfo = (content: string) => {
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes("who created") || 
          lowerContent.includes("who are the creators") || 
          lowerContent.includes("who made") || 
          lowerContent.includes("team behind") ||
          lowerContent.includes("developers")) {
        return true;
      }
      return false;
    };

    const getCreatorResponse = () => {
      return `This application was created by the following team members:
      
1. Maha Lakshmi Naidu
2. Varshitha
3. Manikanta

They designed and developed this investment portfolio advisor to help users make informed financial decisions.`;
    };

    const handleSendMessage = async (content: string) => {
      // Add user message
      const userMessage: ChatMessageType = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      // Simulate AI typing
      setIsTyping(true);
      
      // Generate more variable response times
      const responseTime = getAIResponseTime(content.length);
      
      setTimeout(() => {
        let botResponse;
        
        // Check if asking about creators
        if (checkForCreatorInfo(content)) {
          botResponse = getCreatorResponse();
        } else {
          // Generate context-aware response based on conversation history
          botResponse = generateResponse(content, messages);
        }
        
        // Detect if a portfolio recommendation is being made
        const portfolioType = detectPortfolio(botResponse);
        if (portfolioType) {
          setCurrentPortfolio(portfolioType);
        }
        
        // Check if user wants to see a graph
        if (shouldShowPortfolio(content) && currentPortfolio) {
          setShowPortfolio(true);
          toast({
            title: "Portfolio Visualization Available",
            description: "Scroll down to see your recommended allocation chart",
            duration: 5000,
          });
        } else {
          setShowPortfolio(false);
        }
        
        const botMessage: ChatMessageType = {
          id: generateId(),
          role: 'assistant',
          content: botResponse,
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsTyping(false);
      }, responseTime);
    };

    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-finance-primary text-white px-4 py-3 shadow-md">
          <h2 className="text-xl font-semibold">Investment Portfolio Advisor</h2>
        </div>
        
        <Separator />
        
        <ScrollArea className="flex-grow p-4 chat-container">
          <div className="flex flex-col">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message}
                isSpeaking={false}
              />
            ))}
            {isTyping && <TypingIndicator />}
            
            {currentPortfolio && showPortfolio && (
              <div className="my-6 p-4 border border-finance-secondary/20 rounded-xl bg-gray-50">
                <div className="flex items-center mb-3 text-finance-primary font-medium">
                  <Info size={18} className="mr-2 text-finance-secondary" />
                  Portfolio Visualization
                </div>
                <PortfolioChart portfolioType={currentPortfolio} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;