import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  SummaryMetric, 
  DepartmentMetric, 
  BudgetAllocationData, 
  EfficiencyTrendData, 
  ProjectCompletionData, 
  TopPerformingDepartment,
  DashboardData
} from "@shared/schema";

// Mock data for development
const mockSummaryMetrics: SummaryMetric[] = [
  {
    id: "total-savings",
    name: "Total Savings",
    value: "$147.3M",
    change: 12.3,
    description: "vs. previous period",
    icon: "ri-money-dollar-circle-line"
  },
  {
    id: "budget-utilization",
    name: "Budget Utilization",
    value: "89.4%",
    change: 3.7,
    description: "of allocated budget used effectively",
    icon: "ri-pie-chart-line"
  },
  {
    id: "project-completion",
    name: "Project Completion",
    value: "76.2%",
    change: -2.1,
    description: "projects completed on schedule",
    icon: "ri-task-line"
  },
  {
    id: "efficiency-score",
    name: "Efficiency Score",
    value: "83/100",
    change: 5,
    description: "overall efficiency rating",
    icon: "ri-speed-line"
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
  { department: "Treasury", budget: 340.5, color: "blue" },
  { department: "Defense", budget: 850.2, color: "red" },
  { department: "Education", budget: 215.4, color: "green" },
  { department: "Transportation", budget: 185.7, color: "orange" },
  { department: "Health", budget: 425.8, color: "purple" }
];

const mockEfficiencyTrend: EfficiencyTrendData[] = [
  { month: "Jan", treasury: 82, defense: 74, education: 85 },
  { month: "Feb", treasury: 85, defense: 76, education: 87 },
  { month: "Mar", treasury: 86, defense: 78, education: 88 },
  { month: "Apr", treasury: 89, defense: 77, education: 90 },
  { month: "May", treasury: 91, defense: 79, education: 92 },
  { month: "Jun", treasury: 93, defense: 81, education: 88 }
];

const mockProjectCompletion: ProjectCompletionData[] = [
  { quarter: "Q1", completed: 12, target: 15 },
  { quarter: "Q2", completed: 18, target: 20 },
  { quarter: "Q3", completed: 24, target: 25 },
  { quarter: "Q4", completed: 28, target: 30 }
];

const mockTopPerforming: TopPerformingDepartment[] = [
  { id: 1, name: "Treasury", score: 93, icon: "ri-bank-line", color: "blue" },
  { id: 3, name: "Education", score: 88, icon: "ri-book-open-line", color: "green" },
  { id: 5, name: "Health", score: 89, icon: "ri-heart-pulse-line", color: "purple" },
  { id: 6, name: "Energy", score: 84, icon: "ri-flashlight-line", color: "yellow" },
  { id: 2, name: "Defense", score: 81, icon: "ri-shield-line", color: "red" }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Get dashboard data - summary metrics, departments, charts data
  app.get("/api/dashboard", async (req, res) => {
    try {
      const dashboardData: DashboardData = {
        summaryMetrics: mockSummaryMetrics,
        departments: mockDepartments,
        budgetAllocations: mockBudgetAllocation,
        efficiencyTrends: mockEfficiencyTrend,
        projectCompletions: mockProjectCompletion,
        topPerforming: mockTopPerforming
      };
      
      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get summary metrics
  app.get("/api/metrics/summary", async (req, res) => {
    try {
      res.json(mockSummaryMetrics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get departments data
  app.get("/api/departments", async (req, res) => {
    try {
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
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get budget allocation data
  app.get("/api/charts/budget-allocation", async (req, res) => {
    try {
      res.json(mockBudgetAllocation);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get efficiency trend data
  app.get("/api/charts/efficiency-trend", async (req, res) => {
    try {
      res.json(mockEfficiencyTrend);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get project completion data
  app.get("/api/charts/project-completion", async (req, res) => {
    try {
      res.json(mockProjectCompletion);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get top performing departments
  app.get("/api/departments/top-performing", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      res.json(mockTopPerforming.slice(0, limit));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
