import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TopPerformingDepartment } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface TopPerformingProps {
  departments: TopPerformingDepartment[];
  isLoading: boolean;
}

export function TopPerforming({ departments, isLoading }: TopPerformingProps) {
  const getIconElement = (iconName: string) => {
    return <i className={`${iconName}`}></i>;
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-gray-900">Top Performing Departments</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <i className="ri-more-2-fill"></i>
          </Button>
        </div>
        
        <div>
          <div className="space-y-5">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-3" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <div className="mt-2 pt-1">
                    <Skeleton className="h-2 w-full rounded" />
                  </div>
                </div>
              ))
            ) : (
              departments.map((department) => (
                <div key={department.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className={`w-8 h-8 rounded-full bg-${department.color}-100 mr-3`}>
                        <AvatarFallback className="bg-transparent text-blue-600">
                          {getIconElement(department.icon)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">{department.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{department.score}%</span>
                  </div>
                  <div className="mt-2 relative pt-1">
                    <Progress 
                      value={department.score} 
                      className="h-2" 
                      style={{
                        "--indicator-color": `var(--${department.color}-500)`
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-6">
            <Button variant="link" className="text-sm font-medium text-primary-600 hover:text-primary-700 px-0">
              View Full Report <i className="ri-arrow-right-line ml-1 align-middle"></i>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
