import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Sparkles, Code, CheckCircle } from 'lucide-react';

const ChatPreview = () => {
  const messages = [
    {
      id: 1,
      type: 'ai',
      content: "Great question! Let me explain React hooks step by step...",
      timestamp: "2 min ago",
      hasCode: true
    },
    {
      id: 2,
      type: 'user',
      content: "Can you help me understand useState?",
      timestamp: "3 min ago"
    },
    {
      id: 3,
      type: 'ai',
      content: "I see you're working on the todo app project. Here's how to add state management:",
      timestamp: "5 min ago",
      hasCode: true
    }
  ];

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">AI Tutor</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 bg-gradient-to-b from-background to-secondary/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'ai' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground'
              }`}>
                {message.type === 'ai' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-lg ${
                  message.type === 'ai'
                    ? 'bg-card border shadow-sm text-left'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  
                  {message.hasCode && message.type === 'ai' && (
                    <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                      <div className="flex items-center gap-1 mb-1">
                        <Code className="w-3 h-3 text-primary" />
                        <span className="text-primary font-medium">JavaScript</span>
                      </div>
                      <code className="text-muted-foreground">
                        const [count, setCount] = useState(0);
                      </code>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-card border shadow-sm rounded-lg p-3">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-secondary/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle className="w-4 h-4" />
              <span>95% accuracy rate</span>
            </div>
            <div className="text-muted-foreground">
              Available 24/7
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPreview;