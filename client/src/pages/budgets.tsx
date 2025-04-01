import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Line
} from "recharts";

export default function Budgets() {
  const [fiscalYear, setFiscalYear] = useState("2025");
  const [budgetView, setBudgetView] = useState("departments");

  // Department budgets
  const departmentBudgets = [
    { name: "Treasury", value: 340.5, color: "#3B82F6" },
    { name: "Defense", value: 850.2, color: "#EF4444" },
    { name: "Education", value: 215.4, color: "#10B981" },
    { name: "Transportation", value: 185.7, color: "#F97316" },
    { name: "Health & Human Services", value: 425.8, color: "#8B5CF6" },
    { name: "Energy", value: 120.3, color: "#FACC15" },
    { name: "Veterans Affairs", value: 180.6, color: "#06B6D4" },
    { name: "Agriculture", value: 145.2, color: "#84CC16" },
    { name: "Justice", value: 95.8, color: "#A855F7" },
    { name: "State", value: 110.5, color: "#F43F5E" }
  ];

  // Category budgets
  const categoryBudgets = [
    { name: "Personnel", value: 850.3, color: "#3B82F6" },
    { name: "Operations", value: 620.5, color: "#EF4444" },
    { name: "Infrastructure", value: 450.2, color: "#10B981" },
    { name: "Research", value: 280.8, color: "#F97316" },
    { name: "Grants", value: 350.4, color: "#8B5CF6" },
    { name: "Technology", value: 190.7, color: "#FACC15" },
    { name: "Administration", value: 110.3, color: "#06B6D4" }
  ];

  // Project budgets
  const projectBudgets = [
    { name: "Infrastructure Modernization", value: 230.5, color: "#3B82F6" },
    { name: "Digital Transformation", value: 180.2, color: "#EF4444" },
    { name: "Public Health Initiatives", value: 120.4, color: "#10B981" },
    { name: "Education Reform", value: 150.7, color: "#F97316" },
    { name: "Green Energy Development", value: 95.8, color: "#8B5CF6" },
    { name: "Military Readiness", value: 220.3, color: "#FACC15" },
    { name: "Social Security Programs", value: 280.6, color: "#06B6D4" },
    { name: "Veteran Support Services", value: 110.9, color: "#84CC16" }
  ];

  // Historical budget data
  const historicalBudgets = [
    { year: "2020", total: 2350.5, spending: 2290.8 },
    { year: "2021", total: 2420.3, spending: 2400.6 },
    { year: "2022", total: 2510.7, spending: 2550.2 },
    { year: "2023", total: 2580.4, spending: 2610.9 },
    { year: "2024", total: 2620.8, spending: 2590.5 },
    { year: "2025", total: 2670.0, spending: 2615.0 }
  ];

  // Quarterly budget data
  const quarterlyBudgets = [
    { quarter: "Q1 2025", allocation: 670.0, spent: 652.5 },
    { quarter: "Q2 2025", allocation: 665.0, spent: 650.8 },
    { quarter: "Q3 2025", allocation: 680.0, spent: 664.7 },
    { quarter: "Q4 2025", allocation: 655.0, spent: 647.0 }
  ];

  // Budget vs spending by department
  const budgetSpendingComparison = departmentBudgets.map(dept => ({
    name: dept.name,
    budget: dept.value,
    spending: dept.value * (0.85 + Math.random() * 0.3) // random spending amount
  }));

  // Current active data based on view
  const activeData = budgetView === "departments" 
    ? departmentBudgets 
    : budgetView === "categories" 
      ? categoryBudgets 
      : projectBudgets;

  const COLORS = activeData.map(item => item.color);

  const formatDollar = (value: number) => `$${value}M`;

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive analysis of budget allocation, spending patterns, and fiscal management
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
            <Button variant="outline" className="flex items-center gap-2">
              <i className="ri-download-line"></i>
              <span>Export</span>
            </Button>
            <Button className="flex items-center gap-2">
              <i className="ri-file-list-line"></i>
              <span>Detailed Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$2.67B</span>
                <span className="ml-2 text-sm text-green-600">+1.9% vs FY 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Fiscal Year 2025</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Current Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$2.62B</span>
                <span className="ml-2 text-sm text-green-600">97.9% of budget</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Year to date</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Efficiency Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">86.4%</span>
                <span className="ml-2 text-sm text-green-600">+2.3% vs FY 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Average across departments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Budget Allocation</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={budgetView === "departments" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBudgetView("departments")}
                  >
                    Departments
                  </Button>
                  <Button 
                    variant={budgetView === "categories" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBudgetView("categories")}
                  >
                    Categories
                  </Button>
                  <Button 
                    variant={budgetView === "projects" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBudgetView("projects")}
                  >
                    Projects
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {activeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-sm font-medium mb-4">Budget Breakdown</h3>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    {activeData.map((item, index) => (
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
                          <span className="text-xs text-gray-500">
                            {(item.value / activeData.reduce((acc, cur) => acc + cur.value, 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlyBudgets}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={formatDollar} />
                      <Tooltip formatter={formatDollar} />
                      <Legend />
                      <Bar dataKey="allocation" name="Allocation" fill="#3B82F6" />
                      <Bar dataKey="spent" name="Spent" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Budget Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={departmentBudgets}
                      dataKey="value"
                      nameKey="name"
                      stroke="#fff"
                      fill="#8884d8"
                      content={({ root, depth, x, y, width, height, index, name, value }) => (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            style={{
                              fill: COLORS[index % COLORS.length],
                              stroke: '#fff',
                              strokeWidth: 2,
                            }}
                          />
                          {width > 60 && height > 30 && (
                            <text
                              x={x + width / 2}
                              y={y + height / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#fff"
                              fontSize={12}
                            >
                              {name} (${value}M)
                            </text>
                          )}
                        </g>
                      )}
                    />
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Budget Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalBudgets}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatDollar} />
                    <Tooltip formatter={formatDollar} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      name="Total Budget" 
                      stroke="#3B82F6" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spending" 
                      name="Total Spending" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs. Spending by Department</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetSpendingComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={formatDollar} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={120}
                    />
                    <Tooltip formatter={formatDollar} />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#3B82F6" />
                    <Bar dataKey="spending" name="Spending" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Budget Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Department</th>
                        <th className="text-right font-medium py-3 px-4">Budget</th>
                        <th className="text-right font-medium py-3 px-4">Spent</th>
                        <th className="text-right font-medium py-3 px-4">Remaining</th>
                        <th className="text-right font-medium py-3 px-4">% Used</th>
                        <th className="text-right font-medium py-3 px-4">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {budgetSpendingComparison.map((dept, index) => {
                        const spent = dept.spending;
                        const remaining = dept.budget - spent;
                        const percentUsed = (spent / dept.budget) * 100;
                        const randomChange = (Math.random() * 10 - 3).toFixed(1);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4">{dept.name}</td>
                            <td className="py-3 px-4 text-right font-mono">${dept.budget.toFixed(1)}M</td>
                            <td className="py-3 px-4 text-right font-mono">${spent.toFixed(1)}M</td>
                            <td className="py-3 px-4 text-right font-mono">${remaining.toFixed(1)}M</td>
                            <td className="py-3 px-4 text-right">{percentUsed.toFixed(1)}%</td>
                            <td className="py-3 px-4 text-right">
                              <span className={Number(randomChange) > 0 ? 'text-green-600' : 'text-red-600'}>
                                {randomChange}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="border-t">
                      <tr className="font-medium">
                        <td className="py-3 px-4">Total</td>
                        <td className="py-3 px-4 text-right font-mono">
                          ${budgetSpendingComparison.reduce((acc, curr) => acc + curr.budget, 0).toFixed(1)}M
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          ${budgetSpendingComparison.reduce((acc, curr) => acc + curr.spending, 0).toFixed(1)}M
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          ${budgetSpendingComparison.reduce((acc, curr) => acc + (curr.budget - curr.spending), 0).toFixed(1)}M
                        </td>
                        <td className="py-3 px-4 text-right">
                          {(
                            budgetSpendingComparison.reduce((acc, curr) => acc + curr.spending, 0) / 
                            budgetSpendingComparison.reduce((acc, curr) => acc + curr.budget, 0) * 100
                          ).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-right">+1.9%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}