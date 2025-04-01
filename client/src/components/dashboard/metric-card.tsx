import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
  icon: React.ReactNode;
  iconBgClass?: string;
  progressValue?: number;
}

export function MetricCard({
  title,
  value,
  change,
  description,
  icon,
  iconBgClass = "bg-green-100 text-accent-500",
  progressValue
}: MetricCardProps) {
  const isPositive = change >= 0;
  const changeFormatted = `${isPositive ? '+' : ''}${change}${typeof change === 'number' && !String(change).includes('%') ? '%' : ''}`;
  
  // Determine progress color based on change direction
  const progressColor = isPositive ? "bg-green-500" : "bg-red-500";
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={cn("p-1.5 rounded-full", 
            isPositive ? "bg-green-100 text-green-600" : 
                       (change < 0 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"))}>
            {icon}
          </div>
        </div>
        <div className="flex items-baseline">
          <span className={cn("text-2xl font-bold font-mono", 
            isPositive ? "text-green-700" : 
                       (change < 0 ? "text-red-700" : "text-blue-700"))}>
            {value}
          </span>
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
        
        {/* Progress bar with color coding */}
        {progressValue !== undefined && (
          <div className="mt-3">
            <Progress 
              value={progressValue} 
              max={100} 
              className="h-1.5 bg-gray-100"
              style={{
                '--progress-background': isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
              } as React.CSSProperties}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
