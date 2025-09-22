import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Sparkles, Code, BookOpen, HelpCircle, Minimize2, Maximize2 } from 'lucide-react';

const ChatHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI tutor. How can I help you today? 🤖",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickPrompts = [
    { icon: Code, text: "Explain this code", category: "Code Help" },
    { icon: BookOpen, text: "What should I learn next?", category: "Learning Path" },
    { icon: HelpCircle, text: "I'm stuck on this concept", category: "Help" },
    { icon: Sparkles, text: "Generate practice questions", category: "Practice" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "That's a great question! Let me help you with that. Here's a detailed explanation...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
          variant="hero"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <Card className="shadow-2xl border-2 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <CardTitle className="text-lg font-semibold">AI Tutor</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            {/* Quick Prompts */}
            <div className="p-4 border-b bg-secondary/50">
              <p className="text-sm font-medium mb-3">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="card"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className="justify-start text-xs h-auto p-2"
                  >
                    <prompt.icon className="w-3 h-3 mr-1" />
                    <span className="truncate">{prompt.text}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Code Preview Area */}
            <div className="p-4 border-t bg-muted/50">
              <div className="bg-card rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    <Code className="w-3 h-3 mr-1" />
                    Code Example
                  </Badge>
                </div>
                <pre className="text-xs text-muted-foreground font-mono">
                  {`const greeting = "Hello, React!";
console.log(greeting);`}
                </pre>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about coding..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" variant="hero">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                AI can make mistakes. Verify important information.
              </p>
            </div>
          </CardContent>
        )}

        {isMinimized && (
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm">AI Tutor ready</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Online
              </Badge>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatHelper;