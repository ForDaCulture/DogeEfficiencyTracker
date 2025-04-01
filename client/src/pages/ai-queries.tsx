import React, { useState, useRef, useEffect } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAIAssistant } from '@/components/ai-assistant';
import { apiRequest } from '@/lib/queryClient';

// Types for visualization data
interface VisualizationRequest {
  query: string;
  visualizationType: string;
  dataPoints?: number;
  additionalContext?: string;
}

interface VisualizationResponse {
  visualizationData: string; // Base64 encoded image
  insights: string;
  suggestedQueries: string[];
}

// The main component
export default function AIQueries() {
  const [query, setQuery] = useState('');
  const [visualizationType, setVisualizationType] = useState('bar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState<VisualizationResponse | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('visualize');
  const { toast } = useToast();
  const { openAssistantWithQuery } = useAIAssistant();
  
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleGenerateVisualization = async () => {
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a query to generate a visualization.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const request: VisualizationRequest = {
        query,
        visualizationType,
        dataPoints: 10,
        additionalContext: "Government efficiency metrics and spending analysis"
      };
      
      // Call the OpenAI API through our backend endpoint
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: `Create a ${visualizationType} chart visualization about "${query}" related to government efficiency data. Make it data analytics style, clean, professional, with a title and labeled axes.` 
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Also get analysis through the AI assistant API
      const insightsResponse = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          query: `Provide a brief, data-focused analysis of government ${query}. Include 3-5 key insights and potential optimization opportunities.` 
        })
      });
      
      if (!insightsResponse.ok) {
        throw new Error(`Insights API request failed`);
      }
      
      const insightsData = await insightsResponse.json();
      
      // Mock the suggested queries based on the current query
      const suggestedQueries = [
        `${query} by department`,
        `${query} year-over-year trends`,
        `${query} optimization opportunities`,
        `${query} compared to budget allocations`,
        `${query} efficiency impact`
      ];
      
      setCurrentVisualization({
        visualizationData: data.image,
        insights: insightsData.response,
        suggestedQueries
      });
      
      // Add to recent queries if not already there
      if (!recentQueries.includes(query)) {
        setRecentQueries(prev => [query, ...prev.slice(0, 4)]);
      }
      
    } catch (error) {
      console.error("Error generating visualization:", error);
      toast({
        title: "Visualization Failed",
        description: "There was an error generating your visualization. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleQueryClick = (selectedQuery: string) => {
    setQuery(selectedQuery);
  };
  
  const askAssistant = (assistantQuery: string) => {
    openAssistantWithQuery(assistantQuery);
  };
  
  const downloadImage = () => {
    if (!currentVisualization?.visualizationData) return;
    
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${currentVisualization.visualizationData}`;
    link.download = `gov-data-${visualizationType}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your visualization is being downloaded.",
    });
  };
  
  return (
    <PageLayout title="User Queries with AI">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Builder Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <i className="ri-ai-generate text-xl text-primary"></i>
              Query Builder
            </CardTitle>
            <CardDescription>
              Ask questions about government efficiency data and get AI-generated visualizations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="query" className="text-sm font-medium">
                What would you like to visualize?
              </label>
              <Textarea 
                id="query"
                placeholder="E.g. 'Budget allocation across departments' or 'Waste reduction trends'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="resize-none h-24"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="visualization-type" className="text-sm font-medium">
                Visualization Type
              </label>
              <Select 
                value={visualizationType} 
                onValueChange={setVisualizationType}
              >
                <SelectTrigger id="visualization-type">
                  <SelectValue placeholder="Select a chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="heatmap">Heat Map</SelectItem>
                  <SelectItem value="treemap">Tree Map</SelectItem>
                  <SelectItem value="sankey">Sankey Diagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button 
                className="w-full" 
                onClick={handleGenerateVisualization}
                disabled={isGenerating || !query.trim()}
              >
                {isGenerating ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Generating...
                  </>
                ) : (
                  <>
                    <i className="ri-bar-chart-grouped-line mr-2"></i>
                    Generate Visualization
                  </>
                )}
              </Button>
            </div>
            
            {recentQueries.length > 0 && (
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Recent Queries</h3>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((recentQuery, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => handleQueryClick(recentQuery)}
                    >
                      {recentQuery.length > 25 
                        ? `${recentQuery.substring(0, 25)}...` 
                        : recentQuery}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Visualization Results Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="visualize">Visualization</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="min-h-[400px] flex flex-col items-center justify-center">
            <TabsContent value="visualize" className="w-full mt-0">
              {currentVisualization ? (
                <div className="flex flex-col items-center">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg w-full overflow-hidden">
                    <img 
                      ref={imageRef}
                      src={`data:image/png;base64,${currentVisualization.visualizationData}`}
                      alt="AI Generated Visualization" 
                      className="max-w-full h-auto mx-auto shadow-md rounded-md"
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={downloadImage}>
                      <i className="ri-download-line mr-2"></i>
                      Download
                    </Button>
                    <Button variant="outline" onClick={() => askAssistant(`Explain this visualization about "${query}"`)}>
                      <i className="ri-question-line mr-2"></i>
                      Ask AI About This
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg w-full">
                  <i className="ri-bar-chart-2-line text-5xl text-gray-300 dark:text-gray-700 mb-2"></i>
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No Visualization Yet</h3>
                  <p className="text-gray-400 dark:text-gray-500 mt-1">Enter a query and generate a visualization to see results here</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="insights" className="w-full mt-0">
              {currentVisualization ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {currentVisualization.insights}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Suggested Follow-up Queries</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentVisualization.suggestedQueries.map((suggestedQuery, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => handleQueryClick(suggestedQuery)}
                        >
                          {suggestedQuery}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={() => askAssistant(`Give me more detailed analysis about ${query}`)}>
                      <i className="ri-chat-3-line mr-2"></i>
                      Discuss with AI Assistant
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
                  <i className="ri-robot-line text-5xl text-gray-300 dark:text-gray-700 mb-2"></i>
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No Insights Yet</h3>
                  <p className="text-gray-400 dark:text-gray-500 mt-1">Generate a visualization first to see AI insights</p>
                </div>
              )}
            </TabsContent>
          </CardContent>
          
          {currentVisualization && (
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-primary">Tip:</span> For more specific analysis, try asking the AI Assistant directly
              </div>
              <Button variant="ghost" size="sm" onClick={() => setCurrentVisualization(null)}>
                <i className="ri-refresh-line mr-2"></i>
                Reset
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Examples Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Example Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Budget Distribution",
              query: "Compare budget allocation across departments for fiscal year 2025",
              vizType: "pie",
              icon: "ri-pie-chart-line"
            },
            {
              title: "Spending Trends",
              query: "Monthly spending trends for the Department of Defense in 2025",
              vizType: "line",
              icon: "ri-line-chart-line"
            },
            {
              title: "Efficiency Metrics",
              query: "Efficiency comparison between departments based on project completion rates",
              vizType: "bar",
              icon: "ri-bar-chart-line"
            },
            {
              title: "Waste Analysis",
              query: "Breakdown of identified waste by category across all departments",
              vizType: "treemap",
              icon: "ri-bubble-chart-line"
            },
            {
              title: "Project Completion",
              query: "Project completion status by quarter for all departments",
              vizType: "area",
              icon: "ri-stack-line"
            },
            {
              title: "Budget vs. Actual",
              query: "Compare budgeted amount vs actual spending for each department",
              vizType: "bar",
              icon: "ri-funds-line"
            }
          ].map((example, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
              setQuery(example.query);
              setVisualizationType(example.vizType);
            }}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <i className={`${example.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-medium">{example.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{example.query}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}