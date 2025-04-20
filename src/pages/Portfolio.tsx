import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, TrendingUp, ArrowUp, ArrowDown, PieChart as PieChartIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { month: 'Jan', value: 100000 },
  { month: 'Feb', value: 105000 },
  { month: 'Mar', value: 108000 },
  { month: 'Apr', value: 112000 },
  { month: 'May', value: 115000 },
  { month: 'Jun', value: 128450 },
];

const allocationData = [
  { name: 'Stocks', value: 84320 },
  { name: 'Bonds', value: 36240 },
  { name: 'Cash', value: 7890 },
];

const COLORS = ['#38B2AC', '#9F7AEA', '#F6AD55'];

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-finance-primary">Your Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <h3 className="text-2xl font-bold">$128,450.00</h3>
                <div className="flex items-center text-green-500 mt-1">
                  <ArrowUp size={14} />
                  <span className="text-xs ml-1">+5.3% today</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <TrendingUp className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Stocks</p>
                <h3 className="text-2xl font-bold">$84,320.00</h3>
                <div className="flex items-center text-green-500 mt-1">
                  <ArrowUp size={14} />
                  <span className="text-xs ml-1">+2.7% today</span>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <ChartBar className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Bonds</p>
                <h3 className="text-2xl font-bold">$36,240.00</h3>
                <div className="flex items-center text-green-500 mt-1">
                  <ArrowUp size={14} />
                  <span className="text-xs ml-1">+0.5% today</span>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <PieChart className="text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash</p>
                <h3 className="text-2xl font-bold">$7,890.00</h3>
                <div className="flex items-center text-red-500 mt-1">
                  <ArrowDown size={14} />
                  <span className="text-xs ml-1">-0.2% today</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <PieChart className="text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#38B2AC" 
                  fill="#38B2AC" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;