import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 md:ml-64 bg-gray-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}