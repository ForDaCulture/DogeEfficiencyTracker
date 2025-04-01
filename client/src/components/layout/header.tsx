import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-200 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white shadow-md' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className={`md:hidden ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
            }`}
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-xl"></i>
          </Button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
              scrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            }`}>
              <i className="ri-government-line text-lg"></i>
            </div>
            <h1 className={`text-xl font-semibold tracking-tight ${
              !scrolled && 'text-white'
            }`}>
              DOGE
              <span className="hidden sm:inline"> Dashboard</span>
            </h1>
          </Link>
        </div>
        
        {/* Search Bar - Appears on medium screens and larger by default */}
        <div className="hidden md:block mx-4 lg:mx-8 max-w-md flex-1">
          <div className="relative">
            <i className={`ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 ${
              scrolled ? 'text-gray-400' : 'text-white/70'
            }`}></i>
            <Input
              placeholder="Search dashboards, metrics, or reports..." 
              className={`pl-9 w-full ${
                scrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-white/10 border-white/20 placeholder-white/70 text-white focus:bg-white/20'
              }`}
            />
          </div>
        </div>
        
        {/* Search Bar - For mobile, togglable */}
        {searchActive && (
          <div className="absolute inset-x-0 top-full left-0 right-0 p-4 bg-white dark:bg-gray-900 shadow-md md:hidden z-50">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <Input
                placeholder="Search..." 
                className="pl-9 w-full bg-gray-100 dark:bg-gray-800"
                autoFocus
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            className={`md:hidden ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setSearchActive(!searchActive)}
            aria-label="Search"
          >
            <i className="ri-search-line text-xl"></i>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className={`relative ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
                }`} 
                aria-label="Notifications"
              >
                <i className="ri-notification-3-line text-xl"></i>
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="h-auto py-3 cursor-pointer">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">New Report Available</span>
                    <span className="text-xs text-gray-500">5m ago</span>
                  </div>
                  <span className="text-sm text-gray-600">The Q2 Treasury Waste Analysis report is ready for review.</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-auto py-3 cursor-pointer">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Budget Alert</span>
                    <span className="text-xs text-gray-500">1h ago</span>
                  </div>
                  <span className="text-sm text-gray-600">Defense Department exceeded quarterly budget allocation by 3.2%.</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className={`${
                  scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
                }`} 
                aria-label="Settings"
              >
                <i className="ri-settings-3-line text-xl"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-user-settings-line mr-2"></i>
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-equalizer-line mr-2"></i>
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-palette-line mr-2"></i>
                <span>Theme</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-question-line mr-2"></i>
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <i className="ri-logout-box-line mr-2"></i>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={`hidden md:flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer ${
                scrolled ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'hover:bg-white/10'
              }`}>
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">JD</AvatarFallback>
                </Avatar>
                <span className={`text-sm font-medium ${
                  !scrolled && 'text-white'
                }`}>John Doe</span>
                <i className={`ri-arrow-down-s-line ${
                  !scrolled && 'text-white'
                }`}></i>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-user-line mr-2"></i>
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-settings-3-line mr-2"></i>
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-dashboard-line mr-2"></i>
                <span>My Dashboards</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <i className="ri-logout-box-line mr-2"></i>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile-only avatar */}
          <Avatar className="md:hidden h-8 w-8 border-2 border-white">
            <AvatarFallback className="bg-blue-500 text-white text-sm">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
