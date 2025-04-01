import React, { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const SidebarItem = ({ href, icon, children, active }: SidebarItemProps) => {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150",
          active
            ? "text-primary bg-primary/10 dark:bg-primary/20"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        )}
      >
        <span className="mr-3 text-lg">{icon}</span>
        <span>{children}</span>
      </a>
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  
  // Close sidebar on location change for mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location, isMobile, isOpen, onClose]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 fixed inset-y-0 left-0 z-30 pt-16 transition-transform duration-300 ease-in-out",
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col overflow-y-auto scrollbar-thin">
          <nav className="flex-1 px-4 py-4">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-3">
                Main
              </h2>
              <ul className="space-y-1">
                <SidebarItem
                  href="/"
                  icon={<i className="ri-dashboard-line" />}
                  active={location === "/"}
                >
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  href="/reports"
                  icon={<i className="ri-file-chart-line" />}
                  active={location === "/reports"}
                >
                  Reports
                </SidebarItem>
                <SidebarItem
                  href="/departments"
                  icon={<i className="ri-building-line" />}
                  active={location === "/departments"}
                >
                  Departments
                </SidebarItem>
                <SidebarItem
                  href="/budgets"
                  icon={<i className="ri-funds-line" />}
                  active={location === "/budgets"}
                >
                  Budgets
                </SidebarItem>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-3">
                Analytics
              </h2>
              <ul className="space-y-1">
                <SidebarItem
                  href="/performance"
                  icon={<i className="ri-line-chart-line" />}
                  active={location === "/performance"}
                >
                  Performance
                </SidebarItem>
                <SidebarItem
                  href="/spending-analysis"
                  icon={<i className="ri-pie-chart-line" />}
                  active={location === "/spending-analysis"}
                >
                  Spending Analysis
                </SidebarItem>
                <SidebarItem
                  href="/comparison"
                  icon={<i className="ri-bar-chart-grouped-line" />}
                  active={location === "/comparison"}
                >
                  Comparison
                </SidebarItem>
                <SidebarItem
                  href="/waste-analysis"
                  icon={<i className="ri-scales-line" />}
                  active={location === "/waste-analysis"}
                >
                  Waste Analysis
                </SidebarItem>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-3">
                Support
              </h2>
              <ul className="space-y-1">
                <SidebarItem
                  href="/help"
                  icon={<i className="ri-question-line" />}
                  active={location === "/help"}
                >
                  Help & FAQ
                </SidebarItem>
                <SidebarItem
                  href="/documentation"
                  icon={<i className="ri-file-text-line" />}
                  active={location === "/documentation"}
                >
                  Documentation
                </SidebarItem>
              </ul>
            </div>
          </nav>
          
          <Separator className="my-1 opacity-50" />
          
          <div className="p-4">
            <a
              href="https://api.doge.gov/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <i className="ri-book-open-line mr-2 text-lg"></i>
              <span>API Documentation</span>
            </a>
          </div>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-20"
          onClick={onClose}
        />
      )}
    </>
  );
}
