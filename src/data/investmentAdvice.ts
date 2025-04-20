
import { InvestmentRecommendation, PortfolioRecommendation, RiskProfile } from "../types/chat";

export const riskProfiles: Record<string, RiskProfile> = {
  conservative: {
    level: 'conservative',
    description: 'This profile is suitable for investors who prioritize preserving capital and generating income, with minimal tolerance for volatility. Ideal for those nearing retirement or with short time horizons.',
  },
  moderate: {
    level: 'moderate',
    description: 'This profile is suitable for investors seeking a balance between growth and income, with moderate tolerance for market fluctuations. Good for mid-career professionals with medium-term goals.',
  },
  aggressive: {
    level: 'aggressive',
    description: 'This profile is suitable for investors focused on long-term growth, with high tolerance for volatility and market fluctuations. Best for younger investors with long time horizons.',
  },
};

export const portfolios: Record<string, PortfolioRecommendation> = {
  conservative: {
    riskProfile: riskProfiles.conservative,
    recommendations: [
      {
        assetClass: 'Bonds',
        allocation: 50,
        description: 'High-quality government and corporate bonds',
      },
      {
        assetClass: 'Stocks',
        allocation: 20,
        description: 'Blue-chip dividend stocks and value-oriented ETFs',
      },
      {
        assetClass: 'Cash',
        allocation: 15,
        description: 'Money market funds and short-term CDs',
      },
      {
        assetClass: 'Alternative Investments',
        allocation: 5,
        description: 'REITs and preferred securities',
      },
      {
        assetClass: 'International Bonds',
        allocation: 10,
        description: 'Investment-grade foreign bonds',
      },
    ],
  },
  moderate: {
    riskProfile: riskProfiles.moderate,
    recommendations: [
      {
        assetClass: 'Stocks',
        allocation: 45,
        description: 'Mix of growth and value stocks, US and international',
      },
      {
        assetClass: 'Bonds',
        allocation: 30,
        description: 'Diversified bond portfolio including some high-yield',
      },
      {
        assetClass: 'Alternative Investments',
        allocation: 15,
        description: 'REITs, commodities, and infrastructure investments',
      },
      {
        assetClass: 'Cash',
        allocation: 5,
        description: 'Emergency fund and short-term needs',
      },
      {
        assetClass: 'International Stocks',
        allocation: 5,
        description: 'Emerging markets and developed markets',
      },
    ],
  },
  aggressive: {
    riskProfile: riskProfiles.aggressive,
    recommendations: [
      {
        assetClass: 'Stocks',
        allocation: 65,
        description: 'Growth-oriented stocks and small-cap stocks',
      },
      {
        assetClass: 'Bonds',
        allocation: 10,
        description: 'Strategic bond allocation for some stability',
      },
      {
        assetClass: 'Alternative Investments',
        allocation: 10,
        description: 'Private equity and specialized sector ETFs',
      },
      {
        assetClass: 'International Stocks',
        allocation: 15,
        description: 'Emerging markets and international growth stocks',
      },
      {
        assetClass: 'Cryptocurrency',
        allocation: 0,
        description: 'Bitcoin, Ethereum, and other digital assets (optional)',
      },
    ],
  },
};

export const chatbotResponses = {
  greeting: "Hello! I'm your investment portfolio advisor. How can I help you today? You can ask me about investment strategies, risk profiles, or specific asset classes.",
  
  riskAssessment: "To provide personalized investment advice, I need to understand your risk tolerance. Would you describe your investment approach as conservative (low risk), moderate (balanced), or aggressive (higher risk)? Consider factors like your time horizon, financial goals, and comfort with market volatility.",
  
  contextAwarePortfolioIntro: "Based on our previous conversation about risk tolerance, I can suggest a personalized portfolio allocation. Would you like me to recommend a conservative, moderate, or aggressive portfolio strategy?",
  
  portfolioRecommendation: (riskProfile: string) => {
    const profile = riskProfile.toLowerCase();
    if (['conservative', 'moderate', 'aggressive'].includes(profile)) {
      return `Based on your ${profile} risk profile, here's a recommended portfolio allocation:`;
    }
    return "I can recommend portfolios for conservative, moderate, or aggressive risk profiles. Which one would you like to learn about?";
  },
  
  commonQuestions: {
    stocks: "Stocks represent ownership in a company and can provide growth through price appreciation and income through dividends. They typically offer higher potential returns but come with higher volatility. Over long periods, U.S. stocks have historically returned around 10% annually, though past performance doesn't guarantee future results.",
    
    bonds: "Bonds are debt securities that pay interest over a fixed period. They're generally less volatile than stocks and can provide steady income, making them important for more conservative portfolios. Different types include government bonds, municipal bonds, corporate bonds, and high-yield bonds, each with different risk-return profiles.",
    
    etfs: "ETFs (Exchange-Traded Funds) are investment funds traded on stock exchanges. They typically track indexes and offer diversification, lower fees, and tax efficiency compared to actively managed funds. ETFs come in many varieties, including those focused on specific sectors, geographies, or investment strategies.",
    
    mutualFunds: "Mutual funds pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. They offer professional management but typically have higher fees than ETFs. There are actively managed funds that aim to outperform the market and passive funds that track indexes.",
    
    diversification: "Diversification involves spreading investments across various asset classes to reduce risk. A well-diversified portfolio can help protect against significant losses when one market sector underperforms. The concept is often described as 'not putting all your eggs in one basket' and is considered fundamental to prudent investing.",
    
    timeHorizon: "Your investment time horizon is how long you plan to hold your investments before needing the funds. Longer time horizons generally allow for more aggressive strategies, as there's more time to recover from market downturns. Short-term goals (under 3 years) should typically use more conservative investments.",
    
    retirement: "Retirement planning involves creating a strategy to ensure financial security during retirement. This typically includes tax-advantaged accounts like 401(k)s or IRAs, and adjusting your portfolio to become more conservative as you approach retirement age. The 4% rule is a common guideline for sustainable withdrawal rates during retirement.",
    
    taxEfficiency: "Tax-efficient investing strategies aim to minimize taxes on your investments. This includes utilizing tax-advantaged accounts, holding investments long-term for capital gains treatment, and considering tax-loss harvesting. Municipal bonds may offer tax-free income, making them attractive for investors in higher tax brackets.",
    
    inflation: "Inflation erodes purchasing power over time. To combat this, investors should aim for returns that exceed the inflation rate. Stocks, TIPS (Treasury Inflation-Protected Securities), real estate, and some commodities traditionally act as inflation hedges.",
    
    recession: "During economic downturns, defensive assets like high-quality bonds, consumer staples stocks, utilities, and cash typically perform better than growth-oriented investments. Having a diversified portfolio that includes these defensive assets can help mitigate losses during recessions.",
    
    crypto: "Cryptocurrency is a highly volatile alternative asset class with potential for significant returns but also substantial risk. Most financial advisors suggest limiting crypto exposure to no more than 5% of a portfolio, and only for those with high risk tolerance and long time horizons.",
    
    esgInvesting: "ESG (Environmental, Social, and Governance) investing focuses on companies with positive practices in these areas. Research suggests that ESG strategies can match or exceed traditional investment returns while aligning with investors' values and potentially reducing certain types of investment risk."
  },
  
  fallback: "I'm not sure I understand that question. Could you rephrase it? You can ask me about investment strategies, risk profiles, asset classes, or portfolio recommendations."
};