import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangeType, dateRangeTypes } from "@shared/schema";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  dateRange: DateRangeType;
  onDateRangeChange: (value: DateRangeType) => void;
  onExport: () => void;
}

export function PageHeader({
  title,
  subtitle,
  dateRange,
  onDateRangeChange,
  onExport
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="inline-flex bg-white border border-gray-300 rounded-md">
            <div className="px-3 py-2 flex items-center">
              <i className="ri-calendar-line text-gray-500 mr-2"></i>
              <Select
                value={dateRange}
                onValueChange={(value) => onDateRangeChange(value as DateRangeType)}
              >
                <SelectTrigger className="border-none shadow-none focus:ring-0 focus:ring-offset-0 px-0">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last quarter</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button variant="outline" onClick={onExport}>
            <i className="ri-download-line mr-2"></i>
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
}
