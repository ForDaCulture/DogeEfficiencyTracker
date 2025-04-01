import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
  icon: React.ReactNode;
  iconBgClass?: string;
}

export function MetricCard({
  title,
  value,
  change,
  description,
  icon,
  iconBgClass = "bg-green-100 text-accent-500"
}: MetricCardProps) {
  const isPositive = change >= 0;
  const changeFormatted = `${isPositive ? '+' : ''}${change}${typeof change === 'number' && !String(change).includes('%') ? '%' : ''}`;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={cn("p-1.5 rounded-full", iconBgClass)}>
            {icon}
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold font-mono">{value}</span>
          <span 
            className={cn(
              "ml-2 text-sm font-medium", 
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {changeFormatted}
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500">{description}</div>
      </CardContent>
    </Card>
  );
}
