import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onInfo?: () => void;
  onMoreOptions?: () => void;
  className?: string;
  description?: string;
  dataSource?: string;
  legendContent?: React.ReactNode;
}

export function ChartContainer({
  title,
  children,
  isLoading = false,
  onInfo,
  onMoreOptions,
  className,
  description,
  dataSource,
  legendContent
}: ChartContainerProps) {
  return (
    <Card className={cn("shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden", className)}>
      <CardHeader className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </CardDescription>
            )}
          </div>

          <div className="flex gap-1">
            {dataSource && (
              <Badge variant="outline" className="text-xs bg-transparent">
                <span className="text-gray-500 dark:text-gray-400 mr-1">Source:</span> {dataSource}
              </Badge>
            )}
            
            {onInfo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 h-8 w-8" 
                      onClick={onInfo}
                    >
                      <i className="ri-information-line text-base"></i>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View information about this chart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {onMoreOptions && (
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 h-8 w-8"
                        >
                          <i className="ri-more-2-fill text-base"></i>
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Chart options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem>
                    <i className="ri-download-line mr-2 text-gray-500"></i>
                    <span>Export as CSV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="ri-image-line mr-2 text-gray-500"></i>
                    <span>Save as image</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <i className="ri-fullscreen-line mr-2 text-gray-500"></i>
                    <span>View in full screen</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="ri-refresh-line mr-2 text-gray-500"></i>
                    <span>Refresh data</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <i className="ri-share-line mr-2 text-gray-500"></i>
                    <span>Share chart</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {legendContent && (
          <div className="flex items-center justify-end gap-3 text-sm text-gray-500 flex-wrap mt-1">
            {legendContent}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="px-4 pb-4 pt-0">
        <div className="relative w-full" style={{ height: "320px" }}>
          {isLoading ? (
            <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Skeleton className="h-3/4 w-full rounded-lg" />
                <div className="flex space-x-4 mt-4 w-full justify-center">
                  <Skeleton className="h-2 w-16 rounded-full" />
                  <Skeleton className="h-2 w-20 rounded-full" />
                  <Skeleton className="h-2 w-14 rounded-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              {children}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
