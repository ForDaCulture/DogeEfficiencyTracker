import { 
  DashboardData, 
  DepartmentMetric, 
  SummaryMetric, 
  BudgetAllocationData,
  EfficiencyTrendData,
  ProjectCompletionData,
  TopPerformingDepartment,
  DateRangeType
} from "@shared/schema";

// Dashboard Data
export async function getDashboardData(params?: Record<string, string>): Promise<DashboardData> {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`/api/dashboard?${urlParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  
  return response.json();
}

// Summary Metrics
export async function getSummaryMetrics(dateRange?: DateRangeType): Promise<SummaryMetric[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/metrics/summary${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch summary metrics: ${response.statusText}`);
  }
  
  return response.json();
}

// Departments
export async function getDepartments(params?: Record<string, string>): Promise<DepartmentMetric[]> {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`/api/departments?${urlParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch departments: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getDepartmentById(id: number): Promise<DepartmentMetric> {
  const response = await fetch(`/api/departments/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch department with id ${id}: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getTopPerformingDepartments(dateRange?: DateRangeType, limit?: number): Promise<TopPerformingDepartment[]> {
  const params = new URLSearchParams();
  if (dateRange) params.append('dateRange', dateRange);
  if (limit) params.append('limit', limit.toString());
  
  const response = await fetch(`/api/departments/top-performing?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch top performing departments: ${response.statusText}`);
  }
  
  return response.json();
}

// Budget and Financial Data
export async function getBudgetAllocation(dateRange?: DateRangeType): Promise<BudgetAllocationData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/budget-allocation${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch budget allocation: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getBudgetTrends(dateRange?: DateRangeType): Promise<any[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/budget/trends${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch budget trends: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getBudgetByDepartment(department: string, fiscalYear?: string): Promise<any> {
  const params = new URLSearchParams();
  if (fiscalYear) params.append('fiscalYear', fiscalYear);
  
  const response = await fetch(`/api/budget/department/${department}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch budget for department ${department}: ${response.statusText}`);
  }
  
  return response.json();
}

// Performance Metrics
export async function getEfficiencyTrend(dateRange?: DateRangeType): Promise<EfficiencyTrendData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/efficiency-trend${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch efficiency trend: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getPerformanceMetrics(department?: string, dateRange?: DateRangeType): Promise<any[]> {
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  if (dateRange) params.append('dateRange', dateRange);
  
  const response = await fetch(`/api/performance/metrics?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch performance metrics: ${response.statusText}`);
  }
  
  return response.json();
}

// Projects
export async function getProjectCompletion(dateRange?: DateRangeType): Promise<ProjectCompletionData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/project-completion${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch project completion: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getProjectsByDepartment(department: string, status?: string): Promise<any[]> {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  
  const response = await fetch(`/api/projects/department/${department}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch projects for department ${department}: ${response.statusText}`);
  }
  
  return response.json();
}

// Spending Analysis
export async function getSpendingBreakdown(fiscalYear?: string, department?: string): Promise<any[]> {
  const params = new URLSearchParams();
  if (fiscalYear) params.append('fiscalYear', fiscalYear);
  if (department) params.append('department', department);
  
  const response = await fetch(`/api/spending/breakdown?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch spending breakdown: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getSpendingTrends(dateRange?: DateRangeType): Promise<any[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/spending/trends${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch spending trends: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getSpendingComparison(departments: string[], fiscalYear?: string): Promise<any[]> {
  const params = new URLSearchParams();
  departments.forEach(dept => params.append('departments', dept));
  if (fiscalYear) params.append('fiscalYear', fiscalYear);
  
  const response = await fetch(`/api/spending/comparison?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch spending comparison: ${response.statusText}`);
  }
  
  return response.json();
}

// Waste Analysis
export async function getWasteByDepartment(fiscalYear?: string): Promise<any[]> {
  const params = fiscalYear ? `?fiscalYear=${fiscalYear}` : '';
  const response = await fetch(`/api/waste/by-department${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch waste by department: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getWasteByCategory(fiscalYear?: string): Promise<any[]> {
  const params = fiscalYear ? `?fiscalYear=${fiscalYear}` : '';
  const response = await fetch(`/api/waste/by-category${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch waste by category: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getWasteTrends(dateRange?: DateRangeType): Promise<any[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/waste/trends${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch waste trends: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getWasteInterventions(department?: string, category?: string): Promise<any[]> {
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  if (category) params.append('category', category);
  
  const response = await fetch(`/api/waste/interventions?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch waste interventions: ${response.statusText}`);
  }
  
  return response.json();
}

// Reports
export async function getReports(type?: string): Promise<any[]> {
  const params = type ? `?type=${type}` : '';
  const response = await fetch(`/api/reports${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getReportById(id: number): Promise<any> {
  const response = await fetch(`/api/reports/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch report with id ${id}: ${response.statusText}`);
  }
  
  return response.json();
}
