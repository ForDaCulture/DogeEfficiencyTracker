import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DepartmentMetric } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface DepartmentTableProps {
  departments: DepartmentMetric[];
  isLoading: boolean;
}

export function DepartmentTable({ departments, isLoading }: DepartmentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(departments.length / itemsPerPage);
  
  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'needs-attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'On Track';
      case 'needs-attention':
        return 'Needs Attention';
      case 'at-risk':
        return 'At Risk';
      default:
        return status;
    }
  };
  
  const getIconElement = (iconName: string) => {
    return <i className={`${iconName}`}></i>;
  };
  
  return (
    <Card>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-900">
            Detailed Department Performance
          </h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
              <i className="ri-filter-3-line"></i>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
              <i className="ri-download-line"></i>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spending</TableHead>
              <TableHead>Efficiency</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : (
              paginatedDepartments.map((department) => (
                <TableRow key={department.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 bg-blue-100 text-blue-600">
                        <AvatarFallback className="bg-transparent">
                          {getIconElement(department.icon)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{department.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-gray-900">${department.budget}M</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-gray-900">${department.spending}M</div>
                    <div className={cn(
                      "text-xs",
                      department.spending <= department.budget ? "text-green-600" : "text-red-600"
                    )}>
                      {department.spending <= department.budget ? '+' : ''}{(((department.spending - department.budget) / department.budget) * 100).toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-gray-900">{department.efficiency}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-gray-900">{department.completedProjects}/{department.totalProjects}</div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      getStatusClass(department.status)
                    )}>
                      {getStatusLabel(department.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isLoading}
          >
            Next
          </Button>
        </div>
        
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, departments.length)}
              </span>{" "}
              of <span className="font-medium">{departments.length}</span> results
            </p>
          </div>
          
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
              >
                <span className="sr-only">Previous</span>
                <i className="ri-arrow-left-s-line"></i>
              </Button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2",
                    currentPage === i + 1 ? "bg-primary-50 text-primary-600" : ""
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={isLoading}
                >
                  {i + 1}
                </Button>
              ))}
              
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading}
              >
                <span className="sr-only">Next</span>
                <i className="ri-arrow-right-s-line"></i>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </Card>
  );
}
