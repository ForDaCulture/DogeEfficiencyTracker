import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangeType } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

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
  const dateRangeLabels = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '90d': 'Last quarter',
    '1y': 'Last year',
    'custom': 'Custom range'
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400 max-w-xl">
            {subtitle}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
            <div className="px-3 py-2 flex items-center">
              <i className="ri-calendar-line text-primary mr-2"></i>
              <Select
                value={dateRange}
                onValueChange={(value) => onDateRangeChange(value as DateRangeType)}
              >
                <SelectTrigger className="border-none shadow-none focus:ring-0 focus:ring-offset-0 p-0 h-auto min-w-[140px] font-medium">
                  <SelectValue>
                    {dateRangeLabels[dateRange]}
                  </SelectValue>
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
          
          <Button variant="outline" onClick={onExport} className="h-10 border-gray-200 dark:border-gray-800 shadow-sm">
            <i className="ri-download-line mr-2 text-primary"></i>
            Export Data
          </Button>
        </div>
      </div>
      <Separator className="bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}
