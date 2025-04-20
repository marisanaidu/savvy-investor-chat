
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%] flex-row">
        <div className="bg-gray-100 py-3 px-4 rounded-xl rounded-tl-none">
          <div className="flex space-x-1 items-center h-5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;