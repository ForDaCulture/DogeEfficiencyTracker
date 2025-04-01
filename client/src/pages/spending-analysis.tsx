import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
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
  Treemap,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";

export default function SpendingAnalysis() {
  const [fiscalYear, setFiscalYear] = useState("2025");
  const [department, setDepartment] = useState("all");
  const [view, setView] = useState("categories");

  // Spending by category
  const spendingCategories = [
    { name: "Personnel", value: 850.3, lastYear: 820.4, change: 3.6, color: "#3B82F6" },
    { name: "Operations", value: 620.5, lastYear: 590.2, change: 5.1, color: "#EF4444" },
    { name: "Infrastructure", value: 450.2, lastYear: 480.5, change: -6.3, color: "#10B981" },
    { name: "Research", value: 280.8, lastYear: 250.3, change: 12.2, color: "#F97316" },
    { name: "Grants", value: 350.4, lastYear: 340.1, change: 3.0, color: "#8B5CF6" },
    { name: "Technology", value: 190.7, lastYear: 170.2, change: 12.0, color: "#FACC15" },
    { name: "Administration", value: 110.3, lastYear: 130.5, change: -15.5, color: "#06B6D4" }
  ];

  // Spending by department
  const departmentSpending = [
    { name: "Treasury", value: 340.5, budget: 350.0, lastYear: 325.4, change: 4.6, color: "#3B82F6" },
    { name: "Defense", value: 850.2, budget: 820.0, lastYear: 810.8, change: 4.9, color: "#EF4444" },
    { name: "Education", value: 215.4, budget: 225.0, lastYear: 205.6, change: 4.8, color: "#10B981" },
    { name: "Transportation", value: 185.7, budget: 180.0, lastYear: 175.2, change: 6.0, color: "#F97316" },
    { name: "Health & Human Services", value: 425.8, budget: 435.0, lastYear: 410.5, change: 3.7, color: "#8B5CF6" },
    { name: "Energy", value: 120.3, budget: 125.0, lastYear: 115.6, change: 4.1, color: "#FACC15" },
    { name: "Veterans Affairs", value: 180.6, budget: 185.0, lastYear: 172.4, change: 4.8, color: "#06B6D4" }
  ];

  // Historical spending data
  const historicalSpending = [
    { year: "2020", spending: 2245.8, budget: 2350.5 },
    { year: "2021", spending: 2356.3, budget: 2420.3 },
    { year: "2022", spending: 2489.7, budget: 2510.7 },
    { year: "2023", spending: 2552.5, budget: 2580.4 },
    { year: "2024", spending: 2580.2, budget: 2620.8 },
    { year: "2025", spending: 2615.0, budget: 2670.0 }
  ];

  // Quarterly spending data
  const quarterlySpending = [
    { quarter: "Q1 2025", actual: 652.5, planned: 670.0 },
    { quarter: "Q2 2025", actual: 650.8, planned: 665.0 },
    { quarter: "Q3 2025", actual: 664.7, planned: 680.0 },
    { quarter: "Q4 2025", actual: 647.0, planned: 655.0 }
  ];

  // Spending vs results
  const spendingResults = departmentSpending.map(dept => {
    // Calculate an effectiveness score for demonstration
    const effectivenessScore = 70 + Math.random() * 20;
    return {
      name: dept.name,
      spending: dept.value,
      effectiveness: effectivenessScore,
      size: dept.value
    };
  });

  // Category breakdown by department
  const categoryByDepartment = [
    {
      department: "Treasury",
      Personnel: 120.5,
      Operations: 80.2,
      Infrastructure: 45.8,
      Research: 35.5,
      Grants: 25.6,
      Technology: 22.3,
      Administration: 10.6
    },
    {
      department: "Defense",
      Personnel: 320.6,
      Operations: 230.5,
      Infrastructure: 150.4,
      Research: 60.2,
      Grants: 30.8,
      Technology: 48.5,
      Administration: 9.2
    },
    {
      department: "Education",
      Personnel: 75.3,
      Operations: 25.8,
      Infrastructure: 15.4,
      Research: 40.2,
      Grants: 50.5,
      Technology: 5.8,
      Administration: 2.4
    },
    {
      department: "Health & Human Services",
      Personnel: 160.4,
      Operations: 95.6,
      Infrastructure: 40.2,
      Research: 80.5,
      Grants: 35.3,
      Technology: 9.5,
      Administration: 4.3
    }
  ];

  // Monthly spending trend
  const monthlySpending = [
    { name: "Jan", spending: 218.5 },
    { name: "Feb", spending: 210.3 },
    { name: "Mar", spending: 225.8 },
    { name: "Apr", spending: 220.4 },
    { name: "May", spending: 215.6 },
    { name: "Jun", spending: 228.9 },
    { name: "Jul", spending: 232.5 },
    { name: "Aug", spending: 226.8 },
    { name: "Sep", spending: 230.4 },
    { name: "Oct", spending: 219.5 },
    { name: "Nov", spending: 218.7 },
    { name: "Dec", spending: 225.2 }
  ];

  // Spending trends by category
  const trendByCategory = [
    { month: "Jan", Personnel: 71.2, Operations: 52.5, Infrastructure: 36.8, Research: 23.5 },
    { month: "Feb", Personnel: 70.5, Operations: 50.3, Infrastructure: 35.2, Research: 22.8 },
    { month: "Mar", Personnel: 72.3, Operations: 54.1, Infrastructure: 38.5, Research: 24.2 },
    { month: "Apr", Personnel: 71.8, Operations: 53.2, Infrastructure: 37.6, Research: 23.9 },
    { month: "May", Personnel: 70.9, Operations: 51.8, Infrastructure: 36.5, Research: 23.2 },
    { month: "Jun", Personnel: 73.5, Operations: 55.3, Infrastructure: 39.2, Research: 25.1 },
    { month: "Jul", Personnel: 74.8, Operations: 56.5, Infrastructure: 40.1, Research: 25.8 },
    { month: "Aug", Personnel: 73.6, Operations: 54.8, Infrastructure: 38.8, Research: 24.9 },
    { month: "Sep", Personnel: 74.2, Operations: 55.5, Infrastructure: 39.5, Research: 25.4 },
    { month: "Oct", Personnel: 72.1, Operations: 53.0, Infrastructure: 37.2, Research: 24.0 },
    { month: "Nov", Personnel: 71.8, Operations: 52.7, Infrastructure: 37.0, Research: 23.8 },
    { month: "Dec", Personnel: 73.2, Operations: 54.3, Infrastructure: 38.6, Research: 24.5 }
  ];

  const COLORS = spendingCategories.map(item => item.color);
  
  const formatDollar = (value: number) => `$${value}M`;
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Spending Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Detailed breakdown and analysis of government spending patterns and trends
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={fiscalYear} onValueChange={setFiscalYear}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Fiscal Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020">FY 2020</SelectItem>
                <SelectItem value="2021">FY 2021</SelectItem>
                <SelectItem value="2022">FY 2022</SelectItem>
                <SelectItem value="2023">FY 2023</SelectItem>
                <SelectItem value="2024">FY 2024</SelectItem>
                <SelectItem value="2025">FY 2025</SelectItem>
              </SelectContent>
            </Select>
            
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
            
            <Button className="flex items-center gap-2">
              <i className="ri-download-line"></i>
              <span>Export Data</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$2.62B</span>
                <span className="ml-2 text-sm text-green-600">+1.3% YoY</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">97.9% of allocated budget</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Largest Spending Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">Personnel</span>
                <span className="ml-2 text-sm text-slate-600">$850.3M</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">32.5% of total spending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Spending Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">83.6%</span>
                <span className="ml-2 text-sm text-green-600">+2.1% YoY</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Outcomes per dollar spent</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <CardTitle>Spending Distribution</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant={view === "categories" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setView("categories")}
                      >
                        By Category
                      </Button>
                      <Button 
                        variant={view === "departments" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setView("departments")}
                      >
                        By Department
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={view === "categories" ? spendingCategories : departmentSpending}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {(view === "categories" ? spendingCategories : departmentSpending).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value}M`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-sm font-medium mb-4">Spending Breakdown</h3>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                        {(view === "categories" ? spendingCategories : departmentSpending).map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-medium">${item.value}M</span>
                              <span className={`text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change > 0 ? '+' : ''}{item.change}% YoY
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs. Actual Spending</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalSpending}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={formatDollar} />
                      <Tooltip formatter={formatDollar} />
                      <Legend />
                      <Line type="monotone" dataKey="budget" name="Budget" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="spending" name="Actual Spending" stroke="#EF4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Spending Pattern (FY 2025)</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlySpending}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={formatDollar} />
                      <Tooltip formatter={formatDollar} />
                      <Legend />
                      <Bar dataKey="planned" name="Planned Spending" fill="#3B82F6" />
                      <Bar dataKey="actual" name="Actual Spending" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={spendingCategories}
                      dataKey="value"
                      nameKey="name"
                      ratio={4/3}
                      stroke="#fff"
                      content={({ root, depth, x, y, width, height, index, name, value }) => (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            style={{
                              fill: spendingCategories[index].color,
                              stroke: '#fff',
                              strokeWidth: 2,
                            }}
                          />
                          {width > 70 && height > 30 && (
                            <>
                              <text
                                x={x + width / 2}
                                y={y + height / 2 - 7}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize={12}
                                fontWeight="bold"
                              >
                                {name}
                              </text>
                              <text
                                x={x + width / 2}
                                y={y + height / 2 + 7}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize={11}
                              >
                                ${value}M
                              </text>
                            </>
                          )}
                        </g>
                      )}
                    />
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Spending vs. Last Year</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={spendingCategories}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={formatDollar} />
                      <YAxis type="category" dataKey="name" width={120} />
                      <Tooltip formatter={formatDollar} />
                      <Legend />
                      <Bar dataKey="value" name="FY 2025" fill="#3B82F6" />
                      <Bar dataKey="lastYear" name="FY 2024" fill="#94A3B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Mix by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryByDepartment}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                      stackOffset="expand"
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={formatPercentage} />
                      <YAxis type="category" dataKey="department" width={120} />
                      <Tooltip formatter={(value, name, props) => [`$${value}M`, name]} />
                      <Legend />
                      <Bar dataKey="Personnel" name="Personnel" stackId="a" fill="#3B82F6" />
                      <Bar dataKey="Operations" name="Operations" stackId="a" fill="#EF4444" />
                      <Bar dataKey="Infrastructure" name="Infrastructure" stackId="a" fill="#10B981" />
                      <Bar dataKey="Research" name="Research" stackId="a" fill="#F97316" />
                      <Bar dataKey="Grants" name="Grants" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="Technology" name="Technology" stackId="a" fill="#FACC15" />
                      <Bar dataKey="Administration" name="Administration" stackId="a" fill="#06B6D4" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Detailed Category Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {spendingCategories.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Current:</span>
                          <span className="text-sm font-mono">${category.value}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Year:</span>
                          <span className="text-sm font-mono">${category.lastYear}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Change:</span>
                          <span className={`text-sm ${category.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {category.change > 0 ? '+' : ''}{category.change}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>% of Total Spending:</span>
                          <span>{(category.value / spendingCategories.reduce((sum, cat) => sum + cat.value, 0) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={(category.value / spendingCategories.reduce((sum, cat) => sum + cat.value, 0) * 100)} 
                          className="h-1"
                          style={{ '--indicator-color': category.color } as React.CSSProperties}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trends (FY 2025)</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlySpending}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatDollar} />
                    <Tooltip formatter={formatDollar} />
                    <Area type="monotone" dataKey="spending" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendByCategory}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatDollar} />
                    <Tooltip formatter={formatDollar} />
                    <Legend />
                    <Line type="monotone" dataKey="Personnel" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Operations" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="Infrastructure" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="Research" stroke="#F97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentSpending}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis domain={[0, 110]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value, name) => {
                        if (name === "Utilization") return [`${value}%`, name];
                        return [value, name];
                      }} />
                      <Bar 
                        dataKey="dummy" 
                        name="Utilization" 
                        fill="#3B82F6"
                        // Calculate the percentage for each bar
                        data={departmentSpending.map(dept => ({
                          name: dept.name,
                          dummy: (dept.value / dept.budget * 100).toFixed(1)
                        }))}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Annual Spending Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentSpending}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis domain={[-20, 20]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "YoY Change"]} />
                      <Bar 
                        dataKey="change" 
                        name="YoY Change" 
                        fill="#3B82F6"
                        // Color bars based on positive/negative values
                        shape={(props: any) => {
                          const { x, y, width, height, value } = props;
                          return (
                            <rect 
                              x={x} 
                              y={value >= 0 ? y : y + height} 
                              width={width} 
                              height={Math.abs(height)} 
                              fill={value >= 0 ? '#10B981' : '#EF4444'} 
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
          </TabsContent>
          
          <TabsContent value="effectiveness" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending vs. Effectiveness</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="spending" 
                      name="Spending" 
                      tickFormatter={formatDollar}
                      label={{ value: 'Spending (in Millions $)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="effectiveness" 
                      name="Effectiveness" 
                      tickFormatter={(value) => `${value}`}
                      label={{ value: 'Effectiveness Score', angle: -90, position: 'insideLeft' }}
                      domain={[60, 100]}
                    />
                    <ZAxis dataKey="size" range={[50, 400]} name="Budget Size" />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === "Spending") return [formatDollar(value as number), name];
                        if (name === "Effectiveness") return [`${value}/100`, name];
                        return [value, name];
                      }}
                      cursor={{ strokeDasharray: '3 3' }}
                    />
                    <Legend />
                    <Scatter 
                      name="Departments" 
                      data={spendingResults} 
                      fill="#8884d8"
                    >
                      {spendingResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={departmentSpending[index].color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Spending Efficiency Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Department</th>
                        <th className="text-right font-medium py-3 px-4">Spending</th>
                        <th className="text-right font-medium py-3 px-4">Budget</th>
                        <th className="text-right font-medium py-3 px-4">Utilization</th>
                        <th className="text-right font-medium py-3 px-4">Effectiveness</th>
                        <th className="text-right font-medium py-3 px-4">Efficiency Ratio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {departmentSpending.map((dept, index) => {
                        const utilization = (dept.value / dept.budget * 100).toFixed(1);
                        const effectiveness = spendingResults[index].effectiveness.toFixed(1);
                        const efficiencyRatio = (Number(effectiveness) / Number(utilization) * 100).toFixed(1);
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: dept.color }}
                                ></div>
                                {dept.name}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-mono">${dept.value}M</td>
                            <td className="py-3 px-4 text-right font-mono">${dept.budget}M</td>
                            <td className="py-3 px-4 text-right">{utilization}%</td>
                            <td className="py-3 px-4 text-right">{effectiveness}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={Number(efficiencyRatio) >= 100 ? 'text-green-600' : Number(efficiencyRatio) >= 90 ? 'text-yellow-600' : 'text-red-600'}>
                                {efficiencyRatio}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Efficiency Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <i className="ri-information-line"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Treasury Has Highest Efficiency</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Treasury Department demonstrates the highest efficiency ratio, effectively utilizing 97.3% of its budget allocation with strong outcomes.
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
                          <h4 className="font-medium">Defense Spending Exceeds Budget</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Defense Department spending is 3.7% over budget allocation, suggesting potential need for improved cost controls and budget management.
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
                          <h4 className="font-medium">Personnel Spending ROI</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            While Personnel represents the largest spending category at $850.3M, it delivers significant returns through productivity and service delivery.
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