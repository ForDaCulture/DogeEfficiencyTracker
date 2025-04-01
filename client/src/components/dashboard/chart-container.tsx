import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onInfo?: () => void;
  onMoreOptions?: () => void;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  isLoading = false,
  onInfo,
  onMoreOptions,
  className
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <div className="flex space-x-2">
            {onInfo && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-700 p-1" 
                onClick={onInfo}
              >
                <i className="ri-information-line"></i>
              </Button>
            )}
            
            {onMoreOptions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <i className="ri-more-2-fill"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Download as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Download as PNG</DropdownMenuItem>
                  <DropdownMenuItem>View Full Screen</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        <div className="relative h-[300px] w-full">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-md" />
          ) : (
            children
          )}
        </div>
      </CardContent>
    </Card>
  );
}
