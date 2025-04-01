import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  SummaryMetric, 
  DepartmentMetric, 
  BudgetAllocationData, 
  EfficiencyTrendData, 
  ProjectCompletionData, 
  TopPerformingDepartment,
  DashboardData,
  DateRangeType
} from "@shared/schema";

// Mock data for development
const mockSummaryMetrics: SummaryMetric[] = [
  {
    id: "budget",
    name: "Total Budget",
    value: "$2.67B",
    change: 1.9,
    description: "Fiscal Year 2025",
    icon: "ri-funds-box-line"
  },
  {
    id: "spending",
    name: "Current Spending",
    value: "$2.62B",
    change: -0.8,
    description: "97.9% of budget",
    icon: "ri-money-dollar-circle-line"
  },
  {
    id: "completion",
    name: "Project Completion",
    value: "78.5%",
    change: 3.2,
    description: "On track projects",
    icon: "ri-checkbox-circle-line"
  },
  {
    id: "savings",
    name: "Identified Savings",
    value: "$164.2M",
    change: 6.5,
    description: "Potential optimization",
    icon: "ri-line-chart-line"
  }
];

const mockDepartments: DepartmentMetric[] = [
  {
    id: 1,
    name: "Treasury",
    budget: 340.5,
    spending: 298.2,
    efficiency: 93,
    completedProjects: 12,
    totalProjects: 15,
    status: "on-track",
    icon: "ri-bank-line"
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
    icon: "ri-shield-line"
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
    icon: "ri-book-open-line"
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
    icon: "ri-road-map-line"
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
    icon: "ri-heart-pulse-line"
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
    icon: "ri-flashlight-line"
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
    icon: "ri-user-star-line"
  }
];

const mockBudgetAllocation: BudgetAllocationData[] = [
  { department: "Treasury", budget: 340.5, color: "#3B82F6" },
  { department: "Defense", budget: 850.2, color: "#EF4444" },
  { department: "Education", budget: 215.4, color: "#10B981" },
  { department: "Transportation", budget: 185.7, color: "#F97316" },
  { department: "Health & Human Services", budget: 425.8, color: "#8B5CF6" },
  { department: "Energy", budget: 120.3, color: "#FACC15" },
  { department: "Veterans Affairs", budget: 180.6, color: "#06B6D4" }
];

const mockEfficiencyTrend: EfficiencyTrendData[] = [
  { month: "Jan", treasury: 82, defense: 76, education: 85 },
  { month: "Feb", treasury: 84, defense: 77, education: 86 },
  { month: "Mar", treasury: 86, defense: 78, education: 86 },
  { month: "Apr", treasury: 87, defense: 78, education: 87 },
  { month: "May", treasury: 89, defense: 79, education: 87 },
  { month: "Jun", treasury: 91, defense: 80, education: 88 },
  { month: "Jul", treasury: 92, defense: 80, education: 88 },
  { month: "Aug", treasury: 93, defense: 81, education: 87 },
  { month: "Sep", treasury: 94, defense: 80, education: 88 },
  { month: "Oct", treasury: 94, defense: 82, education: 88 },
  { month: "Nov", treasury: 93, defense: 81, education: 87 },
  { month: "Dec", treasury: 93, defense: 81, education: 88 }
];

const mockProjectCompletion: ProjectCompletionData[] = [
  { quarter: "Q1", completed: 32, target: 35 },
  { quarter: "Q2", completed: 36, target: 40 },
  { quarter: "Q3", completed: 42, target: 45 },
  { quarter: "Q4", completed: 38, target: 42 }
];

const mockTopPerforming: TopPerformingDepartment[] = [
  { id: 1, name: "Treasury", score: 93, icon: "ri-bank-line", color: "#3B82F6" },
  { id: 5, name: "Health & Human Services", score: 89, icon: "ri-heart-pulse-line", color: "#8B5CF6" },
  { id: 3, name: "Education", score: 88, icon: "ri-book-open-line", color: "#10B981" },
  { id: 6, name: "Energy", score: 84, icon: "ri-flashlight-line", color: "#FACC15" },
  { id: 2, name: "Defense", score: 81, icon: "ri-shield-line", color: "#EF4444" },
  { id: 7, name: "Veterans Affairs", score: 78, icon: "ri-user-star-line", color: "#06B6D4" },
  { id: 4, name: "Transportation", score: 75, icon: "ri-road-map-line", color: "#F97316" }
];

// Waste analysis data
const mockWasteCategories = [
  { name: "Duplicate Services", value: 42.5, color: "#3B82F6" },
  { name: "Administrative Overhead", value: 35.8, color: "#EF4444" },
  { name: "Outdated Systems", value: 29.3, color: "#10B981" },
  { name: "Inefficient Processes", value: 38.7, color: "#F97316" },
  { name: "Improper Payments", value: 22.4, color: "#8B5CF6" },
  { name: "Unnecessary Expenditures", value: 18.6, color: "#FACC15" },
  { name: "Procurement Inefficiencies", value: 26.2, color: "#06B6D4" }
];

const mockWasteByDepartment = mockDepartments.map(dept => ({
  name: dept.name,
  value: +(dept.budget * (Math.random() * 0.06 + 0.02)).toFixed(1), // 2-8% of budget as waste
  percentage: +(Math.random() * 8 + 4).toFixed(1), // 4-12% waste percentage
  color: mockBudgetAllocation.find(b => b.department === dept.name)?.color || "#3B82F6"
}));

const mockWasteTrends = [
  { year: "2020", waste: 205.3, budget: 2350.5, percentage: 8.7 },
  { year: "2021", waste: 215.4, budget: 2420.3, percentage: 8.9 },
  { year: "2022", waste: 222.6, budget: 2510.7, percentage: 8.9 },
  { year: "2023", waste: 190.2, budget: 2580.4, percentage: 7.4 },
  { year: "2024", waste: 180.5, budget: 2620.8, percentage: 6.9 },
  { year: "2025", waste: 175.5, budget: 2670.0, percentage: 6.6 }
];

const mockWasteInterventions = [
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
  }
];

// Budget and financial data
const mockBudgetTrends = [
  { year: "2020", spending: 2245.8, budget: 2350.5 },
  { year: "2021", spending: 2356.3, budget: 2420.3 },
  { year: "2022", spending: 2489.7, budget: 2510.7 },
  { year: "2023", spending: 2552.5, budget: 2580.4 },
  { year: "2024", spending: 2580.2, budget: 2620.8 },
  { year: "2025", spending: 2615.0, budget: 2670.0 }
];

// Spending data
const mockSpendingCategories = [
  { name: "Personnel", value: 850.3, lastYear: 820.4, change: 3.6, color: "#3B82F6" },
  { name: "Operations", value: 620.5, lastYear: 590.2, change: 5.1, color: "#EF4444" },
  { name: "Infrastructure", value: 450.2, lastYear: 480.5, change: -6.3, color: "#10B981" },
  { name: "Research", value: 280.8, lastYear: 250.3, change: 12.2, color: "#F97316" },
  { name: "Grants", value: 350.4, lastYear: 340.1, change: 3.0, color: "#8B5CF6" },
  { name: "Technology", value: 190.7, lastYear: 170.2, change: 12.0, color: "#FACC15" },
  { name: "Administration", value: 110.3, lastYear: 130.5, change: -15.5, color: "#06B6D4" }
];

// Performance metrics
const mockPerformanceCategories = [
  { name: "Operational Efficiency", score: 76, target: 85, color: "#3B82F6" },
  { name: "Budget Utilization", score: 92, target: 95, color: "#10B981" },
  { name: "Program Effectiveness", score: 68, target: 80, color: "#F97316" },
  { name: "Resource Management", score: 81, target: 85, color: "#8B5CF6" },
  { name: "Service Delivery", score: 73, target: 82, color: "#EF4444" },
  { name: "Innovation & Improvement", score: 64, target: 75, color: "#FACC15" }
];

// Reports data
const mockReports = [
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

export async function registerRoutes(app: Express): Promise<Server> {
  // Get dashboard data - summary metrics, departments, charts data
  app.get("/api/dashboard", async (req, res) => {
    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dashboardData: DashboardData = {
        summaryMetrics: mockSummaryMetrics,
        departments: mockDepartments.slice(0, 5), // Just first 5 for dashboard
        budgetAllocations: mockBudgetAllocation.slice(0, 5),
        efficiencyTrends: mockEfficiencyTrend,
        projectCompletions: mockProjectCompletion,
        topPerforming: mockTopPerforming.slice(0, 5)
      };
      
      res.json(dashboardData);
    } catch (error) {
      console.error("Error in /api/dashboard:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });
  
  // API Routes for Summary Metrics
  app.get("/api/metrics/summary", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockSummaryMetrics);
    } catch (error) {
      console.error("Error in /api/metrics/summary:", error);
      res.status(500).json({ error: "Failed to fetch summary metrics" });
    }
  });
  
  // API Routes for Departments
  app.get("/api/departments", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const search = req.query.search as string || "";
      const department = req.query.department as string || "";
      
      let filteredDepartments = [...mockDepartments];
      
      if (search) {
        filteredDepartments = filteredDepartments.filter(
          dept => dept.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (department) {
        filteredDepartments = filteredDepartments.filter(
          dept => dept.name.toLowerCase().includes(department.toLowerCase())
        );
      }
      
      res.json(filteredDepartments);
    } catch (error) {
      console.error("Error in /api/departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  });
  
  app.get("/api/departments/:id", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const id = parseInt(req.params.id);
      const department = mockDepartments.find(dept => dept.id === id);
      
      if (!department) {
        return res.status(404).json({ error: `Department with ID ${id} not found` });
      }
      
      res.json(department);
    } catch (error) {
      console.error(`Error in /api/departments/${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to fetch department details" });
    }
  });
  
  app.get("/api/departments/top-performing", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const limit = parseInt(req.query.limit as string) || 5;
      const dateRange = req.query.dateRange as DateRangeType || "1y";
      
      // In a real app, we would filter by dateRange
      
      res.json(mockTopPerforming.slice(0, limit));
    } catch (error) {
      console.error("Error in /api/departments/top-performing:", error);
      res.status(500).json({ error: "Failed to fetch top performing departments" });
    }
  });
  
  // API Routes for Budget and Financial Data
  app.get("/api/charts/budget-allocation", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockBudgetAllocation);
    } catch (error) {
      console.error("Error in /api/charts/budget-allocation:", error);
      res.status(500).json({ error: "Failed to fetch budget allocations" });
    }
  });
  
  app.get("/api/budget/trends", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockBudgetTrends);
    } catch (error) {
      console.error("Error in /api/budget/trends:", error);
      res.status(500).json({ error: "Failed to fetch budget trends" });
    }
  });
  
  app.get("/api/budget/department/:department", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const departmentName = req.params.department;
      const department = mockDepartments.find(dept => 
        dept.name.toLowerCase() === departmentName.toLowerCase() || 
        dept.name.replace(/&/g, '').replace(/\s+/g, '-').toLowerCase() === departmentName.toLowerCase()
      );
      
      if (!department) {
        return res.status(404).json({ error: `Department ${departmentName} not found` });
      }
      
      const fiscalYear = req.query.fiscalYear as string || "2025";
      
      const budgetData = {
        department: department.name,
        fiscalYear,
        budget: department.budget,
        spending: department.spending,
        categories: {
          personnel: department.budget * 0.35,
          operations: department.budget * 0.25,
          infrastructure: department.budget * 0.15,
          research: department.budget * 0.10,
          grants: department.budget * 0.08,
          technology: department.budget * 0.05,
          administration: department.budget * 0.02
        },
        quarterlyData: [
          { quarter: "Q1", planned: department.budget * 0.25, actual: department.spending * 0.24 },
          { quarter: "Q2", planned: department.budget * 0.25, actual: department.spending * 0.26 },
          { quarter: "Q3", planned: department.budget * 0.25, actual: department.spending * 0.27 },
          { quarter: "Q4", planned: department.budget * 0.25, actual: department.spending * 0.23 }
        ]
      };
      
      res.json(budgetData);
    } catch (error) {
      console.error(`Error in /api/budget/department/${req.params.department}:`, error);
      res.status(500).json({ error: "Failed to fetch department budget data" });
    }
  });
  
  // API Routes for Performance Metrics
  app.get("/api/charts/efficiency-trend", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockEfficiencyTrend);
    } catch (error) {
      console.error("Error in /api/charts/efficiency-trend:", error);
      res.status(500).json({ error: "Failed to fetch efficiency trends" });
    }
  });
  
  app.get("/api/performance/metrics", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const department = req.query.department as string;
      
      // If a specific department is requested
      if (department) {
        const deptData = mockDepartments.find(d => 
          d.name.toLowerCase() === department.toLowerCase() || 
          d.name.replace(/&/g, '').replace(/\s+/g, '-').toLowerCase() === department.toLowerCase()
        );
        
        if (!deptData) {
          return res.status(404).json({ error: `Department ${department} not found` });
        }
        
        // Department performance metrics
        const metrics = {
          department: deptData.name,
          overall: deptData.efficiency,
          categories: mockPerformanceCategories.map(cat => ({
            ...cat,
            score: Math.floor(Math.random() * 15 + 65) // Generate random scores between 65-80
          })),
          trends: Array.from({ length: 12 }, (_, i) => {
            const month = new Date(2025, i, 1).toLocaleString('en-US', { month: 'short' });
            return {
              month,
              value: 70 + Math.floor(i * 1.5) + Math.floor(Math.random() * 5)
            };
          })
        };
        
        return res.json(metrics);
      }
      
      // Department performance data
      const departmentPerformance = mockDepartments.map(dept => ({
        name: dept.name,
        score: dept.efficiency,
        lastYearScore: dept.efficiency - Math.floor(Math.random() * 6 + 2),
        improvement: Math.floor(Math.random() * 6 + 2)
      }));
      
      // Return all departments performance data
      res.json({
        categories: mockPerformanceCategories,
        departments: departmentPerformance,
        trends: Array.from({ length: 12 }, (_, i) => {
          const month = new Date(2025, i, 1).toLocaleString('en-US', { month: 'short' });
          return {
            month,
            overall: 70 + Math.floor(i * 0.75) + Math.floor(Math.random() * 3)
          };
        })
      });
    } catch (error) {
      console.error("Error in /api/performance/metrics:", error);
      res.status(500).json({ error: "Failed to fetch performance metrics" });
    }
  });
  
  // API Routes for Projects
  app.get("/api/charts/project-completion", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockProjectCompletion);
    } catch (error) {
      console.error("Error in /api/charts/project-completion:", error);
      res.status(500).json({ error: "Failed to fetch project completion data" });
    }
  });
  
  app.get("/api/projects/department/:department", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const departmentName = req.params.department;
      const department = mockDepartments.find(dept => 
        dept.name.toLowerCase() === departmentName.toLowerCase() || 
        dept.name.replace(/&/g, '').replace(/\s+/g, '-').toLowerCase() === departmentName.toLowerCase()
      );
      
      if (!department) {
        return res.status(404).json({ error: `Department ${departmentName} not found` });
      }
      
      // Generate random projects for the department
      const projectStatuses = ["completed", "in-progress", "planned", "delayed"];
      const projects = Array.from({ length: department.totalProjects }, (_, i) => {
        const status = i < department.completedProjects ? "completed" : projectStatuses[Math.floor(Math.random() * 3) + 1];
        return {
          id: i + 1,
          name: `${department.name} Project ${i + 1}`,
          description: `A ${status === "completed" ? "completed" : "ongoing"} project for the ${department.name} Department`,
          budget: Math.floor(Math.random() * 50 + 10),
          spent: Math.floor(Math.random() * 50 + 5),
          status,
          startDate: "2025-01-15",
          endDate: status === "completed" ? "2025-03-20" : "2025-06-30",
          efficiency: Math.floor(Math.random() * 30 + 70)
        };
      });
      
      // Filter by status if provided
      const status = req.query.status as string;
      const filteredProjects = status ? projects.filter(p => p.status === status) : projects;
      
      res.json(filteredProjects);
    } catch (error) {
      console.error(`Error in /api/projects/department/${req.params.department}:`, error);
      res.status(500).json({ error: "Failed to fetch department projects" });
    }
  });
  
  // API Routes for Spending Analysis
  app.get("/api/spending/breakdown", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const fiscalYear = req.query.fiscalYear as string || "2025";
      const department = req.query.department as string;
      
      // If department is specified
      if (department) {
        const deptData = mockDepartments.find(d => 
          d.name.toLowerCase() === department.toLowerCase() || 
          d.name.replace(/&/g, '').replace(/\s+/g, '-').toLowerCase() === department.toLowerCase()
        );
        
        if (!deptData) {
          return res.status(404).json({ error: `Department ${department} not found` });
        }
        
        // Calculate proportional values based on the department's spending
        const deptTotal = deptData.spending;
        const deptCategories = mockSpendingCategories.map(cat => ({
          ...cat,
          value: +(deptTotal * (cat.value / 2850)).toFixed(1),
          lastYear: +(deptTotal * (cat.lastYear / 2850) * 0.95).toFixed(1)
        }));
        
        return res.json(deptCategories);
      }
      
      // Return full spending breakdown
      res.json(mockSpendingCategories);
    } catch (error) {
      console.error("Error in /api/spending/breakdown:", error);
      res.status(500).json({ error: "Failed to fetch spending breakdown" });
    }
  });
  
  app.get("/api/spending/trends", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
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
      
      res.json(monthlySpending);
    } catch (error) {
      console.error("Error in /api/spending/trends:", error);
      res.status(500).json({ error: "Failed to fetch spending trends" });
    }
  });
  
  app.get("/api/spending/comparison", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const requestedDeptParams = req.query.departments as string | string[];
      const fiscalYear = req.query.fiscalYear as string || "2025";
      
      // Handle both single string and array of strings
      const requestedDepartments = Array.isArray(requestedDeptParams) 
        ? requestedDeptParams 
        : requestedDeptParams ? [requestedDeptParams] : [];
      
      // If no departments specified, return error
      if (!requestedDepartments || requestedDepartments.length === 0) {
        return res.status(400).json({ error: "Please specify departments to compare" });
      }
      
      // Get department data
      const compareDepartments = mockDepartments.filter(dept => 
        requestedDepartments.some(d => 
          dept.name.toLowerCase() === d.toLowerCase() || 
          dept.name.replace(/&/g, '').replace(/\s+/g, '-').toLowerCase() === d.toLowerCase()
        )
      );
      
      if (compareDepartments.length === 0) {
        return res.status(404).json({ error: "No matching departments found" });
      }
      
      // Format comparison data
      const comparisonData = compareDepartments.map(dept => ({
        name: dept.name,
        budget: dept.budget,
        spending: dept.spending,
        efficiency: dept.efficiency,
        projectCompletion: (dept.completedProjects / dept.totalProjects) * 100,
        categories: {
          personnel: +(dept.spending * 0.35).toFixed(1),
          operations: +(dept.spending * 0.25).toFixed(1),
          infrastructure: +(dept.spending * 0.15).toFixed(1),
          research: +(dept.spending * 0.10).toFixed(1),
          grants: +(dept.spending * 0.08).toFixed(1),
          technology: +(dept.spending * 0.05).toFixed(1),
          administration: +(dept.spending * 0.02).toFixed(1)
        },
        metrics: {
          operationalEfficiency: Math.floor(Math.random() * 15 + 70),
          budgetUtilization: Math.floor(Math.random() * 10 + 85),
          programEffectiveness: Math.floor(Math.random() * 15 + 70),
          serviceDelivery: Math.floor(Math.random() * 15 + 70),
          innovation: Math.floor(Math.random() * 25 + 60)
        }
      }));
      
      res.json(comparisonData);
    } catch (error) {
      console.error("Error in /api/spending/comparison:", error);
      res.status(500).json({ error: "Failed to fetch spending comparison" });
    }
  });
  
  // API Routes for Waste Analysis
  app.get("/api/waste/by-department", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockWasteByDepartment);
    } catch (error) {
      console.error("Error in /api/waste/by-department:", error);
      res.status(500).json({ error: "Failed to fetch waste by department" });
    }
  });
  
  app.get("/api/waste/by-category", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockWasteCategories);
    } catch (error) {
      console.error("Error in /api/waste/by-category:", error);
      res.status(500).json({ error: "Failed to fetch waste by category" });
    }
  });
  
  app.get("/api/waste/trends", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      res.json(mockWasteTrends);
    } catch (error) {
      console.error("Error in /api/waste/trends:", error);
      res.status(500).json({ error: "Failed to fetch waste trends" });
    }
  });
  
  app.get("/api/waste/interventions", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const department = req.query.department as string;
      const category = req.query.category as string;
      
      let filteredInterventions = [...mockWasteInterventions];
      
      // Filter by department if specified
      if (department && department !== "all") {
        filteredInterventions = filteredInterventions.filter(i => 
          i.department.toLowerCase() === department.toLowerCase() || 
          i.department === "All"
        );
      }
      
      // Filter by category if specified
      if (category && category !== "all") {
        filteredInterventions = filteredInterventions.filter(i => 
          i.category.toLowerCase().includes(category.toLowerCase())
        );
      }
      
      res.json(filteredInterventions);
    } catch (error) {
      console.error("Error in /api/waste/interventions:", error);
      res.status(500).json({ error: "Failed to fetch waste interventions" });
    }
  });
  
  // API Routes for Reports
  app.get("/api/reports", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const type = req.query.type as string;
      
      // Filter by type if specified
      const filteredReports = type 
        ? mockReports.filter(r => r.type.toLowerCase() === type.toLowerCase()) 
        : mockReports;
      
      res.json(filteredReports);
    } catch (error) {
      console.error("Error in /api/reports:", error);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });
  
  app.get("/api/reports/:id", async (req, res) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API latency
      
      const id = parseInt(req.params.id);
      
      const mockReportsDetail = mockReports.map(report => ({
        ...report,
        content: `This is the detailed content of the ${report.title} report...`,
        charts: ["budget-allocation", "spending-trends", "department-comparison"],
        attachments: [`${report.title.toLowerCase().replace(/\s+/g, '-')}.pdf`, "data.xlsx"]
      }));
      
      const report = mockReportsDetail.find(r => r.id === id);
      
      if (!report) {
        return res.status(404).json({ error: `Report with ID ${id} not found` });
      }
      
      res.json(report);
    } catch (error) {
      console.error(`Error in /api/reports/${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to fetch report details" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
