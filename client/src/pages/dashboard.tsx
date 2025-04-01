import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/page-layout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { BudgetChart } from "@/components/dashboard/budget-chart";
import { EfficiencyChart } from "@/components/dashboard/efficiency-chart";
import { CompletionChart } from "@/components/dashboard/completion-chart";
import { DepartmentTable } from "@/components/dashboard/department-table";
import { TopPerforming } from "@/components/dashboard/top-performing";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { PageHeader } from "@/components/dashboard/page-header";
import { DateRangeType } from "@shared/schema";
import { 
  getSummaryMetrics,
  getDepartments,
  getBudgetAllocation,
  getEfficiencyTrend,
  getProjectCompletion,
  getTopPerformingDepartments
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [metricType, setMetricType] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeType>("30d");

  // Queries for fetching data
  const summaryQuery = useQuery({
    queryKey: ['/api/metrics/summary', dateRange],
    queryFn: () => getSummaryMetrics(dateRange)
  });

  const departmentsQuery = useQuery({
    queryKey: ['/api/departments', dateRange, department, search],
    queryFn: () => getDepartments({ 
      dateRange, 
      department, 
      search 
    })
  });

  const budgetChartQuery = useQuery({
    queryKey: ['/api/charts/budget-allocation', dateRange],
    queryFn: () => getBudgetAllocation(dateRange)
  });

  const efficiencyChartQuery = useQuery({
    queryKey: ['/api/charts/efficiency-trend', dateRange],
    queryFn: () => getEfficiencyTrend(dateRange)
  });

  const completionChartQuery = useQuery({
    queryKey: ['/api/charts/project-completion', dateRange],
    queryFn: () => getProjectCompletion(dateRange)
  });

  const topPerformingQuery = useQuery({
    queryKey: ['/api/departments/top-performing', dateRange],
    queryFn: () => getTopPerformingDepartments(dateRange, 5)
  });

  // Handle errors
  useEffect(() => {
    const queries = [
      { name: "Summary metrics", state: summaryQuery },
      { name: "Departments data", state: departmentsQuery },
      { name: "Budget chart", state: budgetChartQuery },
      { name: "Efficiency chart", state: efficiencyChartQuery },
      { name: "Completion chart", state: completionChartQuery },
      { name: "Top performing", state: topPerformingQuery }
    ];

    queries.forEach(({ name, state }) => {
      if (state.isError) {
        toast({
          title: `Error loading ${name}`,
          description: state.error instanceof Error ? state.error.message : "An unknown error occurred",
          variant: "destructive"
        });
      }
    });
  }, [
    summaryQuery.isError, departmentsQuery.isError, 
    budgetChartQuery.isError, efficiencyChartQuery.isError,
    completionChartQuery.isError, topPerformingQuery.isError,
    toast
  ]);

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
  };

  const handleMetricTypeChange = (value: string) => {
    setMetricType(value);
  };

  const handleDateRangeChange = (value: DateRangeType) => {
    setDateRange(value);
  };

  const handleMoreFilters = () => {
    toast({
      title: "More filters",
      description: "Additional filter options would be displayed here",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Exporting dashboard data as CSV",
    });
  };

  // Prepare summary metrics for the cards
  const metricCardData = [
    {
      title: "Total Savings",
      value: "$147.3M",
      change: 12.3,
      description: "vs. previous period",
      icon: <i className="ri-money-dollar-circle-line"></i>,
      iconBgClass: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
      title: "Budget Utilization",
      value: "89.4%",
      change: 3.7,
      description: "of allocated budget used effectively",
      icon: <i className="ri-pie-chart-line"></i>,
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Project Completion",
      value: "76.2%",
      change: -2.1,
      description: "projects completed on schedule",
      icon: <i className="ri-task-line"></i>,
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
    },
    {
      title: "Efficiency Score",
      value: "83/100",
      change: 5,
      description: "overall efficiency rating",
      icon: <i className="ri-speed-line"></i>,
      iconBgClass: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <PageLayout>
      <div>
        <PageHeader
          title="Government Efficiency Overview"
          subtitle="Real-time metrics from the Department of Government Efficiency"
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
        />
        
        <Card className="mb-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <FilterBar
              search={search}
              onSearchChange={handleSearchChange}
              department={department}
              onDepartmentChange={handleDepartmentChange}
              metricType={metricType}
              onMetricTypeChange={handleMetricTypeChange}
              onMoreFilters={handleMoreFilters}
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {summaryQuery.data ? (
            summaryQuery.data.map((metric, index) => (
              <MetricCard
                key={metric.id}
                title={metric.name}
                value={metric.value}
                change={metric.change}
                description={metric.description}
                icon={<i className={metric.icon}></i>}
                progressValue={Math.abs(metric.change) * 5 > 100 ? 100 : Math.abs(metric.change) * 5}
              />
            ))
          ) : (
            metricCardData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={summaryQuery.isLoading ? "..." : metric.value}
                change={summaryQuery.isLoading ? 0 : metric.change}
                description={metric.description}
                icon={metric.icon}
                iconBgClass={metric.iconBgClass}
                progressValue={summaryQuery.isLoading ? 0 : (Math.abs(metric.change) * 5 > 100 ? 100 : Math.abs(metric.change) * 5)}
              />
            ))
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <BudgetChart 
            data={budgetChartQuery.data || []} 
            isLoading={budgetChartQuery.isLoading} 
          />
          <EfficiencyChart 
            data={efficiencyChartQuery.data || []} 
            isLoading={efficiencyChartQuery.isLoading} 
          />
        </div>
        
        <Card className="mb-6 shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Department Performance
              </h3>
            </div>
            <div className="p-0">
              <DepartmentTable 
                departments={departmentsQuery.data || []}
                isLoading={departmentsQuery.isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <CompletionChart 
            data={completionChartQuery.data || []} 
            isLoading={completionChartQuery.isLoading}
            className="lg:col-span-2"
          />
          <TopPerforming 
            departments={topPerformingQuery.data || []}
            isLoading={topPerformingQuery.isLoading}
          />
        </div>
      </div>
    </PageLayout>
  );
}
