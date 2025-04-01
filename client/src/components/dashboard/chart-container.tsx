import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
    <Card className={cn("shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <div className="flex space-x-1">
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
                    <p>View information</p>
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
                      <p>More options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <i className="ri-download-line mr-2 text-gray-500"></i>
                    <span>Download as CSV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="ri-image-line mr-2 text-gray-500"></i>
                    <span>Download as PNG</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <i className="ri-fullscreen-line mr-2 text-gray-500"></i>
                    <span>View Full Screen</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="ri-share-line mr-2 text-gray-500"></i>
                    <span>Share</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        <div className="relative h-[320px] w-full p-4">
          {isLoading ? (
            <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
              <Skeleton className="h-4/5 w-full rounded-lg" />
              <div className="flex space-x-2">
                <Skeleton className="h-2 w-10 rounded-full" />
                <Skeleton className="h-2 w-12 rounded-full" />
                <Skeleton className="h-2 w-8 rounded-full" />
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </CardContent>
    </Card>
  );
}
