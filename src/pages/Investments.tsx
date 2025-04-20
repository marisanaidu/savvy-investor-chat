
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Investments = () => {
  const { toast } = useToast();

  const handleInvestClick = (fundName: string, amount: number) => {
    toast({
      title: "Investment Initiated",
      description: `You are about to invest $${amount.toLocaleString()} in ${fundName}. Payment integration coming soon.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-finance-primary">Investment Opportunities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2"></div>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Tech Growth Fund</span>
              <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className="font-medium">Moderate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">5Y Return</span>
                <span className="font-medium text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  68.45%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min Investment</span>
                <span className="font-medium">$1,000</span>
              </div>
              <Button 
                className="w-full bg-finance-primary hover:bg-finance-primary/90"
                onClick={() => handleInvestClick("Tech Growth Fund", 1000)}
              >
                Invest Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-r from-green-500 to-green-700 h-2"></div>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Sustainable Energy</span>
              <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className="font-medium">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">5Y Return</span>
                <span className="font-medium text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  81.32%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min Investment</span>
                <span className="font-medium">$2,500</span>
              </div>
              <Button 
                className="w-full bg-finance-primary hover:bg-finance-primary/90"
                onClick={() => handleInvestClick("Sustainable Energy", 2500)}
              >
                Invest Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-2"></div>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Global Bond Index</span>
              <Star className="h-5 w-5 stroke-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className="font-medium">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">5Y Return</span>
                <span className="font-medium text-red-500 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  12.25%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min Investment</span>
                <span className="font-medium">$500</span>
              </div>
              <Button 
                className="w-full bg-finance-primary hover:bg-finance-primary/90"
                onClick={() => handleInvestClick("Global Bond Index", 500)}
              >
                Invest Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommended Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Risk</th>
                  <th className="pb-3 px-4">1Y Return</th>
                  <th className="pb-3 px-4">5Y Return</th>
                  <th className="pb-3 pl-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 pr-4">S&P 500 Index Fund</td>
                  <td className="px-4">Equity</td>
                  <td className="px-4">Medium</td>
                  <td className="px-4 text-green-500">+12.7%</td>
                  <td className="px-4 text-green-500">+53.2%</td>
                  <td className="pl-4">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 pr-4">Total Bond Market ETF</td>
                  <td className="px-4">Fixed Income</td>
                  <td className="px-4">Low</td>
                  <td className="px-4 text-red-500">-2.1%</td>
                  <td className="px-4 text-green-500">+8.3%</td>
                  <td className="pl-4">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 pr-4">Emerging Markets Fund</td>
                  <td className="px-4">Equity</td>
                  <td className="px-4">High</td>
                  <td className="px-4 text-green-500">+7.4%</td>
                  <td className="px-4 text-green-500">+34.8%</td>
                  <td className="pl-4">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-4">REIT Index Fund</td>
                  <td className="px-4">Real Estate</td>
                  <td className="px-4">Medium</td>
                  <td className="px-4 text-red-500">-4.2%</td>
                  <td className="px-4 text-green-500">+22.1%</td>
                  <td className="pl-4">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;