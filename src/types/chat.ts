
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RiskProfile {
  level: 'conservative' | 'moderate' | 'aggressive';
  description: string;
}

export interface InvestmentRecommendation {
  assetClass: string;
  allocation: number;
  description: string;
}

export interface PortfolioRecommendation {
  riskProfile: RiskProfile;
  recommendations: InvestmentRecommendation[];
}

export interface ChartData {
  name: string;
  value: number;
  description?: string;
}