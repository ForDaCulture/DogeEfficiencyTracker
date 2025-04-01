import { 
  DashboardData, 
  DepartmentMetric, 
  SummaryMetric, 
  BudgetAllocationData,
  EfficiencyTrendData,
  ProjectCompletionData,
  TopPerformingDepartment
} from "@shared/schema";

export async function getDashboardData(params?: Record<string, string>): Promise<DashboardData> {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`/api/dashboard?${urlParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getSummaryMetrics(dateRange?: string): Promise<SummaryMetric[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/metrics/summary${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch summary metrics: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getDepartments(params?: Record<string, string>): Promise<DepartmentMetric[]> {
  const urlParams = new URLSearchParams(params);
  const response = await fetch(`/api/departments?${urlParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch departments: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getBudgetAllocation(dateRange?: string): Promise<BudgetAllocationData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/budget-allocation${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch budget allocation: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getEfficiencyTrend(dateRange?: string): Promise<EfficiencyTrendData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/efficiency-trend${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch efficiency trend: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getProjectCompletion(dateRange?: string): Promise<ProjectCompletionData[]> {
  const params = dateRange ? `?dateRange=${dateRange}` : '';
  const response = await fetch(`/api/charts/project-completion${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch project completion: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getTopPerformingDepartments(dateRange?: string, limit?: number): Promise<TopPerformingDepartment[]> {
  const params = new URLSearchParams();
  if (dateRange) params.append('dateRange', dateRange);
  if (limit) params.append('limit', limit.toString());
  
  const response = await fetch(`/api/departments/top-performing?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch top performing departments: ${response.statusText}`);
  }
  
  return response.json();
}
