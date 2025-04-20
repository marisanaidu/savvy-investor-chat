
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { portfolios } from '@/data/investmentAdvice';

interface PortfolioChartProps {
  portfolioType: string;
}

const COLORS = {
  "Stocks": "#38B2AC",
  "Bonds": "#4299E1", 
  "Cash": "#ECC94B",
  "Alternative Investments": "#9F7AEA",
  "International Bonds": "#2B6CB0",
  "International Stocks": "#4FD1C5",
  "Cryptocurrency": "#F687B3"
};

const DEFAULT_COLOR = "#A0AEC0";

const PortfolioChart = ({ portfolioType }: PortfolioChartProps) => {
  // Get the portfolio data based on the type
  const portfolio = portfolios[portfolioType];
  
  if (!portfolio) {
    return <div>Portfolio data not available</div>;
  }

  // Transform the recommendations into the format required by recharts
  const chartData = portfolio.recommendations
    .filter(rec => rec.allocation > 0)
    .map(rec => ({
      name: rec.assetClass,
      value: rec.allocation,
      description: rec.description
    }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md text-sm">
          <p className="font-medium text-finance-primary">{payload[0].name}: {payload[0].value}%</p>
          <p className="text-gray-600">{payload[0].payload.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <h3 className="text-center text-lg font-medium mb-2 text-gray-700">
        {portfolio.riskProfile.level.charAt(0).toUpperCase() + portfolio.riskProfile.level.slice(1)} Portfolio Allocation
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS] || DEFAULT_COLOR} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;