import { pgTable, text, serial, integer, numeric, timestamp, array, boolean, varchar, jsonb, pgEnum, uniqueIndex, index, decimal, date, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enum for user roles
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'analyst']);

// Enum for metrics
export const metricTypesEnum = pgEnum('metric_type', ['budget', 'spending', 'completion', 'savings']);
export const metricTypes = ['budget', 'spending', 'completion', 'savings'] as const;
export type MetricType = typeof metricTypes[number];

// Enum for departments
export const departmentTypesEnum = pgEnum('department_type', ['treasury', 'defense', 'education', 'transport', 'health', 'energy', 'veterans']);
export const departmentTypes = ['treasury', 'defense', 'education', 'transport', 'health', 'energy', 'veterans'] as const;
export type DepartmentType = typeof departmentTypes[number];

// Enum for date ranges
export const dateRangeTypesEnum = pgEnum('date_range_type', ['7d', '30d', '90d', '1y', 'custom']);
export const dateRangeTypes = ['7d', '30d', '90d', '1y', 'custom'] as const;
export type DateRangeType = typeof dateRangeTypes[number];

// Enum for statuses
export const statusTypesEnum = pgEnum('status_type', ['on-track', 'needs-attention', 'at-risk']);
export const statusTypes = ['on-track', 'needs-attention', 'at-risk'] as const;
export type StatusType = typeof statusTypes[number];

// Enhanced Users schema with security features
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  role: userRoleEnum("role").default('user').notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  passwordResetToken: varchar("password_reset_token", { length: 255 }),
  passwordResetExpires: timestamp("password_reset_expires"),
});

// Insert user schema with validation
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    role: true,
  })
  .extend({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User sessions for tracking logged-in sessions
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isRevoked: boolean("is_revoked").default(false).notNull(),
});

// User activity logs for security auditing
export const userActivityLogs = pgTable("user_activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  action: varchar("action", { length: 100 }).notNull(),
  details: jsonb("details"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => {
  return {
    userIdIdx: index("user_activity_logs_user_id_idx").on(table.userId),
    timestampIdx: index("user_activity_logs_timestamp_idx").on(table.timestamp),
  };
});

// User preferences for customizing dashboard views
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  dashboardLayout: jsonb("dashboard_layout"),
  theme: varchar("theme", { length: 50 }).default('light'),
  favoriteCharts: jsonb("favorite_charts"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    userIdIdx: index("user_preferences_user_id_idx").on(table.userId),
  };
});

// Saved reports that users can generate and download
export const savedReports = pgTable("saved_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 100 }).notNull(),
  parameters: jsonb("parameters"),
  fileUrl: varchar("file_url", { length: 255 }),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
}, (table) => {
  return {
    userIdIdx: index("saved_reports_user_id_idx").on(table.userId),
    typeIdx: index("saved_reports_type_idx").on(table.type),
  };
});

// Department information stored in the database
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  budget: numeric("budget", { precision: 15, scale: 2 }).notNull(),
  spending: numeric("spending", { precision: 15, scale: 2 }).notNull(),
  efficiency: integer("efficiency").notNull(),
  completedProjects: integer("completed_projects").notNull(),
  totalProjects: integer("total_projects").notNull(),
  status: statusTypesEnum("status").notNull(),
  icon: varchar("icon", { length: 100 }).notNull(),
  headcount: integer("headcount"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    nameIdx: index("departments_name_idx").on(table.name),
  };
});

// Budget allocations for visualizations
export const budgetAllocations = pgTable("budget_allocations", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").references(() => departments.id, { onDelete: 'cascade' }).notNull(),
  fiscalYear: varchar("fiscal_year", { length: 10 }).notNull(),
  budget: numeric("budget", { precision: 15, scale: 2 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    departmentYearIdx: index("budget_allocations_dept_year_idx").on(table.departmentId, table.fiscalYear),
    uniqueDeptYear: unique("unique_dept_year").on(table.departmentId, table.fiscalYear),
  };
});

// Wasted spending metrics by department
export const wasteMetrics = pgTable("waste_metrics", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").references(() => departments.id, { onDelete: 'cascade' }).notNull(),
  fiscalYear: varchar("fiscal_year", { length: 10 }).notNull(),
  wasteAmount: numeric("waste_amount", { precision: 15, scale: 2 }).notNull(),
  percentage: numeric("percentage", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    departmentYearIdx: index("waste_metrics_dept_year_idx").on(table.departmentId, table.fiscalYear),
    uniqueDeptYear: unique("waste_unique_dept_year").on(table.departmentId, table.fiscalYear),
  };
});

// Waste categories
export const wasteCategories = pgTable("waste_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waste by category
export const wasteByCategoryMetrics = pgTable("waste_by_category_metrics", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => wasteCategories.id, { onDelete: 'cascade' }).notNull(),
  fiscalYear: varchar("fiscal_year", { length: 10 }).notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    categoryYearIdx: index("waste_by_category_cat_year_idx").on(table.categoryId, table.fiscalYear),
    uniqueCategoryYear: unique("waste_unique_cat_year").on(table.categoryId, table.fiscalYear),
  };
});

// Waste reduction interventions
export const wasteInterventions = pgTable("waste_interventions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  potentialSavings: numeric("potential_savings", { precision: 15, scale: 2 }).notNull(),
  implementationCost: numeric("implementation_cost", { precision: 15, scale: 2 }).notNull(),
  timeframe: varchar("timeframe", { length: 100 }).notNull(),
  complexity: varchar("complexity", { length: 50 }).notNull(),
  roi: numeric("roi", { precision: 5, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    departmentIdx: index("waste_interventions_dept_idx").on(table.department),
    categoryIdx: index("waste_interventions_category_idx").on(table.category),
  };
});

// API Logs for monitoring API usage and rate limiting
export const apiLogs = pgTable("api_logs", {
  id: serial("id").primaryKey(),
  endpoint: varchar("endpoint", { length: 255 }).notNull(),
  method: varchar("method", { length: 10 }).notNull(),
  statusCode: integer("status_code").notNull(),
  responseTime: integer("response_time"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => {
  return {
    endpointIdx: index("api_logs_endpoint_idx").on(table.endpoint),
    timestampIdx: index("api_logs_timestamp_idx").on(table.timestamp),
  };
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type WasteMetric = typeof wasteMetrics.$inferSelect;
export type WasteCategory = typeof wasteCategories.$inferSelect;
export type WasteIntervention = typeof wasteInterventions.$inferSelect;
export type SavedReport = typeof savedReports.$inferSelect;

// Interface definitions for API data

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
  headcount?: number;
  description?: string;
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
