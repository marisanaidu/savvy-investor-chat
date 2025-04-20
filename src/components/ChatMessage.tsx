
import React from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Avatar } from "@/components/ui/avatar";
import { Briefcase, User, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: ChatMessageType;
  isSpeaking?: boolean;
}

const ChatMessage = ({ message, isSpeaking = false }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex gap-3 mb-4 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0 mt-1">
        <Avatar className={`${isAssistant ? 'bg-finance-primary' : 'bg-gray-100'} h-8 w-8`}>
          {isAssistant ? 
            <Briefcase className="text-white h-4 w-4" /> : 
            <User className="text-gray-600 h-4 w-4" />
          }
        </Avatar>
      </div>
      
      <div className={`max-w-[80%] px-4 py-3 rounded-lg ${
        isAssistant 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-finance-primary/10 ml-auto'
      }`}>
        <div className={`${isAssistant ? 'relative' : ''}`}>
          {isAssistant && isSpeaking && (
            <div className="absolute -left-2 -top-2 flex items-center space-x-1 bg-finance-secondary text-white rounded-full px-2 py-0.5 text-xs">
              <Volume2 size={10} className="animate-pulse" />
              <span>Speaking</span>
            </div>
          )}
          
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
          
          <div className="text-xs text-gray-400 mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;