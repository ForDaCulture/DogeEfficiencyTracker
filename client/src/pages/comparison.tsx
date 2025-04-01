import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from "recharts";

export default function Comparison() {
  const [department1, setDepartment1] = useState("treasury");
  const [department2, setDepartment2] = useState("defense");
  const [compareBy, setCompareBy] = useState("efficiency");
  const [timeframe, setTimeframe] = useState("1y");

  // Department data for comparison
  const departmentData = {
    treasury: {
      name: "Treasury",
      budget: 340.5,
      spending: 298.2,
      efficiency: 93,
      completedProjects: 12,
      totalProjects: 15,
      status: "on-track",
      headcount: 1250,
      metrics: {
        operationalEfficiency: 87,
        budgetUtilization: 92,
        programEffectiveness: 83,
        serviceDelivery: 88,
        innovation: 72
      },
      monthlyEfficiency: [
        { month: "Jan", value: 89 },
        { month: "Feb", value: 90 },
        { month: "Mar", value: 91 },
        { month: "Apr", value: 92 },
        { month: "May", value: 93 },
        { month: "Jun", value: 93 },
        { month: "Jul", value: 94 },
        { month: "Aug", value: 94 },
        { month: "Sep", value: 95 },
        { month: "Oct", value: 94 },
        { month: "Nov", value: 94 },
        { month: "Dec", value: 93 }
      ],
      spending: {
        personnel: 120.5,
        operations: 80.2,
        infrastructure: 45.8,
        research: 35.5,
        grants: 25.6,
        technology: 22.3,
        administration: 10.6
      }
    },
    defense: {
      name: "Defense",
      budget: 850.2,
      spending: 872.1,
      efficiency: 81,
      completedProjects: 18,
      totalProjects: 25,
      status: "needs-attention",
      headcount: 2850,
      metrics: {
        operationalEfficiency: 72,
        budgetUtilization: 85,
        programEffectiveness: 75,
        serviceDelivery: 80,
        innovation: 70
      },
      monthlyEfficiency: [
        { month: "Jan", value: 76 },
        { month: "Feb", value: 77 },
        { month: "Mar", value: 78 },
        { month: "Apr", value: 79 },
        { month: "May", value: 80 },
        { month: "Jun", value: 81 },
        { month: "Jul", value: 82 },
        { month: "Aug", value: 83 },
        { month: "Sep", value: 83 },
        { month: "Oct", value: 82 },
        { month: "Nov", value: 82 },
        { month: "Dec", value: 81 }
      ],
      spending: {
        personnel: 320.6,
        operations: 230.5,
        infrastructure: 150.4,
        research: 60.2,
        grants: 30.8,
        technology: 48.5,
        administration: 9.2
      }
    },
    education: {
      name: "Education",
      budget: 215.4,
      spending: 198.9,
      efficiency: 88,
      completedProjects: 9,
      totalProjects: 12,
      status: "on-track",
      headcount: 950,
      metrics: {
        operationalEfficiency: 85,
        budgetUtilization: 88,
        programEffectiveness: 86,
        serviceDelivery: 84,
        innovation: 82
      },
      monthlyEfficiency: [
        { month: "Jan", value: 82 },
        { month: "Feb", value: 83 },
        { month: "Mar", value: 84 },
        { month: "Apr", value: 85 },
        { month: "May", value: 86 },
        { month: "Jun", value: 87 },
        { month: "Jul", value: 88 },
        { month: "Aug", value: 88 },
        { month: "Sep", value: 89 },
        { month: "Oct", value: 88 },
        { month: "Nov", value: 88 },
        { month: "Dec", value: 87 }
      ],
      spending: {
        personnel: 75.3,
        operations: 25.8,
        infrastructure: 15.4,
        research: 40.2,
        grants: 50.5,
        technology: 5.8,
        administration: 2.4
      }
    },
    transportation: {
      name: "Transportation",
      budget: 185.7,
      spending: 212.3,
      efficiency: 75,
      completedProjects: 7,
      totalProjects: 14,
      status: "at-risk",
      headcount: 780,
      metrics: {
        operationalEfficiency: 74,
        budgetUtilization: 78,
        programEffectiveness: 72,
        serviceDelivery: 76,
        innovation: 68
      },
      monthlyEfficiency: [
        { month: "Jan", value: 70 },
        { month: "Feb", value: 71 },
        { month: "Mar", value: 72 },
        { month: "Apr", value: 73 },
        { month: "May", value: 74 },
        { month: "Jun", value: 75 },
        { month: "Jul", value: 75 },
        { month: "Aug", value: 76 },
        { month: "Sep", value: 76 },
        { month: "Oct", value: 75 },
        { month: "Nov", value: 75 },
        { month: "Dec", value: 74 }
      ],
      spending: {
        personnel: 65.2,
        operations: 55.8,
        infrastructure: 70.4,
        research: 12.2,
        grants: 5.5,
        technology: 7.8,
        administration: 4.3
      }
    },
    health: {
      name: "Health & Human Services",
      budget: 425.8,
      spending: 410.2,
      efficiency: 89,
      completedProjects: 15,
      totalProjects: 18,
      status: "on-track",
      headcount: 1850,
      metrics: {
        operationalEfficiency: 82,
        budgetUtilization: 90,
        programEffectiveness: 87,
        serviceDelivery: 85,
        innovation: 73
      },
      monthlyEfficiency: [
        { month: "Jan", value: 84 },
        { month: "Feb", value: 85 },
        { month: "Mar", value: 86 },
        { month: "Apr", value: 87 },
        { month: "May", value: 88 },
        { month: "Jun", value: 89 },
        { month: "Jul", value: 89 },
        { month: "Aug", value: 90 },
        { month: "Sep", value: 90 },
        { month: "Oct", value: 89 },
        { month: "Nov", value: 89 },
        { month: "Dec", value: 88 }
      ],
      spending: {
        personnel: 160.4,
        operations: 95.6,
        infrastructure: 40.2,
        research: 80.5,
        grants: 35.3,
        technology: 9.5,
        administration: 4.3
      }
    },
    energy: {
      name: "Energy",
      budget: 120.3,
      spending: 115.8,
      efficiency: 84,
      completedProjects: 6,
      totalProjects: 9,
      status: "on-track",
      headcount: 620,
      metrics: {
        operationalEfficiency: 80,
        budgetUtilization: 86,
        programEffectiveness: 82,
        serviceDelivery: 78,
        innovation: 85
      },
      monthlyEfficiency: [
        { month: "Jan", value: 79 },
        { month: "Feb", value: 80 },
        { month: "Mar", value: 81 },
        { month: "Apr", value: 82 },
        { month: "May", value: 83 },
        { month: "Jun", value: 84 },
        { month: "Jul", value: 84 },
        { month: "Aug", value: 85 },
        { month: "Sep", value: 85 },
        { month: "Oct", value: 84 },
        { month: "Nov", value: 84 },
        { month: "Dec", value: 83 }
      ],
      spending: {
        personnel: 45.8,
        operations: 22.3,
        infrastructure: 18.6,
        research: 25.4,
        grants: 10.2,
        technology: 8.4,
        administration: 3.2
      }
    },
    veterans: {
      name: "Veterans Affairs",
      budget: 180.6,
      spending: 195.2,
      efficiency: 78,
      completedProjects: 8,
      totalProjects: 12,
      status: "needs-attention",
      headcount: 890,
      metrics: {
        operationalEfficiency: 75,
        budgetUtilization: 82,
        programEffectiveness: 76,
        serviceDelivery: 80,
        innovation: 64
      },
      monthlyEfficiency: [
        { month: "Jan", value: 73 },
        { month: "Feb", value: 74 },
        { month: "Mar", value: 75 },
        { month: "Apr", value: 76 },
        { month: "May", value: 77 },
        { month: "Jun", value: 78 },
        { month: "Jul", value: 78 },
        { month: "Aug", value: 79 },
        { month: "Sep", value: 79 },
        { month: "Oct", value: 78 },
        { month: "Nov", value: 78 },
        { month: "Dec", value: 77 }
      ],
      spending: {
        personnel: 80.5,
        operations: 40.3,
        infrastructure: 25.7,
        research: 18.5,
        grants: 22.4,
        technology: 10.6,
        administration: 6.3
      }
    }
  };

  const dept1 = departmentData[department1 as keyof typeof departmentData];
  const dept2 = departmentData[department2 as keyof typeof departmentData];

  // Transform department metrics for radar chart
  const radarData = [
    { subject: "Operational Efficiency", [dept1.name]: dept1.metrics.operationalEfficiency, [dept2.name]: dept2.metrics.operationalEfficiency, fullMark: 100 },
    { subject: "Budget Utilization", [dept1.name]: dept1.metrics.budgetUtilization, [dept2.name]: dept2.metrics.budgetUtilization, fullMark: 100 },
    { subject: "Program Effectiveness", [dept1.name]: dept1.metrics.programEffectiveness, [dept2.name]: dept2.metrics.programEffectiveness, fullMark: 100 },
    { subject: "Service Delivery", [dept1.name]: dept1.metrics.serviceDelivery, [dept2.name]: dept2.metrics.serviceDelivery, fullMark: 100 },
    { subject: "Innovation", [dept1.name]: dept1.metrics.innovation, [dept2.name]: dept2.metrics.innovation, fullMark: 100 }
  ];

  // Prepare monthly efficiency data for line chart
  const monthlyEfficiencyData = dept1.monthlyEfficiency.map((item, index) => ({
    month: item.month,
    [dept1.name]: item.value,
    [dept2.name]: dept2.monthlyEfficiency[index].value
  }));

  // Prepare budget vs spending data
  const budgetSpendingData = [
    { name: dept1.name, budget: dept1.budget, spending: dept1.spending },
    { name: dept2.name, budget: dept2.budget, spending: dept2.spending }
  ];

  // Prepare project completion data
  const projectCompletionData = [
    { name: dept1.name, completed: dept1.completedProjects, total: dept1.totalProjects },
    { name: dept2.name, completed: dept2.completedProjects, total: dept2.totalProjects }
  ];

  // Prepare spending category comparison
  const spendingCategoryData = [
    { 
      category: "Personnel", 
      [dept1.name]: dept1.spending.personnel, 
      [dept2.name]: dept2.spending.personnel,
      [`${dept1.name} %`]: (dept1.spending.personnel / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.personnel / dept2.spending) * 100
    },
    { 
      category: "Operations", 
      [dept1.name]: dept1.spending.operations, 
      [dept2.name]: dept2.spending.operations,
      [`${dept1.name} %`]: (dept1.spending.operations / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.operations / dept2.spending) * 100
    },
    { 
      category: "Infrastructure", 
      [dept1.name]: dept1.spending.infrastructure, 
      [dept2.name]: dept2.spending.infrastructure,
      [`${dept1.name} %`]: (dept1.spending.infrastructure / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.infrastructure / dept2.spending) * 100
    },
    { 
      category: "Research", 
      [dept1.name]: dept1.spending.research, 
      [dept2.name]: dept2.spending.research,
      [`${dept1.name} %`]: (dept1.spending.research / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.research / dept2.spending) * 100
    },
    { 
      category: "Grants", 
      [dept1.name]: dept1.spending.grants, 
      [dept2.name]: dept2.spending.grants,
      [`${dept1.name} %`]: (dept1.spending.grants / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.grants / dept2.spending) * 100
    },
    { 
      category: "Technology", 
      [dept1.name]: dept1.spending.technology, 
      [dept2.name]: dept2.spending.technology,
      [`${dept1.name} %`]: (dept1.spending.technology / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.technology / dept2.spending) * 100
    },
    { 
      category: "Administration", 
      [dept1.name]: dept1.spending.administration, 
      [dept2.name]: dept2.spending.administration,
      [`${dept1.name} %`]: (dept1.spending.administration / dept1.spending) * 100,
      [`${dept2.name} %`]: (dept2.spending.administration / dept2.spending) * 100
    }
  ];

  // Calculate per-employee metrics
  const perEmployeeMetrics = [
    { 
      metric: "Budget per Employee", 
      [dept1.name]: (dept1.budget / dept1.headcount).toFixed(3), 
      [dept2.name]: (dept2.budget / dept2.headcount).toFixed(3),
      unit: "$ million"
    },
    { 
      metric: "Spending per Employee", 
      [dept1.name]: (dept1.spending / dept1.headcount).toFixed(3), 
      [dept2.name]: (dept2.spending / dept2.headcount).toFixed(3),
      unit: "$ million"
    },
    { 
      metric: "Projects per 100 Employees", 
      [dept1.name]: ((dept1.totalProjects / dept1.headcount) * 100).toFixed(2), 
      [dept2.name]: ((dept2.totalProjects / dept2.headcount) * 100).toFixed(2),
      unit: "projects"
    },
    { 
      metric: "Completion Rate", 
      [dept1.name]: ((dept1.completedProjects / dept1.totalProjects) * 100).toFixed(1), 
      [dept2.name]: ((dept2.completedProjects / dept2.totalProjects) * 100).toFixed(1),
      unit: "%"
    }
  ];

  const formatDollar = (value: number) => `$${value}M`;

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Department Comparison</h1>
            <p className="text-sm text-gray-600 mt-1">
              Side-by-side analysis of department performance, efficiency, and spending patterns
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <Select value={department1} onValueChange={setDepartment1}>
                <SelectTrigger>
                  <SelectValue placeholder="Department 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treasury">Treasury</SelectItem>
                  <SelectItem value="defense">Defense</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="health">Health & Human Services</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="veterans">Veterans Affairs</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={department2} onValueChange={setDepartment2}>
                <SelectTrigger>
                  <SelectValue placeholder="Department 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treasury">Treasury</SelectItem>
                  <SelectItem value="defense">Defense</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="health">Health & Human Services</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="veterans">Veterans Affairs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="2y">2 Years</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="flex items-center gap-2">
              <i className="ri-download-line"></i>
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800">{dept1.name} Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Efficiency Score</div>
                  <div className="text-2xl font-bold">{dept1.efficiency}/100</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="text-2xl font-bold">${dept1.budget}M</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-lg font-medium capitalize">{dept1.status.replace('-', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Projects</div>
                  <div className="text-lg font-medium">{dept1.completedProjects}/{dept1.totalProjects} Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800">{dept2.name} Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Efficiency Score</div>
                  <div className="text-2xl font-bold">{dept2.efficiency}/100</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="text-2xl font-bold">${dept2.budget}M</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-lg font-medium capitalize">{dept2.status.replace('-', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Projects</div>
                  <div className="text-lg font-medium">{dept2.completedProjects}/{dept2.totalProjects} Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name={dept1.name} dataKey={dept1.name} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                    <Radar name={dept2.name} dataKey={dept2.name} stroke="#EF4444" fill="#EF4444" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs. Spending</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={budgetSpendingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatDollar} />
                      <Tooltip formatter={formatDollar} />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#3B82F6" />
                      <Bar dataKey="spending" name="Spending" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Completion Status</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectCompletionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed Projects" fill="#10B981" />
                      <Bar dataKey="total" name="Total Projects" fill="#94A3B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Comparison Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Metric</th>
                        <th className="text-center font-medium py-3 px-4">{dept1.name}</th>
                        <th className="text-center font-medium py-3 px-4">{dept2.name}</th>
                        <th className="text-right font-medium py-3 px-4">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Efficiency Score</td>
                        <td className="py-3 px-4 text-center">{dept1.efficiency}/100</td>
                        <td className="py-3 px-4 text-center">{dept2.efficiency}/100</td>
                        <td className="py-3 px-4 text-right">
                          <span className={dept1.efficiency - dept2.efficiency >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {dept1.efficiency > dept2.efficiency ? '+' : ''}{dept1.efficiency - dept2.efficiency}
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Budget Utilization</td>
                        <td className="py-3 px-4 text-center">{((dept1.spending / dept1.budget) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-center">{((dept2.spending / dept2.budget) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-right">
                          <span className={((dept1.spending / dept1.budget) - (dept2.spending / dept2.budget)) >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {((dept1.spending / dept1.budget) > (dept2.spending / dept2.budget) ? '+' : '')}
                            {(((dept1.spending / dept1.budget) - (dept2.spending / dept2.budget)) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Project Completion</td>
                        <td className="py-3 px-4 text-center">{((dept1.completedProjects / dept1.totalProjects) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-center">{((dept2.completedProjects / dept2.totalProjects) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-right">
                          <span className={((dept1.completedProjects / dept1.totalProjects) - (dept2.completedProjects / dept2.totalProjects)) >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {((dept1.completedProjects / dept1.totalProjects) > (dept2.completedProjects / dept2.totalProjects) ? '+' : '')}
                            {(((dept1.completedProjects / dept1.totalProjects) - (dept2.completedProjects / dept2.totalProjects)) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Budget Size</td>
                        <td className="py-3 px-4 text-center">${dept1.budget}M</td>
                        <td className="py-3 px-4 text-center">${dept2.budget}M</td>
                        <td className="py-3 px-4 text-right">
                          {dept1.budget > dept2.budget ? '+' : ''}{dept1.budget - dept2.budget}M
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Headcount</td>
                        <td className="py-3 px-4 text-center">{dept1.headcount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">{dept2.headcount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          {dept1.headcount > dept2.headcount ? '+' : ''}{dept1.headcount - dept2.headcount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyEfficiencyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={dept1.name} stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey={dept2.name} stroke="#EF4444" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Comparison by Area</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { 
                          name: "Operational Efficiency", 
                          [dept1.name]: dept1.metrics.operationalEfficiency, 
                          [dept2.name]: dept2.metrics.operationalEfficiency 
                        },
                        { 
                          name: "Budget Utilization", 
                          [dept1.name]: dept1.metrics.budgetUtilization, 
                          [dept2.name]: dept2.metrics.budgetUtilization 
                        },
                        { 
                          name: "Program Effectiveness", 
                          [dept1.name]: dept1.metrics.programEffectiveness, 
                          [dept2.name]: dept2.metrics.programEffectiveness 
                        },
                        { 
                          name: "Service Delivery", 
                          [dept1.name]: dept1.metrics.serviceDelivery, 
                          [dept2.name]: dept2.metrics.serviceDelivery 
                        },
                        { 
                          name: "Innovation", 
                          [dept1.name]: dept1.metrics.innovation, 
                          [dept2.name]: dept2.metrics.innovation 
                        }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={dept1.name} fill="#3B82F6" />
                      <Bar dataKey={dept2.name} fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Difference in Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { 
                          name: "Operational Efficiency", 
                          difference: dept1.metrics.operationalEfficiency - dept2.metrics.operationalEfficiency
                        },
                        { 
                          name: "Budget Utilization", 
                          difference: dept1.metrics.budgetUtilization - dept2.metrics.budgetUtilization
                        },
                        { 
                          name: "Program Effectiveness", 
                          difference: dept1.metrics.programEffectiveness - dept2.metrics.programEffectiveness
                        },
                        { 
                          name: "Service Delivery", 
                          difference: dept1.metrics.serviceDelivery - dept2.metrics.serviceDelivery
                        },
                        { 
                          name: "Innovation", 
                          difference: dept1.metrics.innovation - dept2.metrics.innovation
                        }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[-30, 30]} />
                      <YAxis type="category" dataKey="name" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="difference" 
                        name={`${dept1.name} vs ${dept2.name}`} 
                        fill="#3B82F6"
                        // Color bars based on positive/negative values
                        shape={(props: any) => {
                          const { x, y, width, height, value } = props;
                          return (
                            <rect 
                              x={value >= 0 ? x : x + width} 
                              y={y} 
                              width={Math.abs(width)} 
                              height={height} 
                              fill={value >= 0 ? '#3B82F6' : '#EF4444'} 
                              radius={[2, 2, 0, 0]}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Per-Employee Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Metric</th>
                        <th className="text-center font-medium py-3 px-4">{dept1.name}</th>
                        <th className="text-center font-medium py-3 px-4">{dept2.name}</th>
                        <th className="text-right font-medium py-3 px-4">Difference</th>
                        <th className="text-center font-medium py-3 px-4">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {perEmployeeMetrics.map((metric, index) => {
                        const value1 = parseFloat(metric[dept1.name] as string);
                        const value2 = parseFloat(metric[dept2.name] as string);
                        const difference = value1 - value2;
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{metric.metric}</td>
                            <td className="py-3 px-4 text-center">{metric[dept1.name]}</td>
                            <td className="py-3 px-4 text-center">{metric[dept2.name]}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={difference >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {difference > 0 ? '+' : ''}{difference.toFixed(3)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">{metric.unit}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Performance Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <i className="ri-information-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{dept1.name} Efficiency Strengths</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {dept1.name} Department shows superior performance in {
                              Object.entries(dept1.metrics)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 2)
                                .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
                                .join(' and ')
                            }, suggesting effective management in these areas.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                            <i className="ri-information-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{dept2.name} Efficiency Strengths</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {dept2.name} Department demonstrates notable performance in {
                              Object.entries(dept2.metrics)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 2)
                                .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
                                .join(' and ')
                            } despite overall lower efficiency scores.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="spending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={spendingCategoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={formatDollar} />
                    <YAxis type="category" dataKey="category" width={120} />
                    <Tooltip formatter={(value) => `$${value}M`} />
                    <Legend />
                    <Bar dataKey={dept1.name} name={dept1.name} fill="#3B82F6" />
                    <Bar dataKey={dept2.name} name={dept2.name} fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Mix Comparison (% of Total)</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={spendingCategoryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="category" width={120} />
                      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Legend />
                      <Bar dataKey={`${dept1.name} %`} name={dept1.name} fill="#3B82F6" />
                      <Bar dataKey={`${dept2.name} %`} name={dept2.name} fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs. Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-600">{dept1.name}</span>
                        <span className="text-sm font-medium">
                          ${dept1.spending}M / ${dept1.budget}M
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${dept1.spending > dept1.budget ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min((dept1.spending / dept1.budget) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Budget Utilization: {((dept1.spending / dept1.budget) * 100).toFixed(1)}%</span>
                        <span className={dept1.spending <= dept1.budget ? 'text-green-600' : 'text-red-600'}>
                          {dept1.spending <= dept1.budget ? 'Under Budget' : 'Over Budget'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Top 3 Spending Categories</div>
                      <div className="space-y-2">
                        {Object.entries(dept1.spending)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 3)
                          .map(([category, value], index) => (
                            <div key={index}>
                              <div className="flex justify-between text-xs">
                                <span className="capitalize">{category}</span>
                                <span className="font-mono">${value}M</span>
                              </div>
                              <div className="h-1 mt-1 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${(value / dept1.spending) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-red-600">{dept2.name}</span>
                        <span className="text-sm font-medium">
                          ${dept2.spending}M / ${dept2.budget}M
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${dept2.spending > dept2.budget ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min((dept2.spending / dept2.budget) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Budget Utilization: {((dept2.spending / dept2.budget) * 100).toFixed(1)}%</span>
                        <span className={dept2.spending <= dept2.budget ? 'text-green-600' : 'text-red-600'}>
                          {dept2.spending <= dept2.budget ? 'Under Budget' : 'Over Budget'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Top 3 Spending Categories</div>
                      <div className="space-y-2">
                        {Object.entries(dept2.spending)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 3)
                          .map(([category, value], index) => (
                            <div key={index}>
                              <div className="flex justify-between text-xs">
                                <span className="capitalize">{category}</span>
                                <span className="font-mono">${value}M</span>
                              </div>
                              <div className="h-1 mt-1 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-red-500"
                                  style={{ width: `${(value / dept2.spending) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Spending Efficiency Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{dept1.name} Spending Profile</h3>
                    <dl className="grid grid-cols-1 gap-3">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Total Spending</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${dept1.spending}M</span>
                          <span className={`text-sm font-medium ${dept1.spending <= dept1.budget ? 'text-green-700' : 'text-red-700'}`}>
                            {dept1.spending <= dept1.budget 
                              ? `$${(dept1.budget - dept1.spending).toFixed(1)}M under budget` 
                              : `$${(dept1.spending - dept1.budget).toFixed(1)}M over budget`
                            }
                          </span>
                        </dd>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Spending per Employee</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${(dept1.spending / dept1.headcount * 1000000).toFixed(0)}</span>
                          <span className="text-sm font-medium text-gray-700">per employee</span>
                        </dd>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Spending per Completed Project</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${(dept1.spending / dept1.completedProjects).toFixed(1)}M</span>
                          <span className="text-sm font-medium text-gray-700">per project</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{dept2.name} Spending Profile</h3>
                    <dl className="grid grid-cols-1 gap-3">
                      <div className="bg-red-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Total Spending</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${dept2.spending}M</span>
                          <span className={`text-sm font-medium ${dept2.spending <= dept2.budget ? 'text-green-700' : 'text-red-700'}`}>
                            {dept2.spending <= dept2.budget 
                              ? `$${(dept2.budget - dept2.spending).toFixed(1)}M under budget` 
                              : `$${(dept2.spending - dept2.budget).toFixed(1)}M over budget`
                            }
                          </span>
                        </dd>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Spending per Employee</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${(dept2.spending / dept2.headcount * 1000000).toFixed(0)}</span>
                          <span className="text-sm font-medium text-gray-700">per employee</span>
                        </dd>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-md">
                        <dt className="text-sm font-medium text-gray-700">Spending per Completed Project</dt>
                        <dd className="mt-1 flex justify-between items-baseline">
                          <span className="text-2xl font-semibold">${(dept2.spending / dept2.completedProjects).toFixed(1)}M</span>
                          <span className="text-sm font-medium text-gray-700">per project</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Key Spending Differences</h3>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-700">
                      {dept1.name} spends ${((dept1.spending / dept1.headcount) - (dept2.spending / dept2.headcount)).toFixed(3)}M 
                      {(dept1.spending / dept1.headcount) >= (dept2.spending / dept2.headcount) ? ' more ' : ' less '} 
                      per employee than {dept2.name}, while achieving 
                      {dept1.efficiency >= dept2.efficiency ? ' higher ' : ' lower '} 
                      efficiency scores. The most significant spending category difference is in 
                      {
                        Object.entries(dept1.spending)
                          .map(([category, value]) => ({
                            category,
                            diff: (value / dept1.spending) - (dept2.spending[category as keyof typeof dept2.spending] / dept2.spending)
                          }))
                          .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].category
                      }, where {dept1.name} allocates 
                      {
                        (
                          (dept1.spending[
                            Object.entries(dept1.spending)
                              .map(([category, value]) => ({
                                category,
                                diff: (value / dept1.spending) - (dept2.spending[category as keyof typeof dept2.spending] / dept2.spending)
                              }))
                              .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].category as keyof typeof dept1.spending
                          ] / dept1.spending) * 100
                        ).toFixed(1)
                      }% of its budget versus 
                      {
                        (
                          (dept2.spending[
                            Object.entries(dept1.spending)
                              .map(([category, value]) => ({
                                category,
                                diff: (value / dept1.spending) - (dept2.spending[category as keyof typeof dept2.spending] / dept2.spending)
                              }))
                              .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].category as keyof typeof dept2.spending
                          ] / dept2.spending) * 100
                        ).toFixed(1)
                      }% for {dept2.name}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="efficiency" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency by Category Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={120} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name={dept1.name} dataKey={dept1.name} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                      <Radar name={dept2.name} dataKey={dept2.name} stroke="#EF4444" fill="#EF4444" fillOpacity={0.5} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Trend Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyEfficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip formatter={(value) => [`${value}/100`, "Efficiency Score"]} />
                      <Legend />
                      <Line type="monotone" dataKey={dept1.name} name={dept1.name} stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey={dept2.name} name={dept2.name} stroke="#EF4444" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium py-3 px-4">Metric</th>
                            <th className="text-center font-medium py-3 px-4">{dept1.name}</th>
                            <th className="text-center font-medium py-3 px-4">{dept2.name}</th>
                            <th className="text-right font-medium py-3 px-4">Difference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Overall Efficiency</td>
                            <td className="py-3 px-4 text-center">{dept1.efficiency}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.efficiency}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.efficiency - dept2.efficiency >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.efficiency > dept2.efficiency ? '+' : ''}{dept1.efficiency - dept2.efficiency}
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Operational Efficiency</td>
                            <td className="py-3 px-4 text-center">{dept1.metrics.operationalEfficiency}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.metrics.operationalEfficiency}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.metrics.operationalEfficiency - dept2.metrics.operationalEfficiency >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.metrics.operationalEfficiency > dept2.metrics.operationalEfficiency ? '+' : ''}
                                {dept1.metrics.operationalEfficiency - dept2.metrics.operationalEfficiency}
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Budget Utilization</td>
                            <td className="py-3 px-4 text-center">{dept1.metrics.budgetUtilization}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.metrics.budgetUtilization}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.metrics.budgetUtilization - dept2.metrics.budgetUtilization >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.metrics.budgetUtilization > dept2.metrics.budgetUtilization ? '+' : ''}
                                {dept1.metrics.budgetUtilization - dept2.metrics.budgetUtilization}
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Program Effectiveness</td>
                            <td className="py-3 px-4 text-center">{dept1.metrics.programEffectiveness}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.metrics.programEffectiveness}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.metrics.programEffectiveness - dept2.metrics.programEffectiveness >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.metrics.programEffectiveness > dept2.metrics.programEffectiveness ? '+' : ''}
                                {dept1.metrics.programEffectiveness - dept2.metrics.programEffectiveness}
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Service Delivery</td>
                            <td className="py-3 px-4 text-center">{dept1.metrics.serviceDelivery}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.metrics.serviceDelivery}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.metrics.serviceDelivery - dept2.metrics.serviceDelivery >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.metrics.serviceDelivery > dept2.metrics.serviceDelivery ? '+' : ''}
                                {dept1.metrics.serviceDelivery - dept2.metrics.serviceDelivery}
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">Innovation</td>
                            <td className="py-3 px-4 text-center">{dept1.metrics.innovation}/100</td>
                            <td className="py-3 px-4 text-center">{dept2.metrics.innovation}/100</td>
                            <td className="py-3 px-4 text-right">
                              <span className={dept1.metrics.innovation - dept2.metrics.innovation >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dept1.metrics.innovation > dept2.metrics.innovation ? '+' : ''}
                                {dept1.metrics.innovation - dept2.metrics.innovation}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-md">
                      <h3 className="text-lg font-semibold mb-2 text-blue-800">{dept1.name} Strengths</h3>
                      <ul className="space-y-2 text-sm">
                        {Object.entries(dept1.metrics)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 3)
                          .map(([key, value], index) => (
                            <li key={index} className="flex items-center">
                              <div className="flex-none w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                                <i className="ri-check-line"></i>
                              </div>
                              <span>
                                <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                <span className="ml-1 text-gray-600">({value}/100)</span>
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-md">
                      <h3 className="text-lg font-semibold mb-2 text-red-800">{dept2.name} Strengths</h3>
                      <ul className="space-y-2 text-sm">
                        {Object.entries(dept2.metrics)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 3)
                          .map(([key, value], index) => (
                            <li key={index} className="flex items-center">
                              <div className="flex-none w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2">
                                <i className="ri-check-line"></i>
                              </div>
                              <span>
                                <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                <span className="ml-1 text-gray-600">({value}/100)</span>
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md">
                      <h3 className="text-lg font-semibold mb-2">Efficiency Differentiators</h3>
                      <p className="text-sm text-gray-700">
                        The largest efficiency gap is in 
                        {
                          Object.entries(dept1.metrics)
                            .map(([key, value]) => ({
                              category: key,
                              diff: value - dept2.metrics[key as keyof typeof dept2.metrics]
                            }))
                            .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].category
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())
                        }
                        , where {dept1.name} scores 
                        {
                          Math.abs(
                            Object.entries(dept1.metrics)
                              .map(([key, value]) => ({
                                category: key,
                                diff: value - dept2.metrics[key as keyof typeof dept2.metrics]
                              }))
                              .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].diff
                          )
                        } points 
                        {
                          Object.entries(dept1.metrics)
                            .map(([key, value]) => ({
                              category: key,
                              diff: value - dept2.metrics[key as keyof typeof dept2.metrics]
                            }))
                            .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].diff > 0 
                            ? 'higher' 
                            : 'lower'
                        } 
                        than {dept2.name}.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}