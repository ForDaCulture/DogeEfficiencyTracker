import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const isNeutral = change === 0;
  const changeFormatted = `${isPositive && !isNeutral ? '+' : ''}${change}${typeof change === 'number' && !String(change).includes('%') ? '%' : ''}`;
  
  // Get color based on change
  const getChangeColor = () => {
    if (isNeutral) return { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400" };
    if (isPositive) return { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400" };
    return { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400" };
  };
  
  const changeColor = getChangeColor();
  
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-0">
        <div className="relative">
          {/* Colored accent top border */}
          <div 
            className={cn(
              "absolute top-0 left-0 right-0 h-1",
              isPositive ? "bg-emerald-500 dark:bg-emerald-400" : 
                         (isNeutral ? "bg-gray-400 dark:bg-gray-500" : "bg-red-500 dark:bg-red-400")
            )}
          />
          
          {/* Card content */}
          <div className="p-5 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBgClass)}>
                {icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900 dark:text-white mr-2">
                  {value}
                </span>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span 
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-semibold", 
                          changeColor.bg, changeColor.text
                        )}
                      >
                        {changeFormatted}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change from previous period</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Progress indicator */}
              {progressValue !== undefined && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{progressValue}%</span>
                  </div>
                  <Progress 
                    value={progressValue} 
                    max={100} 
                    className="h-1.5 bg-gray-100 dark:bg-gray-800"
                    style={{
                      '--progress-background': isPositive 
                        ? 'rgb(16, 185, 129)' 
                        : (isNeutral ? 'rgb(156, 163, 175)' : 'rgb(239, 68, 68)')
                    } as React.CSSProperties}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
