import React, { useState, useRef, useEffect } from 'react';
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

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m America First Helper. How can I assist you with understanding government efficiency data today?',
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
  
  return (
    <>
      {/* Floating button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <i className="ri-close-line text-xl" />
        ) : (
          <i className="ri-message-3-line text-xl" />
        )}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-80 sm:w-96 shadow-lg z-50 max-h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <i className="ri-government-line text-xl" />
              America First Helper
            </CardTitle>
          </CardHeader>
          
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
                        <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
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
                        <AvatarFallback className="bg-emerald-600 text-white">JD</AvatarFallback>
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
                placeholder="Type your message..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
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
        </Card>
      )}
    </>
  );
}