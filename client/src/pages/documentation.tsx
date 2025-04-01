import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocumentation, setGeneratedDocumentation] = useState<any>(null);
  const { toast } = useToast();
  
  // Form state for document generation
  const [docRequest, setDocRequest] = useState({
    topic: "",
    department: "",
    format: "markdown",
    includeCharts: true,
    year: "2025"
  });

  // Handle form field changes
  const handleInputChange = (field: string, value: any) => {
    setDocRequest({
      ...docRequest,
      [field]: value
    });
  };

  // Handle document generation request
  const generateDocument = async () => {
    if (!docRequest.topic) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your documentation",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsGenerating(true);
      
      const response = await axios.post('/api/documentation/generate', docRequest);
      
      setGeneratedDocumentation(response.data);
      
      toast({
        title: "Documentation Generated",
        description: "Your custom documentation has been created successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your documentation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sections = [
    {
      title: "Dashboard",
      slug: "dashboard",
      description: "Overview and introduction to the DOGE dashboard",
      pages: [
        { title: "Getting Started", slug: "getting-started" },
        { title: "Dashboard Overview", slug: "dashboard-overview" },
        { title: "Navigation Guide", slug: "navigation-guide" },
        { title: "Key Metrics Explained", slug: "key-metrics" }
      ]
    },
    {
      title: "Data Analysis",
      slug: "data-analysis",
      description: "Guides for analyzing and interpreting dashboard data",
      pages: [
        { title: "Performance Analysis", slug: "performance-analysis" },
        { title: "Budget Analysis", slug: "budget-analysis" },
        { title: "Spending Analysis", slug: "spending-analysis" },
        { title: "Waste Analysis", slug: "waste-analysis" },
        { title: "Department Comparison", slug: "department-comparison" }
      ]
    },
    {
      title: "Reports",
      slug: "reports",
      description: "Documentation on report generation and customization",
      pages: [
        { title: "Standard Reports", slug: "standard-reports" },
        { title: "Custom Report Builder", slug: "custom-reports" },
        { title: "Scheduling Reports", slug: "scheduling-reports" },
        { title: "Report Sharing", slug: "report-sharing" }
      ]
    },
    {
      title: "API Documentation",
      slug: "api",
      description: "Technical documentation for the DOGE API",
      pages: [
        { title: "API Overview", slug: "api-overview" },
        { title: "Authentication", slug: "authentication" },
        { title: "Endpoints Reference", slug: "endpoints" },
        { title: "Rate Limits", slug: "rate-limits" },
        { title: "Example Requests", slug: "example-requests" }
      ]
    },
    {
      title: "Admin Guide",
      slug: "admin",
      description: "Documentation for system administrators",
      pages: [
        { title: "User Management", slug: "user-management" },
        { title: "Access Controls", slug: "access-controls" },
        { title: "System Configuration", slug: "system-configuration" },
        { title: "Data Integration", slug: "data-integration" }
      ]
    }
  ];

  // Sample content for the currently viewed documentation page
  const documentationContent = {
    title: "Waste Analysis Documentation",
    lastUpdated: "March 15, 2025",
    content: `
      <h2 class="text-xl font-semibold my-4">Introduction to Waste Analysis</h2>
      <p class="my-3">
        The DOGE Waste Analysis module provides comprehensive tools to identify, measure, and address inefficiencies in government spending and operations. This documentation covers the core concepts, metrics, and usage guidelines for the waste analysis features.
      </p>
      
      <h2 class="text-xl font-semibold my-4">Key Features</h2>
      <ul class="list-disc pl-6 my-3 space-y-2">
        <li>Breakdown of waste by department, category, and program</li>
        <li>Historical waste trend analysis</li>
        <li>Root cause identification</li>
        <li>Intervention recommendations with ROI calculations</li>
        <li>Waste visualization tools</li>
      </ul>
      
      <h2 class="text-xl font-semibold my-4">Waste Classification</h2>
      <p class="my-3">
        The system categorizes waste into the following main categories:
      </p>
      
      <div class="my-4 border rounded-md overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Waste Category</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="px-4 py-2 font-medium">Duplicate Services</td>
              <td class="px-4 py-2">Overlapping programs or services that perform similar functions</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Administrative Overhead</td>
              <td class="px-4 py-2">Excessive administrative costs that don't contribute to program outcomes</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Outdated Systems</td>
              <td class="px-4 py-2">Legacy systems requiring excessive maintenance or causing inefficiencies</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Inefficient Processes</td>
              <td class="px-4 py-2">Workflows and procedures that require unnecessary steps or resources</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Improper Payments</td>
              <td class="px-4 py-2">Incorrect, fraudulent, or improper disbursements of funds</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 class="text-xl font-semibold my-4">Waste Calculation Methodology</h2>
      <p class="my-3">
        Waste is calculated using a combination of methodologies:
      </p>
      <ol class="list-decimal pl-6 my-3 space-y-2">
        <li>Direct comparison of actual spending against optimal benchmarks</li>
        <li>Time-and-motion studies of operational processes</li>
        <li>Statistical analysis of spending patterns to identify anomalies</li>
        <li>Program overlap analysis to identify duplication</li>
        <li>Outcome-based assessment comparing results to resources expended</li>
      </ol>
      
      <h2 class="text-xl font-semibold my-4">Intervention Evaluation</h2>
      <p class="my-3">
        For each identified waste category, the system recommends potential interventions with the following metrics:
      </p>
      <ul class="list-disc pl-6 my-3 space-y-2">
        <li><strong>Potential Savings:</strong> Estimated annual reduction in waste</li>
        <li><strong>Implementation Cost:</strong> One-time and ongoing costs to implement the change</li>
        <li><strong>Timeframe:</strong> Estimated time to implement and realize benefits</li>
        <li><strong>Complexity:</strong> Organizational difficulty in implementing the change</li>
        <li><strong>ROI:</strong> Return on investment ratio considering savings and costs</li>
      </ul>
    `
  };

  // Documentation navigation with nested sections
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive guides and reference materials for the DOGE Dashboard
            </p>
          </div>
          <div className="w-full md:w-80">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <Input
                placeholder="Search documentation..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Documentation Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0 space-y-6">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.slug} className="space-y-2">
                      <h3 className="font-medium text-sm uppercase tracking-wide text-gray-500">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.pages.map((page) => (
                          <li key={page.slug}>
                            <a
                              href={`#${section.slug}-${page.slug}`}
                              className="block px-2 py-1 text-sm rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                            >
                              {page.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Documentation Downloads</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <i className="ri-file-pdf-line mr-2"></i>
                      <span>Full Documentation PDF</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <i className="ri-file-excel-line mr-2"></i>
                      <span>Metrics Reference Sheet</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <i className="ri-file-word-line mr-2"></i>
                      <span>User Guide</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <i className="ri-file-chart-line mr-2"></i>
                      <span>API Reference</span>
                    </a>
                  </li>
                  <li className="pt-2 mt-2 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start text-sm text-blue-600 hover:text-blue-800">
                          <i className="ri-file-text-line mr-2"></i>
                          <span>Generate Custom Documentation</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Generate Custom Documentation</DialogTitle>
                          <DialogDescription>
                            The Bald Eagle will help create tailored documentation based on your specific needs
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="topic">Documentation Topic</Label>
                            <Textarea 
                              id="topic" 
                              placeholder="Enter the topic or question you need documentation for..."
                              value={docRequest.topic}
                              onChange={(e) => handleInputChange('topic', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="department">Department (Optional)</Label>
                              <Select 
                                value={docRequest.department} 
                                onValueChange={(value) => handleInputChange('department', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="">All Departments</SelectItem>
                                  <SelectItem value="treasury">Treasury</SelectItem>
                                  <SelectItem value="defense">Defense</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="transportation">Transportation</SelectItem>
                                  <SelectItem value="health">Health & Human Services</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="format">Format</Label>
                              <Select 
                                value={docRequest.format}
                                onValueChange={(value) => handleInputChange('format', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="markdown">Markdown</SelectItem>
                                  <SelectItem value="pdf">PDF</SelectItem>
                                  <SelectItem value="text">Plain Text</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="includeCharts" 
                                checked={docRequest.includeCharts}
                                onCheckedChange={(checked) => handleInputChange('includeCharts', checked)}
                              />
                              <Label htmlFor="includeCharts">Include charts and visualizations</Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            onClick={generateDocument} 
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <>
                                <i className="ri-loader-2-line animate.spin mr-2" />
                                Generating...
                              </>
                            ) : (
                              'Generate Documentation'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Show generated documentation if available */}
            {generatedDocumentation && (
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Generated Documentation</CardTitle>
                  <CardDescription>
                    AI-generated content for your requested topic
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="prose max-w-none border rounded-md p-4 bg-gray-50">
                    {generatedDocumentation.content ? (
                      <div dangerouslySetInnerHTML={{ __html: generatedDocumentation.content }} />
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        Documentation content will appear here when generated
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="gap-1">
                      <i className="ri-download-line" />
                      <span>Download</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Documentation Content Area */}
          <div className="flex-1">
            <Card>
              <CardHeader className="pb-2 border-b">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <CardTitle>{documentationContent.title}</CardTitle>
                  <div className="text-sm text-gray-500">
                    Last updated: {documentationContent.lastUpdated}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: documentationContent.content }}
                />

                <div className="mt-8 border-t pt-6 flex justify-between items-center">
                  <Button variant="outline" className="flex items-center gap-1">
                    <i className="ri-arrow-left-line"></i>
                    <span>Previous: Budget Analysis</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <span>Next: Department Comparison</span>
                    <i className="ri-arrow-right-line"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="#" className="p-4 border rounded-lg hover:bg-gray-50">
                      <h3 className="font-medium mb-2">Performance Analysis</h3>
                      <p className="text-sm text-gray-600">Learn how performance metrics connect to waste identification.</p>
                    </a>
                    <a href="#" className="p-4 border rounded-lg hover:bg-gray-50">
                      <h3 className="font-medium mb-2">Intervention Planning</h3>
                      <p className="text-sm text-gray-600">Guide to implementing waste reduction interventions.</p>
                    </a>
                    <a href="#" className="p-4 border rounded-lg hover:bg-gray-50">
                      <h3 className="font-medium mb-2">ROI Calculation</h3>
                      <p className="text-sm text-gray-600">Understanding how return on investment is calculated for interventions.</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Feedback</CardTitle>
                  <CardDescription>
                    Help us improve our documentation by providing feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Was this documentation helpful?</label>
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="gap-1">
                          <i className="ri-thumb-up-line"></i>
                          <span>Yes</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <i className="ri-thumb-down-line"></i>
                          <span>No</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="feedback" className="text-sm font-medium">Comments or suggestions</label>
                      <textarea 
                        id="feedback" 
                        rows={3} 
                        className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Share your thoughts on how we can improve this documentation"
                      ></textarea>
                    </div>
                    
                    <Button className="gap-1">
                      <i className="ri-send-plane-line"></i>
                      <span>Submit Feedback</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}