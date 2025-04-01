import React, { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Cell
} from "recharts";

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const departments = [
    {
      id: 1,
      name: "Treasury",
      budget: 340.5,
      spending: 298.2,
      efficiency: 93,
      completedProjects: 12,
      totalProjects: 15,
      status: "on-track",
      icon: "ri-bank-line",
      color: "blue",
      employees: 1250,
      description: "Manages government finances, tax collection, and economic policy"
    },
    {
      id: 2,
      name: "Defense",
      budget: 850.2,
      spending: 872.1,
      efficiency: 81,
      completedProjects: 18,
      totalProjects: 25,
      status: "needs-attention",
      icon: "ri-shield-line",
      color: "red",
      employees: 2850,
      description: "Oversees national security and military operations"
    },
    {
      id: 3,
      name: "Education",
      budget: 215.4,
      spending: 198.9,
      efficiency: 88,
      completedProjects: 9,
      totalProjects: 12,
      status: "on-track",
      icon: "ri-book-open-line",
      color: "green",
      employees: 950,
      description: "Manages educational policies, standards, and funding"
    },
    {
      id: 4,
      name: "Transportation",
      budget: 185.7,
      spending: 212.3,
      efficiency: 75,
      completedProjects: 7,
      totalProjects: 14,
      status: "at-risk",
      icon: "ri-road-map-line",
      color: "orange",
      employees: 780,
      description: "Oversees infrastructure development and public transportation"
    },
    {
      id: 5,
      name: "Health & Human Services",
      budget: 425.8,
      spending: 410.2,
      efficiency: 89,
      completedProjects: 15,
      totalProjects: 18,
      status: "on-track",
      icon: "ri-heart-pulse-line",
      color: "purple",
      employees: 1850,
      description: "Manages healthcare programs and social services"
    },
    {
      id: 6,
      name: "Energy",
      budget: 120.3,
      spending: 115.8,
      efficiency: 84,
      completedProjects: 6,
      totalProjects: 9,
      status: "on-track",
      icon: "ri-flashlight-line",
      color: "yellow",
      employees: 620,
      description: "Oversees energy production, conservation, and research"
    },
    {
      id: 7,
      name: "Veterans Affairs",
      budget: 180.6,
      spending: 195.2,
      efficiency: 78,
      completedProjects: 8,
      totalProjects: 12,
      status: "needs-attention",
      icon: "ri-user-star-line",
      color: "blue",
      employees: 890,
      description: "Provides services and benefits to military veterans"
    }
  ];

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const budgetData = departments.map(dept => ({
    name: dept.name,
    budget: dept.budget,
    spending: dept.spending
  }));

  const efficiencyData = departments.map(dept => ({
    name: dept.name,
    efficiency: dept.efficiency
  }));

  const projectsData = departments.map(dept => ({
    name: dept.name,
    completed: dept.completedProjects,
    total: dept.totalProjects
  }));

  const employeesData = departments.map(dept => ({
    name: dept.name,
    value: dept.employees
  }));

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F97316', '#8B5CF6', '#FACC15', '#3B82F6'];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'needs-attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'On Track';
      case 'needs-attention':
        return 'Needs Attention';
      case 'at-risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Department Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Explore detailed performance metrics and resource allocation across government departments
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-72">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <Input
                placeholder="Search departments..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => (
                <Card key={dept.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Avatar className={`h-9 w-9 bg-${dept.color}-100 text-${dept.color}-600`}>
                          <AvatarFallback className="bg-transparent">
                            <i className={dept.icon}></i>
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(dept.status)}`}>
                        {getStatusLabel(dept.status)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Budget Utilization</span>
                          <span className="text-sm font-medium">
                            ${dept.spending}M / ${dept.budget}M
                          </span>
                        </div>
                        <Progress 
                          value={(dept.spending / dept.budget) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Efficiency Score</span>
                          <span className="text-sm font-medium">{dept.efficiency}%</span>
                        </div>
                        <Progress value={dept.efficiency} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Project Completion</span>
                          <span className="text-sm font-medium">
                            {dept.completedProjects} / {dept.totalProjects}
                          </span>
                        </div>
                        <Progress 
                          value={(dept.completedProjects / dept.totalProjects) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs. Spending</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={budgetData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                      />
                      <YAxis 
                        label={{ 
                          value: 'Millions ($)', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }} 
                      />
                      <Tooltip formatter={(value) => `$${value}M`} />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#3B82F6" />
                      <Bar dataKey="spending" name="Spending" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={efficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                      />
                      <YAxis 
                        label={{ 
                          value: 'Efficiency (%)', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }}
                        domain={[0, 100]}
                      />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="efficiency" name="Efficiency" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Completion</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                      />
                      <YAxis 
                        label={{ 
                          value: 'Number of Projects', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }} 
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" fill="#10B981" />
                      <Bar dataKey="total" name="Total" fill="#64748B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Staff Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={employeesData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {employeesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} employees`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Department</th>
                        <th className="text-left font-medium py-3 px-4">Budget</th>
                        <th className="text-left font-medium py-3 px-4">Spending</th>
                        <th className="text-left font-medium py-3 px-4">Variance</th>
                        <th className="text-left font-medium py-3 px-4">Efficiency</th>
                        <th className="text-left font-medium py-3 px-4">Projects</th>
                        <th className="text-left font-medium py-3 px-4">Staff</th>
                        <th className="text-left font-medium py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredDepartments.map((dept) => {
                        const variance = ((dept.spending - dept.budget) / dept.budget) * 100;
                        return (
                          <tr key={dept.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Avatar className={`h-6 w-6 mr-2 bg-${dept.color}-100 text-${dept.color}-600`}>
                                  <AvatarFallback className="bg-transparent">
                                    <i className={dept.icon}></i>
                                  </AvatarFallback>
                                </Avatar>
                                <span>{dept.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono">${dept.budget}M</td>
                            <td className="py-3 px-4 font-mono">${dept.spending}M</td>
                            <td className="py-3 px-4">
                              <span className={variance > 0 ? 'text-red-600' : 'text-green-600'}>
                                {variance.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 px-4">{dept.efficiency}%</td>
                            <td className="py-3 px-4">
                              {dept.completedProjects}/{dept.totalProjects}
                            </td>
                            <td className="py-3 px-4">{dept.employees}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(dept.status)}`}>
                                {getStatusLabel(dept.status)}
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
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}