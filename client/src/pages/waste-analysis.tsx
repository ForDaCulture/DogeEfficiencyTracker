import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
  Scatter,
  ScatterChart,
  ZAxis
} from "recharts";

export default function WasteAnalysis() {
  const [department, setDepartment] = useState("all");
  const [year, setYear] = useState("2025");
  const [wasteCategory, setWasteCategory] = useState("all");

  // Waste by department
  const departmentWaste = [
    { name: "Treasury", value: 15.2, percentage: 4.5, color: "#3B82F6" },
    { name: "Defense", value: 67.8, percentage: 8.0, color: "#EF4444" },
    { name: "Education", value: 12.3, percentage: 5.7, color: "#10B981" },
    { name: "Transportation", value: 22.4, percentage: 12.1, color: "#F97316" },
    { name: "Health & Human Services", value: 32.5, percentage: 7.6, color: "#8B5CF6" },
    { name: "Energy", value: 10.8, percentage: 9.0, color: "#FACC15" },
    { name: "Veterans Affairs", value: 14.5, percentage: 8.0, color: "#06B6D4" }
  ];

  // Waste by category
  const wasteCategories = [
    { name: "Duplicate Services", value: 42.5, color: "#3B82F6" },
    { name: "Administrative Overhead", value: 35.8, color: "#EF4444" },
    { name: "Outdated Systems", value: 29.3, color: "#10B981" },
    { name: "Inefficient Processes", value: 38.7, color: "#F97316" },
    { name: "Improper Payments", value: 22.4, color: "#8B5CF6" },
    { name: "Unnecessary Expenditures", value: 18.6, color: "#FACC15" },
    { name: "Procurement Inefficiencies", value: 26.2, color: "#06B6D4" }
  ];

  // Historical waste trends
  const wasteOverTime = [
    { year: "2020", waste: 205.3, budget: 2350.5, percentage: 8.7 },
    { year: "2021", waste: 215.4, budget: 2420.3, percentage: 8.9 },
    { year: "2022", waste: 222.6, budget: 2510.7, percentage: 8.9 },
    { year: "2023", waste: 190.2, budget: 2580.4, percentage: 7.4 },
    { year: "2024", waste: 180.5, budget: 2620.8, percentage: 6.9 },
    { year: "2025", waste: 175.5, budget: 2670.0, percentage: 6.6 }
  ];

  // Interventions and savings
  const interventions = [
    { 
      id: 1,
      name: "Consolidate IT Systems", 
      department: "All", 
      category: "Outdated Systems",
      potentialSavings: 28.5,
      implementationCost: 12.2,
      timeframe: "18 months",
      complexity: "High",
      roi: 2.3
    },
    { 
      id: 2,
      name: "Streamline Procurement Process", 
      department: "Defense", 
      category: "Procurement Inefficiencies",
      potentialSavings: 35.2,
      implementationCost: 8.5,
      timeframe: "12 months",
      complexity: "Medium",
      roi: 4.1
    },
    { 
      id: 3,
      name: "Eliminate Redundant Programs", 
      department: "Health & Human Services", 
      category: "Duplicate Services",
      potentialSavings: 22.8,
      implementationCost: 4.2,
      timeframe: "8 months",
      complexity: "Medium",
      roi: 5.4
    },
    { 
      id: 4,
      name: "Automated Payment Verification", 
      department: "Treasury", 
      category: "Improper Payments",
      potentialSavings: 18.4,
      implementationCost: 6.8,
      timeframe: "10 months",
      complexity: "High",
      roi: 2.7
    },
    { 
      id: 5,
      name: "Remote Work Optimization", 
      department: "All", 
      category: "Administrative Overhead",
      potentialSavings: 25.6,
      implementationCost: 3.5,
      timeframe: "6 months",
      complexity: "Low",
      roi: 7.3
    },
    { 
      id: 6,
      name: "Energy Efficiency Program", 
      department: "Energy", 
      category: "Unnecessary Expenditures",
      potentialSavings: 14.2,
      implementationCost: 5.8,
      timeframe: "24 months",
      complexity: "Medium",
      roi: 2.4
    },
    { 
      id: 7,
      name: "Process Digitization", 
      department: "Transportation", 
      category: "Inefficient Processes",
      potentialSavings: 19.5,
      implementationCost: 7.2,
      timeframe: "14 months",
      complexity: "Medium",
      roi: 2.7
    }
  ];

  // Data for relationship between efficiency and waste
  const efficiencyWasteCorrelation = departmentWaste.map(dept => {
    const efficiency = Math.max(60, 100 - dept.percentage * 3);
    return {
      name: dept.name,
      efficiency: efficiency,
      waste: dept.percentage,
      budget: dept.value
    };
  });

  // Waste by program (fictional)
  const programWaste = [
    { name: "Military Equipment Maintenance", department: "Defense", value: 15.8, color: "#3B82F6" },
    { name: "Healthcare Delivery Systems", department: "Health & Human Services", value: 12.3, color: "#EF4444" },
    { name: "Highway Construction", department: "Transportation", value: 10.5, color: "#10B981" },
    { name: "Financial System IT", department: "Treasury", value: 9.8, color: "#F97316" },
    { name: "Educational Grants Administration", department: "Education", value: 8.7, color: "#8B5CF6" },
    { name: "Nuclear Facility Management", department: "Energy", value: 7.5, color: "#FACC15" },
    { name: "Benefits Processing", department: "Veterans Affairs", value: 7.2, color: "#06B6D4" },
    { name: "Defense Procurement", department: "Defense", value: 15.3, color: "#DC2626" },
    { name: "Medical Research Grants", department: "Health & Human Services", value: 8.9, color: "#A855F7" },
    { name: "Public Housing Administration", department: "Housing", value: 7.8, color: "#84CC16" },
    { name: "Border Infrastructure", department: "Homeland Security", value: 6.5, color: "#7C3AED" },
    { name: "Foreign Aid Programs", department: "State", value: 5.9, color: "#EC4899" }
  ];

  // Root cause analysis data
  const rootCauses = [
    { name: "Outdated Systems & Technology", value: 28, color: "#3B82F6" },
    { name: "Complex Regulations", value: 22, color: "#EF4444" },
    { name: "Fragmented Management", value: 18, color: "#10B981" },
    { name: "Poor Inter-Department Coordination", value: 12, color: "#F97316" },
    { name: "Lack of Performance Metrics", value: 10, color: "#8B5CF6" },
    { name: "Unclear Objectives", value: 6, color: "#FACC15" },
    { name: "Other Factors", value: 4, color: "#06B6D4" }
  ];

  const COLORS = departmentWaste.map(item => item.color);

  const formatDollar = (value: number) => `$${value}M`;
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Government Waste Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Identifying inefficiencies, cost overruns, and opportunities for optimization across departments
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
            
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Fiscal Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">FY 2025</SelectItem>
                <SelectItem value="2024">FY 2024</SelectItem>
                <SelectItem value="2023">FY 2023</SelectItem>
                <SelectItem value="2022">FY 2022</SelectItem>
                <SelectItem value="2021">FY 2021</SelectItem>
                <SelectItem value="2020">FY 2020</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="flex items-center gap-2">
              <i className="ri-file-chart-line"></i>
              <span>Detailed Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Identified Waste</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$175.5M</span>
                <span className="ml-2 text-sm text-green-600">-2.8% vs FY 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">6.6% of total budget</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Potential Annual Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$164.2M</span>
                <span className="ml-2 text-sm text-green-600">93.6% recovery possible</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Through recommended interventions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Optimization Priority Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">78/100</span>
                <span className="ml-2 text-sm text-green-600">+5 pts vs FY 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Based on ROI and implementation complexity</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rootcauses">Root Causes</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Waste by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentWaste}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={formatDollar} />
                      <YAxis type="category" dataKey="name" width={120} />
                      <Tooltip formatter={(value, name) => [formatDollar(value as number), "Waste Amount"]} />
                      <Bar 
                        dataKey="value" 
                        name="Waste Amount" 
                        fill="#3B82F6"
                        label={{ 
                          position: 'right', 
                          formatter: (val: number) => `${val}M`, 
                          fill: '#666',
                          fontSize: 12
                        }}
                      >
                        {departmentWaste.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Waste by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}M`}
                      >
                        {wasteCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={formatDollar} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Waste Trends Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={wasteOverTime}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" tickFormatter={formatDollar} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={formatPercentage} />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === "waste") return [formatDollar(value as number), "Waste Amount"];
                          if (name === "percentage") return [formatPercentage(value as number), "% of Budget"];
                          return [value, name];
                        }} 
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="waste" 
                        name="Waste Amount" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="percentage" 
                        name="% of Budget" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Efficiency vs. Waste Correlation</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="efficiency" 
                        name="Efficiency Score" 
                        label={{ 
                          value: 'Efficiency Score (%)', 
                          position: 'insideBottom', 
                          offset: -10 
                        }}
                        domain={[50, 100]}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="waste" 
                        name="Waste Percentage" 
                        label={{ 
                          value: 'Waste (% of Budget)', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }}
                      />
                      <ZAxis dataKey="budget" range={[50, 400]} name="Budget Size" />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === "Efficiency Score") return [`${value}%`, name];
                          if (name === "Waste Percentage") return [`${value}%`, "Waste (% of Budget)"];
                          if (name === "Budget Size") return [formatDollar(value as number), "Department Budget"];
                          return [value, name];
                        }}
                        cursor={{ strokeDasharray: '3 3' }}
                      />
                      <Legend />
                      <Scatter 
                        name="Departments" 
                        data={efficiencyWasteCorrelation} 
                        fill="#8884d8"
                      >
                        {efficiencyWasteCorrelation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={departmentWaste[index].color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="rootcauses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Root Causes of Waste</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rootCauses}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {rootCauses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Root Cause Impact Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {rootCauses.map((cause, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: cause.color }}
                            ></div>
                            <span className="text-sm font-medium">{cause.name}</span>
                          </div>
                          <span className="text-sm font-medium">{cause.value}%</span>
                        </div>
                        <Progress value={cause.value} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {index === 0 && "Legacy systems unable to efficiently process modern workloads, resulting in manual workarounds and duplicated efforts."}
                          {index === 1 && "Complex regulatory frameworks require extensive compliance procedures that add administrative overhead."}
                          {index === 2 && "Siloed organizational structures creating redundant functions across different units."}
                          {index === 3 && "Lack of communication between departments leads to duplicated services and missed opportunities for resource sharing."}
                          {index === 4 && "Insufficient measurement of outcomes relative to expenditures prevents identification of inefficiencies."}
                          {index === 5 && "Lack of clear goals for programs and services allows scope creep and budget expansion."}
                          {index === 6 && "Various other factors including political constraints, workforce skill gaps, and external factors."}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Key Waste Indicators by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-3 px-4">Department</th>
                          <th className="text-left font-medium py-3 px-4">Top Root Cause</th>
                          <th className="text-left font-medium py-3 px-4">Second Root Cause</th>
                          <th className="text-right font-medium py-3 px-4">Waste Amount</th>
                          <th className="text-right font-medium py-3 px-4">% of Budget</th>
                          <th className="text-right font-medium py-3 px-4">YoY Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {departmentWaste.map((dept, index) => {
                          // Randomly assign root causes for demonstration
                          const rootCauseIndex1 = Math.floor(Math.random() * rootCauses.length);
                          let rootCauseIndex2 = Math.floor(Math.random() * rootCauses.length);
                          while (rootCauseIndex2 === rootCauseIndex1) {
                            rootCauseIndex2 = Math.floor(Math.random() * rootCauses.length);
                          }
                          
                          const yoyChange = Math.random() > 0.6 ? -(Math.random() * 8 + 1).toFixed(1) : (Math.random() * 5).toFixed(1);
                          
                          return (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4">{dept.name}</td>
                              <td className="py-3 px-4">{rootCauses[rootCauseIndex1].name}</td>
                              <td className="py-3 px-4">{rootCauses[rootCauseIndex2].name}</td>
                              <td className="py-3 px-4 text-right font-mono">${dept.value}M</td>
                              <td className="py-3 px-4 text-right">{dept.percentage}%</td>
                              <td className="py-3 px-4 text-right">
                                <span className={Number(yoyChange) < 0 ? 'text-green-600' : 'text-red-600'}>
                                  {yoyChange}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="programs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste by Program</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={programWaste}
                    dataKey="value"
                    nameKey="name"
                    ratio={4/3}
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
                            fill: programWaste[index]?.color || "#8884d8",
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Programs with Highest Waste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {programWaste
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((program, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex-none w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{program.name}</div>
                              <div className="text-xs text-gray-500">{program.department}</div>
                            </div>
                          </div>
                          <div className="font-mono text-sm font-semibold">${program.value}M</div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Programs with Recent Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {programWaste
                      .sort(() => 0.5 - Math.random()) // Random sort for demonstration
                      .slice(0, 5)
                      .map((program, index) => {
                        const improvement = (Math.random() * 15 + 5).toFixed(1);
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex-none w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <i className="ri-arrow-down-line"></i>
                              </div>
                              <div>
                                <div className="font-medium text-sm">{program.name}</div>
                                <div className="text-xs text-gray-500">{program.department}</div>
                              </div>
                            </div>
                            <div className="text-green-600 text-sm font-semibold">-{improvement}%</div>
                          </div>
                        );
                      })
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="interventions" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold">Recommended Interventions</h3>
                <p className="text-sm text-gray-600">
                  Strategic initiatives to reduce waste and improve efficiency with ROI analysis
                </p>
              </div>
              <div className="flex gap-2">
                <Select
                  value={wasteCategory}
                  onValueChange={setWasteCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="duplicate">Duplicate Services</SelectItem>
                    <SelectItem value="overhead">Administrative Overhead</SelectItem>
                    <SelectItem value="outdated">Outdated Systems</SelectItem>
                    <SelectItem value="inefficient">Inefficient Processes</SelectItem>
                    <SelectItem value="improper">Improper Payments</SelectItem>
                    <SelectItem value="unnecessary">Unnecessary Expenditures</SelectItem>
                    <SelectItem value="procurement">Procurement Inefficiencies</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-1">
                  <i className="ri-filter-line"></i> More Filters
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {interventions.map((intervention, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 md:w-2/3">
                        <div>
                          <h3 className="text-lg font-semibold">{intervention.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                              {intervention.department}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                              {intervention.category}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {intervention.timeframe}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {intervention.complexity} Complexity
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-4">
                            {index === 0 && "Consolidate multiple IT systems across agencies to reduce duplicative maintenance costs and improve data integration. This initiative will modernize legacy systems while standardizing platforms."}
                            {index === 1 && "Implement strategic sourcing and centralized procurement processes to leverage volume discounts and reduce administrative overhead in acquisition processes."}
                            {index === 2 && "Identify and eliminate overlapping programs providing similar services within and across departments to reduce administrative costs and improve service delivery."}
                            {index === 3 && "Deploy AI and machine learning solutions to detect and prevent improper payments before they occur, reducing the need for costly recovery processes."}
                            {index === 4 && "Optimize facility usage and implement permanent hybrid work policies to reduce real estate footprint and associated overhead costs."}
                            {index === 5 && "Implement comprehensive energy audits and upgrades across government facilities to reduce long-term utility expenditures."}
                            {index === 6 && "Digitize paper-based workflows and automate approval chains to reduce processing times and administrative costs."}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium">Implementation Requirements</div>
                              <ul className="list-disc list-inside text-gray-600 mt-1">
                                {index === 0 && (
                                  <>
                                    <li>Comprehensive systems audit</li>
                                    <li>Migration plan development</li>
                                    <li>Staff retraining program</li>
                                    <li>Phased implementation schedule</li>
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    <li>Contract review and consolidation</li>
                                    <li>Procurement software implementation</li>
                                    <li>Process standardization</li>
                                    <li>Vendor management system</li>
                                  </>
                                )}
                                {index === 2 && (
                                  <>
                                    <li>Program evaluation framework</li>
                                    <li>Stakeholder engagement plan</li>
                                    <li>Legislative coordination</li>
                                    <li>Transition support services</li>
                                  </>
                                )}
                                {index === 3 && (
                                  <>
                                    <li>Data quality assessment</li>
                                    <li>Algorithm development</li>
                                    <li>Integration with payment systems</li>
                                    <li>Compliance verification protocols</li>
                                  </>
                                )}
                                {index === 4 && (
                                  <>
                                    <li>Space utilization analysis</li>
                                    <li>Technology infrastructure updates</li>
                                    <li>Policy modifications</li>
                                    <li>Remote work support systems</li>
                                  </>
                                )}
                                {index === 5 && (
                                  <>
                                    <li>Facility audits and assessments</li>
                                    <li>Retrofit planning</li>
                                    <li>Performance contracting</li>
                                    <li>Monitoring systems implementation</li>
                                  </>
                                )}
                                {index === 6 && (
                                  <>
                                    <li>Process mapping and analysis</li>
                                    <li>Software development/acquisition</li>
                                    <li>Integration with existing systems</li>
                                    <li>User training and support</li>
                                  </>
                                )}
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium">Expected Outcomes</div>
                              <ul className="list-disc list-inside text-gray-600 mt-1">
                                {index === 0 && (
                                  <>
                                    <li>25% reduction in IT maintenance costs</li>
                                    <li>Improved cross-agency data sharing</li>
                                    <li>Enhanced cybersecurity posture</li>
                                    <li>30% faster service delivery</li>
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    <li>15% reduction in procurement costs</li>
                                    <li>40% reduction in procurement cycle time</li>
                                    <li>Improved spend visibility</li>
                                    <li>Better contract compliance</li>
                                  </>
                                )}
                                {index === 2 && (
                                  <>
                                    <li>Elimination of service duplication</li>
                                    <li>Improved citizen experience</li>
                                    <li>Reduced administrative overhead</li>
                                    <li>Simplified program management</li>
                                  </>
                                )}
                                {index === 3 && (
                                  <>
                                    <li>85% reduction in improper payments</li>
                                    <li>Reduced recovery costs</li>
                                    <li>Improved payment accuracy</li>
                                    <li>Enhanced fraud detection</li>
                                  </>
                                )}
                                {index === 4 && (
                                  <>
                                    <li>20% reduction in facility costs</li>
                                    <li>Improved employee satisfaction</li>
                                    <li>Reduced carbon footprint</li>
                                    <li>Enhanced workforce flexibility</li>
                                  </>
                                )}
                                {index === 5 && (
                                  <>
                                    <li>30% reduction in energy consumption</li>
                                    <li>Lower maintenance requirements</li>
                                    <li>Improved occupant comfort</li>
                                    <li>Sustainability goal advancement</li>
                                  </>
                                )}
                                {index === 6 && (
                                  <>
                                    <li>60% faster processing times</li>
                                    <li>Reduced error rates</li>
                                    <li>Improved data accuracy</li>
                                    <li>Enhanced tracking and reporting</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/3 p-4 bg-gray-50 rounded-md flex flex-col justify-between">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500">Potential Annual Savings</div>
                            <div className="text-2xl font-bold">${intervention.potentialSavings}M</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500">Implementation Cost</div>
                            <div className="text-lg font-semibold">${intervention.implementationCost}M</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500">Return on Investment</div>
                            <div className="text-xl font-bold text-green-600">{intervention.roi}x</div>
                            <div className="text-xs text-gray-500">
                              Payback period: ~{Math.ceil(12 / intervention.roi)} months
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col gap-2">
                          <Button className="w-full">View Detailed Analysis</Button>
                          <Button variant="outline" className="w-full">Implementation Guide</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}