import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DepartmentType, MetricType, departmentTypes, metricTypes } from "@shared/schema";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  metricType: string;
  onMetricTypeChange: (value: string) => void;
  onMoreFilters: () => void;
}

export function FilterBar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  metricType,
  onMetricTypeChange,
  onMoreFilters
}: FilterBarProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
                placeholder="Search metrics, departments..."
              />
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Select
              value={department}
              onValueChange={onDepartmentChange}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="health">Health & Human Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <Select
              value={metricType}
              onValueChange={onMetricTypeChange}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Metrics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="budget">Budget Allocation</SelectItem>
                <SelectItem value="spending">Spending Efficiency</SelectItem>
                <SelectItem value="completion">Project Completion</SelectItem>
                <SelectItem value="savings">Cost Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="ml-auto">
            <Button
              variant="outline"
              onClick={onMoreFilters}
              className="w-full md:w-auto"
            >
              <i className="ri-filter-line mr-2"></i>
              More Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
