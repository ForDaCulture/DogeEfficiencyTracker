import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAIAssistant } from "@/components/ai-assistant";

export default function Reports() {
  const { openAssistantWithQuery } = useAIAssistant();

  const handleGenerateReport = () => {
    openAssistantWithQuery(
      "I'd like to generate a new report. Can you help me understand what type of government efficiency reports I can create and guide me through the process?"
    );
  };

  const reports = [
    {
      id: 1,
      title: "Annual Budget Analysis",
      description: "Comprehensive analysis of annual budgets across all departments",
      date: "2025-02-15",
      type: "Financial",
      author: "Budget Office"
    },
    {
      id: 2,
      title: "Quarterly Performance Review",
      description: "Evaluation of department performance metrics for Q1 2025",
      date: "2025-04-05",
      type: "Performance",
      author: "Analytics Team"
    },
    {
      id: 3,
      title: "Waste Reduction Opportunities",
      description: "Identification of potential areas for cost savings and efficiency improvements",
      date: "2025-03-20",
      type: "Optimization",
      author: "Efficiency Division"
    },
    {
      id: 4,
      title: "Program Effectiveness Study",
      description: "Assessment of program outcomes relative to allocated resources",
      date: "2025-01-30",
      type: "Evaluation",
      author: "Research Department"
    },
    {
      id: 5,
      title: "Inter-Department Coordination Report",
      description: "Analysis of cross-department project coordination and resource sharing",
      date: "2025-03-10",
      type: "Operational",
      author: "Management Office"
    }
  ];

  return (
    <PageLayout title="Reports">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Access detailed reports and analysis on government efficiency, spending patterns, and optimization opportunities.
            </p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleGenerateReport}>
            <i className="ri-file-add-line"></i>
            <span>Generate New Report</span>
          </Button>
        </div>

        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{report.title}</h3>
                  <p className="text-gray-600 mt-1">{report.description}</p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-calendar-line mr-1"></i>
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-file-list-line mr-1"></i>
                      <span>{report.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-user-line mr-1"></i>
                      <span>{report.author}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Button variant="outline" size="sm" className="h-9 px-3">
                    <i className="ri-download-line mr-1"></i>
                    Download
                  </Button>
                  <Button size="sm" className="h-9 px-3">
                    <i className="ri-eye-line mr-1"></i>
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}