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
import { useTheme } from "@/hooks/use-theme";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-primary dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className={`md:hidden text-base ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
            }`}
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-xl"></i>
          </Button>
          
          <Link href="/" className="flex items-center gap-2.5">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm ${
              scrolled ? 'bg-primary text-white' : 'bg-white text-primary'
            }`}>
              <i className="ri-government-line text-xl"></i>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-lg font-bold leading-tight tracking-tight ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}>
                DOGE Dashboard
              </h1>
              <p className={`text-xs tracking-wide ${
                scrolled ? 'text-muted-foreground' : 'text-white/80'
              }`}>Department of Government Efficiency</p>
            </div>
          </Link>
        </div>
        
        {/* Search Bar - Appears on medium screens and larger by default */}
        <div className="hidden md:block mx-4 lg:mx-8 max-w-md flex-1">
          <div className="relative">
            <i className={`ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 ${
              scrolled ? 'text-gray-400 dark:text-gray-500' : 'text-white/70'
            }`}></i>
            <Input
              placeholder="Search dashboards, metrics, or reports..." 
              className={`pl-9 w-full shadow-sm ${
                scrolled 
                  ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                  : 'bg-white/10 border-white/20 placeholder-white/70 text-white focus:bg-white/20'
              }`}
            />
          </div>
        </div>
        
        {/* Search Bar - For mobile, togglable */}
        {searchActive && (
          <div className="absolute inset-x-0 top-full left-0 right-0 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md md:hidden z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
              <Input
                placeholder="Search..." 
                className="pl-9 w-full bg-gray-50 dark:bg-gray-800/50"
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
          
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`hidden sm:flex ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            <i className={`text-xl ${theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
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
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">2</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="h-auto py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800">
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">New Report Available</span>
                    <span className="text-xs text-gray-500">5m ago</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">The Q2 Treasury Waste Analysis report is ready for review.</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-auto py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800">
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Budget Alert</span>
                    <span className="text-xs text-gray-500">1h ago</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Defense Department exceeded quarterly budget allocation by 3.2%.</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800">
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-user-settings-line mr-2"></i>
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-equalizer-line mr-2"></i>
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
                <i className={`mr-2 ${theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-question-line mr-2"></i>
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                <i className="ri-logout-box-line mr-2"></i>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-colors duration-150 ${
                scrolled 
                  ? 'hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'hover:bg-white/10'
              }`}>
                <Avatar className={`h-8 w-8 ${scrolled ? 'border-2 border-gray-200 dark:border-gray-700' : 'border-2 border-white/30'}`}>
                  <AvatarFallback className="bg-primary text-white font-medium text-sm">JD</AvatarFallback>
                </Avatar>
                <span className={`text-sm font-medium ${
                  scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                }`}>John Doe</span>
                <i className={`ri-arrow-down-s-line ${
                  scrolled ? 'text-gray-600 dark:text-gray-400' : 'text-white/80'
                }`}></i>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2.5">
                <i className="ri-user-line mr-2 text-lg"></i>
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2.5">
                <i className="ri-settings-3-line mr-2 text-lg"></i>
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2.5">
                <i className="ri-dashboard-line mr-2 text-lg"></i>
                <span>My Dashboards</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 py-2.5">
                <i className="ri-logout-box-line mr-2 text-lg"></i>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile-only avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="md:hidden h-8 w-8 cursor-pointer border-2 border-white/80 dark:border-gray-700">
                <AvatarFallback className="bg-primary text-white text-sm">JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 md:hidden">
              <div className="flex items-center gap-2 p-2">
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
                <i className={`mr-2 ${theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-user-line mr-2"></i>
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="ri-settings-3-line mr-2"></i>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                <i className="ri-logout-box-line mr-2"></i>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
