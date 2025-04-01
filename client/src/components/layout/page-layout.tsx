import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar on window resize (if transitioning from mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 md:ml-64 bg-gray-50 dark:bg-gray-950 overflow-y-auto transition-all duration-300">
          <div className="container xl:max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}