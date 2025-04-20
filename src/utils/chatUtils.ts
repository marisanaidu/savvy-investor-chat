import { ChatMessage, PortfolioRecommendation } from "../types/chat";
import { chatbotResponses, portfolios } from "../data/investmentAdvice";

export function generateResponse(message: string, previousMessages: ChatMessage[] = []): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for creator/team information
  if (containsAny(lowerMessage, ['who created', 'creators', 'team', 'who made', 'developers'])) {
    return `This application was created by our talented team:\n\n1) Maha Lakshmi Naidu\n2) Varshitha\n3) Manikanta\n\nThey are passionate about making investment management accessible to everyone.`;
  }
  
  // Only show graph for specific requests
  if (containsAny(lowerMessage, ['show graph', 'display graph', 'portfolio graph', 'give me the graph'])) {
    if (containsAny(lowerMessage, ['conservative'])) {
      return `${chatbotResponses.portfolioRecommendation('conservative')}\n\n${formatPortfolioRecommendation(portfolios.conservative)}`;
    } else if (containsAny(lowerMessage, ['moderate'])) {
      return `${chatbotResponses.portfolioRecommendation('moderate')}\n\n${formatPortfolioRecommendation(portfolios.moderate)}`;
    } else if (containsAny(lowerMessage, ['aggressive'])) {
      return `${chatbotResponses.portfolioRecommendation('aggressive')}\n\n${formatPortfolioRecommendation(portfolios.aggressive)}`;
    }
  }
  
  // Context awareness based on conversation history
  const hasAskedAboutRisk = previousMessages.some(m => 
    m.content.toLowerCase().includes("risk") || m.role === 'assistant' && m.content.includes("risk profile")
  );
  
  // Check for greetings
  if (containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
    return chatbotResponses.greeting;
  }
  
  // Enhanced risk profile detection
  if (containsAny(lowerMessage, ['risk', 'profile', 'assessment', 'tolerance', 'comfortable'])) {
    return chatbotResponses.riskAssessment;
  }

  // Feature button responses
  if (containsAny(lowerMessage, ['data-driven insights', 'market trend', 'data to improve', 'data points', 'economic indicators'])) {
    return `Data-driven insights are crucial for making informed investment decisions. By analyzing market trends, economic indicators, and historical performance data, investors can identify patterns and potential opportunities. 

Some key data points to track include:
1. Price-to-earnings (P/E) ratios
2. Dividend yields
3. Economic indicators like GDP growth and unemployment rates
4. Sector performance trends
5. Volatility measurements

Would you like to know more about specific data metrics that could help with your investment strategy?`;
  }
  
  if (containsAny(lowerMessage, ['portfolio optimization', 'optimize my portfolio', 'asset allocation', 'rebalance', 'smart portfolio'])) {
    return `Portfolio optimization involves strategically allocating your assets to maximize returns while managing risk based on your investment goals and time horizon.

Key portfolio optimization strategies include:
1. **Asset Allocation**: Dividing your portfolio among different asset classes (stocks, bonds, cash, alternatives)
2. **Diversification**: Spreading investments within asset classes to reduce risk
3. **Rebalancing**: Periodically adjusting your portfolio back to target allocations (typically every 6-12 months)
4. **Tax-efficiency**: Placing investments in accounts that minimize tax impact

Would you like me to explain more about any of these optimization techniques?`;
  }
  
  if (containsAny(lowerMessage, ['risk management', 'manage risk', 'stop-loss', 'hedging'])) {
    return `Effective risk management is essential for protecting your investment portfolio. Here are some key risk management strategies:

1. **Diversification**: Spreading investments across different assets, sectors, and geographies
2. **Stop-loss orders**: Setting predetermined price points to sell assets and limit losses
3. **Position sizing**: Limiting how much of your portfolio is allocated to any single investment
4. **Hedging**: Using options, inverse ETFs, or other instruments to offset potential losses
5. **Regular assessment**: Periodically reviewing risk exposure as market conditions change

Would you like to discuss any of these risk management techniques in more detail?`;
  }

  if (containsAny(lowerMessage, ['security', 'secure investments', 'security measures'])) {
    return `Investment security is crucial for protecting your financial assets. Here are important security measures to consider:

1. **Brokerage protection**: Ensure your brokerage is covered by SIPC insurance (up to $500,000 per account)
2. **Two-factor authentication**: Always enable this on investment accounts
3. **Regular monitoring**: Check accounts frequently for unauthorized activity
4. **Secure connections**: Only access financial accounts on secure networks
5. **Fraud alerts**: Set up notifications for unusual account activities

Remember that while your investments may fluctuate in value due to market conditions, the security of your accounts should be robust against unauthorized access or fraud.`;
  }

  if (containsAny(lowerMessage, ['privacy', 'financial data', 'data protected'])) {
    return `Privacy in investing is important for protecting your financial information. Here are some privacy considerations:

1. **Data policies**: Review your brokerage's privacy policy to understand how your information is used
2. **Information sharing**: Opt out of information sharing when possible with financial institutions
3. **Digital footprint**: Be cautious about discussing specific investments on public forums
4. **Third-party apps**: Limit financial app connections to only those you fully trust
5. **Credit freezes**: Consider freezing your credit to prevent unauthorized accounts

Financial institutions are required to maintain certain privacy standards under regulations like Regulation S-P in the US, but you should still take active steps to protect your information.`;
  }

  if (containsAny(lowerMessage, ['support', 'help with investments', 'resources'])) {
    return `There are many resources available to help you with your investment journey:

1. **Financial advisors**: Professional guidance tailored to your situation
2. **Educational resources**: Books, courses, and reputable financial websites
3. **Brokerage tools**: Research tools, screeners, and educational content from your brokerage
4. **Government resources**: SEC's investor.gov website offers unbiased information
5. **Investment communities**: Forums like Bogleheads for peer discussion (use with caution)

For beginners, I recommend starting with educational resources to build a strong foundation of knowledge before making significant investment decisions. Would you like recommendations for specific resources based on your experience level?`;
  }
  
  if (containsAny(lowerMessage, ['market analysis', 'happening in the markets', 'analyze market trends'])) {
    return `Market analysis helps investors understand current conditions and make informed decisions. Here's what's important to know:

1. **Technical Analysis**: Studying price charts and patterns to predict future movements
2. **Fundamental Analysis**: Evaluating companies based on financial health and economic factors
3. **Sentiment Analysis**: Gauging market psychology and investor emotions
4. **Economic Indicators**: Following data like employment rates, inflation, and GDP growth
5. **Global Events**: Understanding how geopolitical events impact markets

The most successful investors typically combine multiple analysis methods and maintain a long-term perspective despite short-term market fluctuations. Would you like to learn more about a specific type of market analysis?`;
  }

  // Remove portfolio visualization for non-graph requests
  if (containsAny(lowerMessage, ['portfolio', 'recommend', 'allocation', 'asset', 'invest', 'strategy'])) {
    const response = chatbotResponses.portfolioRecommendation('');
    return response.split('\n\n')[0]; // Only return the text part, not the visualization part
  }
  
  // Check for specific asset class questions with enhanced responses
  if (containsAny(lowerMessage, ['stocks', 'equities', 'shares'])) {
    return chatbotResponses.commonQuestions.stocks;
  }
  
  if (containsAny(lowerMessage, ['bonds', 'fixed income', 'treasury'])) {
    return chatbotResponses.commonQuestions.bonds;
  }
  
  if (containsAny(lowerMessage, ['etf', 'exchange traded', 'exchange-traded'])) {
    return chatbotResponses.commonQuestions.etfs;
  }
  
  if (containsAny(lowerMessage, ['mutual fund', 'fund'])) {
    return chatbotResponses.commonQuestions.mutualFunds;
  }
  
  if (containsAny(lowerMessage, ['diversif', 'spread', 'allocation'])) {
    return chatbotResponses.commonQuestions.diversification;
  }
  
  if (containsAny(lowerMessage, ['time horizon', 'long term', 'short term'])) {
    return chatbotResponses.commonQuestions.timeHorizon;
  }
  
  if (containsAny(lowerMessage, ['retire', 'pension', '401k', 'ira'])) {
    return chatbotResponses.commonQuestions.retirement;
  }
  
  if (containsAny(lowerMessage, ['tax', 'efficient', 'taxes'])) {
    return chatbotResponses.commonQuestions.taxEfficiency;
  }
  
  // New specialized financial questions
  if (containsAny(lowerMessage, ['inflation', 'rising prices'])) {
    return chatbotResponses.commonQuestions.inflation;
  }
  
  if (containsAny(lowerMessage, ['recession', 'economic downturn', 'bear market'])) {
    return chatbotResponses.commonQuestions.recession;
  }
  
  if (containsAny(lowerMessage, ['crypto', 'bitcoin', 'ethereum', 'blockchain'])) {
    return chatbotResponses.commonQuestions.crypto;
  }
  
  if (containsAny(lowerMessage, ['esg', 'sustainable', 'ethical', 'responsible'])) {
    return chatbotResponses.commonQuestions.esgInvesting;
  }
  
  // Fallback response
  return chatbotResponses.fallback;
}

function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => text.includes(keyword));
}

export function formatPortfolioRecommendation(portfolio: PortfolioRecommendation): string {
  let result = `**${portfolio.riskProfile.level.charAt(0).toUpperCase() + portfolio.riskProfile.level.slice(1)} Portfolio**\n\n`;
  result += `${portfolio.riskProfile.description}\n\n`;
  result += "**Recommended Allocation:**\n";
  
  portfolio.recommendations.forEach((rec) => {
    if (rec.allocation > 0) {
      result += `- ${rec.assetClass}: ${rec.allocation}% (${rec.description})\n`;
    }
  });
  
  return result;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getAIResponseTime(messageLength: number): number {
  // Simulate variable response times based on message length
  const baseTime = 1000; // Base time in milliseconds
  const variableTime = Math.min(messageLength * 20, 2000); // Variable time based on length, max 2 seconds
  return baseTime + variableTime + Math.random() * 500; // Add some randomness
}