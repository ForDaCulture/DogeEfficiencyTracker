import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

export default function Performance() {
  const [department, setDepartment] = useState("all");
  const [timeframe, setTimeframe] = useState("1y");

  // Performance metrics by category
  const performanceCategories = [
    { name: "Operational Efficiency", score: 76, target: 85, color: "#3B82F6" },
    { name: "Budget Utilization", score: 92, target: 95, color: "#10B981" },
    { name: "Program Effectiveness", score: 68, target: 80, color: "#F97316" },
    { name: "Resource Management", score: 81, target: 85, color: "#8B5CF6" },
    { name: "Service Delivery", score: 73, target: 82, color: "#EF4444" },
    { name: "Innovation & Improvement", score: 64, target: 75, color: "#FACC15" }
  ];

  // Department performance data
  const departmentPerformance = [
    { name: "Treasury", score: 83, lastYearScore: 78, improvement: 5 },
    { name: "Defense", score: 72, lastYearScore: 69, improvement: 3 },
    { name: "Education", score: 79, lastYearScore: 76, improvement: 3 },
    { name: "Transportation", score: 75, lastYearScore: 68, improvement: 7 },
    { name: "Health & Human Services", score: 80, lastYearScore: 73, improvement: 7 },
    { name: "Energy", score: 76, lastYearScore: 71, improvement: 5 },
    { name: "Veterans Affairs", score: 74, lastYearScore: 70, improvement: 4 }
  ];

  // Trend data over time
  const trendData = [
    { month: "Jan", efficiency: 71, budget: 88, effectiveness: 62 },
    { month: "Feb", efficiency: 72, budget: 89, effectiveness: 63 },
    { month: "Mar", efficiency: 73, budget: 90, effectiveness: 64 },
    { month: "Apr", efficiency: 74, budget: 91, effectiveness: 65 },
    { month: "May", efficiency: 75, budget: 92, effectiveness: 66 },
    { month: "Jun", efficiency: 76, budget: 92, effectiveness: 67 },
    { month: "Jul", efficiency: 76, budget: 92, effectiveness: 67 },
    { month: "Aug", efficiency: 77, budget: 92, effectiveness: 68 },
    { month: "Sep", efficiency: 77, budget: 93, effectiveness: 68 },
    { month: "Oct", efficiency: 78, budget: 93, effectiveness: 69 },
    { month: "Nov", efficiency: 78, budget: 93, effectiveness: 69 },
    { month: "Dec", efficiency: 79, budget: 94, effectiveness: 70 }
  ];

  // Key performance indicators
  const kpis = [
    { 
      name: "Spending Efficiency", 
      value: 76, 
      change: 5.3, 
      description: "Measures how efficiently funds are utilized to achieve outcomes", 
      trend: "increasing" 
    },
    { 
      name: "Project Completion Rate", 
      value: 84, 
      change: 3.8, 
      description: "Percentage of projects completed on time and within budget", 
      trend: "increasing" 
    },
    { 
      name: "Cost per Outcome", 
      value: 68, 
      change: -2.1, 
      description: "Measures cost-effectiveness in achieving program outcomes", 
      trend: "decreasing" 
    },
    { 
      name: "Administration Ratio", 
      value: 92, 
      change: 2.5, 
      description: "Efficiency of administrative processes", 
      trend: "increasing" 
    }
  ];

  // Radar chart data for multidimensional performance analysis
  const radarData = departmentPerformance.map(dept => {
    return {
      department: dept.name,
      'Operational Efficiency': 50 + Math.random() * 40,
      'Budget Utilization': 60 + Math.random() * 35,
      'Program Effectiveness': 45 + Math.random() * 45,
      'Service Delivery': 55 + Math.random() * 35,
      'Innovation': 40 + Math.random() * 40
    };
  });

  // Goals vs Achievement data
  const goalsData = performanceCategories.map(category => ({
    name: category.name,
    actual: category.score,
    goal: category.target
  }));

  // Performance trends
  const performanceTrends = [
    { month: "Q1-2024", overall: 72 },
    { month: "Q2-2024", overall: 74 },
    { month: "Q3-2024", overall: 75 },
    { month: "Q4-2024", overall: 76 },
    { month: "Q1-2025", overall: 77 },
    { month: "Q2-2025", overall: 79 }
  ];

  // Department specific radar data
  const departmentRadarData = [
    {
      subject: 'Operational Efficiency',
      Treasury: 80,
      Defense: 70,
      Education: 75,
      'Health & Human Services': 82,
      fullMark: 100,
    },
    {
      subject: 'Budget Utilization',
      Treasury: 92,
      Defense: 85,
      Education: 88,
      'Health & Human Services': 90,
      fullMark: 100,
    },
    {
      subject: 'Program Effectiveness',
      Treasury: 70,
      Defense: 65,
      Education: 75,
      'Health & Human Services': 68,
      fullMark: 100,
    },
    {
      subject: 'Service Delivery',
      Treasury: 75,
      Defense: 80,
      Education: 76,
      'Health & Human Services': 72,
      fullMark: 100,
    },
    {
      subject: 'Innovation',
      Treasury: 68,
      Defense: 70,
      Education: 72,
      'Health & Human Services': 65,
      fullMark: 100,
    },
  ];

  const COLORS = performanceCategories.map(item => item.color);

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive overview of government efficiency and effectiveness metrics
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="health">Health & Human Services</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="veterans">Veterans Affairs</SelectItem>
              </SelectContent>
            </Select>
            
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{kpi.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{kpi.value}/100</span>
                  <span className={`ml-2 text-sm ${kpi.trend === 'increasing' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{kpi.description}</p>
                <Progress
                  value={kpi.value}
                  className="h-2 mt-3"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Performance Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="overall"
                        name="Overall Performance"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={goalsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={140} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="actual" name="Current Score" fill="#3B82F6" />
                      <Bar dataKey="goal" name="Target" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Current Score" fill="#3B82F6" />
                      <Bar dataKey="lastYearScore" name="Last Year Score" fill="#94A3B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Dimensions</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={130} data={departmentRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Treasury" dataKey="Treasury" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Radar name="Defense" dataKey="Defense" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                      <Radar name="Education" dataKey="Education" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                      <Radar name="Health & Human Services" dataKey="Health & Human Services" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-6">
            {departmentPerformance.map((dept, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-none bg-blue-100 text-blue-600 w-10 h-10 rounded-md flex items-center justify-center">
                          <i className={`ri-${index === 0 ? 'bank' : index === 1 ? 'shield' : index === 2 ? 'book-open' : index === 3 ? 'road-map' : index === 4 ? 'heart-pulse' : index === 5 ? 'flashlight' : 'user-star'}-line text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{dept.name} Department</h3>
                          <div className="text-sm text-gray-500">
                            Performance Score: <span className="font-semibold">{dept.score}/100</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Overall Performance</span>
                            <span className="text-sm font-medium">{dept.score}/100</span>
                          </div>
                          <Progress value={dept.score} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Year-Over-Year Change</span>
                            <span className="text-sm font-medium text-green-600">+{dept.improvement}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500" 
                              style={{ width: `${(dept.improvement / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">
                            View Detailed Report
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-2/3 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={120} data={departmentRadarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar 
                            name={dept.name} 
                            dataKey={dept.name === "Health & Human Services" ? "Health & Human Services" : dept.name} 
                            stroke={COLORS[index % COLORS.length]} 
                            fill={COLORS[index % COLORS.length]} 
                            fillOpacity={0.6} 
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      name="Operational Efficiency"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      name="Budget Utilization"
                      stroke="#10B981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="effectiveness"
                      name="Program Effectiveness"
                      stroke="#F97316"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Improvement Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="improvement"
                        name="Improvement (%)"
                        fill="#10B981"
                        label={{ position: 'top', formatter: (val: number) => `+${val}%` }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="score"
                        nameKey="name"
                        label={({ name, score }) => `${name}: ${score}/100`}
                      >
                        {performanceCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Performance Category</th>
                        <th className="text-center font-medium py-3 px-4">Score</th>
                        <th className="text-center font-medium py-3 px-4">Target</th>
                        <th className="text-center font-medium py-3 px-4">Gap</th>
                        <th className="text-center font-medium py-3 px-4">YoY Change</th>
                        <th className="text-left font-medium py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {performanceCategories.map((category, index) => {
                        const gap = category.target - category.score;
                        const yoyChange = Math.random() > 0.7 ? -(Math.random() * 3).toFixed(1) : (Math.random() * 8).toFixed(1);
                        
                        let status;
                        if (gap <= 0) status = { label: "Exceeding", class: "bg-green-100 text-green-800" };
                        else if (gap < 5) status = { label: "Meeting", class: "bg-blue-100 text-blue-800" };
                        else if (gap < 10) status = { label: "Approaching", class: "bg-yellow-100 text-yellow-800" };
                        else status = { label: "Below Target", class: "bg-red-100 text-red-800" };
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: category.color }}
                                ></div>
                                {category.name}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">{category.score}/100</td>
                            <td className="py-3 px-4 text-center">{category.target}/100</td>
                            <td className="py-3 px-4 text-center">{gap}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={Number(yoyChange) > 0 ? 'text-green-600' : 'text-red-600'}>
                                {Number(yoyChange) > 0 ? '+' : ''}{yoyChange}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${status.class}`}>
                                {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Performance Insights</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <i className="ri-information-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Budget Utilization Excels</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Budget utilization remains a strong area at 92% performance, demonstrating effective financial management and allocation strategies across departments.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                            <i className="ri-alert-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Innovation Needs Improvement</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Innovation & Improvement scores remain below target at 64%, indicating a need for more emphasis on modernization initiatives and creative problem-solving approaches.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <i className="ri-arrow-up-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Strong Improvement Trends</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Overall performance shows a consistent upward trend, with a 4.2% average improvement over the past year across all metrics, indicating effective efficiency initiatives.
                          </p>
                        </div>
                      </div>
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