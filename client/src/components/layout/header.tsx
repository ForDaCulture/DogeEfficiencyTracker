import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            className="md:hidden text-white hover:bg-primary-700 p-2"
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-xl"></i>
          </Button>
          <div className="flex items-center">
            <i className="ri-government-line text-2xl mr-2"></i>
            <h1 className="text-xl font-semibold tracking-tight">DOGE Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 hover:bg-primary-700 rounded-full" aria-label="Notifications">
                <i className="ri-notification-3-line"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">New report available</span>
                  <span className="text-xs text-gray-500">5 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Budget update</span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 hover:bg-primary-700 rounded-full" aria-label="Settings">
                <i className="ri-settings-3-line"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Theme</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="hidden md:flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
