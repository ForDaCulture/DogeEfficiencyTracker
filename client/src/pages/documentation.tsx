import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

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
                </ul>
              </CardContent>
            </Card>
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