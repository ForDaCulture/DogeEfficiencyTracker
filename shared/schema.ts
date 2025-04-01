import { pgTable, text, serial, integer, numeric, timestamp, array, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// DOGE API data types

export const metricTypes = ['budget', 'spending', 'completion', 'savings'] as const;
export type MetricType = typeof metricTypes[number];

export const departmentTypes = ['treasury', 'defense', 'education', 'transport', 'health'] as const;
export type DepartmentType = typeof departmentTypes[number];

export const dateRangeTypes = ['7d', '30d', '90d', '1y', 'custom'] as const;
export type DateRangeType = typeof dateRangeTypes[number];

export const statusTypes = ['on-track', 'needs-attention', 'at-risk'] as const;
export type StatusType = typeof statusTypes[number];

export interface DepartmentMetric {
  id: number;
  name: string;
  budget: number;
  spending: number;
  efficiency: number;
  completedProjects: number;
  totalProjects: number;
  status: StatusType;
  icon: string;
}

export interface SummaryMetric {
  id: string;
  name: string;
  value: string | number;
  change: number;
  description: string;
  icon: string;
}

export interface BudgetAllocationData {
  department: string;
  budget: number;
  color: string;
}

export interface EfficiencyTrendData {
  month: string;
  treasury: number;
  defense: number;
  education: number;
}

export interface ProjectCompletionData {
  quarter: string;
  completed: number;
  target: number;
}

export interface TopPerformingDepartment {
  id: number;
  name: string;
  score: number;
  icon: string;
  color: string;
}

export interface DashboardData {
  summaryMetrics: SummaryMetric[];
  departments: DepartmentMetric[];
  budgetAllocations: BudgetAllocationData[];
  efficiencyTrends: EfficiencyTrendData[];
  projectCompletions: ProjectCompletionData[];
  topPerforming: TopPerformingDepartment[];
}
