import React, { useState, useRef, useEffect, createContext, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantContextType {
  openAssistant: () => void;
  openAssistantWithQuery: (query: string) => void;
}

interface AIAssistantProviderProps {
  children: ReactNode;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
}

// Main component that renders the UI and also provides the context
export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m The Bald Eagle. How can I assist you with understanding government efficiency data today?',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Functions for the context provider
  const openAssistant = () => {
    setIsOpen(true);
    setShowWelcomeBubble(false);
    setIsMinimized(false);
  };
  
  const openAssistantWithQuery = (initialQuery: string) => {
    openAssistant();
    
    // Simulate user entering this query
    const userMessage: Message = {
      role: 'user',
      content: initialQuery,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process the query
    (async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/ai/assistant', {
          method: 'POST',
          body: JSON.stringify({ query: initialQuery }),
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        toast({
          title: 'Error',
          description: 'Failed to get a response from the assistant.',
          variant: 'destructive'
        });
        
        const errorMessage: Message = {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try again later.',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    })();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        body: JSON.stringify({ query: userMessage.content }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the assistant.',
        variant: 'destructive'
      });
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to hide welcome bubble after 5 seconds
  useEffect(() => {
    if (showWelcomeBubble) {
      const timer = setTimeout(() => {
        setShowWelcomeBubble(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeBubble]);

  // Set up the context value 
  const contextValue: AIAssistantContextType = {
    openAssistant,
    openAssistantWithQuery
  };

  return (
    <AIAssistantContext.Provider value={contextValue}>
      {/* Floating button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg z-50 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcomeBubble(false);
          setIsMinimized(false);
        }}
      >
        {isOpen ? (
          <i className="ri-close-line text-xl" />
        ) : (
          <i className="ri-customer-service-line text-xl" />
        )}
      </Button>
      
      {/* Welcome Bubble */}
      {!isOpen && showWelcomeBubble && (
        <div className="fixed bottom-20 right-6 max-w-[250px] z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg animate-bounce-slow">
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-blue-600 border-r-[8px] border-r-transparent"></div>
          <p className="font-bold">Hello, America's Bald Eagle Here to Help!</p>
          <p className="text-sm mt-1">Click me for assistance with government data!</p>
        </div>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-80 sm:w-96 shadow-lg z-50 max-h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-lg">
                <i className="ri-eagle-fill text-xl" />
                The Bald Eagle
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white hover:bg-blue-600"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <i className="ri-fullscreen-line" /> : <i className="ri-subtract-line" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="ri-close-line" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-3 flex-1 overflow-y-auto max-h-[400px]">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[85%] ${
                          message.role === 'user'
                            ? 'flex-row-reverse'
                            : 'flex-row'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-blue-700 text-white">🦅</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`rounded-lg p-3 text-sm ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                          <div className={`text-xs mt-1 ${
                            message.role === 'user'
                              ? 'text-primary-foreground/80'
                              : 'text-muted-foreground'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        {message.role === 'user' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-emerald-600 text-white">YOU</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask about government spending..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="bg-blue-700 hover:bg-blue-800"
                    disabled={isLoading || !query.trim()}
                  >
                    {isLoading ? (
                      <i className="ri-loader-4-line animate-spin" />
                    ) : (
                      <i className="ri-send-plane-fill" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </AIAssistantContext.Provider>
  );
}