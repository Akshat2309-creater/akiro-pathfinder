import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Code, Target, Users, MessageCircle, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ChatPreview from '@/components/ChatPreview';
import SkillSelection from '@/components/SkillSelection';

const HomePage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showSkillSelection, setShowSkillSelection] = useState(false);
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isSignup = (e.nativeEvent as SubmitEvent)?.submitter?.getAttribute('data-action') === 'signup';
    
    try {
      if (isSignup) {
        await signup(
          formData.get('name') as string,
          formData.get('email') as string,
          formData.get('password') as string
        );
      } else {
        await login(
          formData.get('email') as string,
          formData.get('password') as string
        );
      }
      setShowAuth(false);
      setShowSkillSelection(true);
      toast({
        title: "Welcome to AKIRO!",
        description: "Let's get started by selecting your learning path.",
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSkillSelected = (skill: string) => {
    setShowSkillSelection(false);
    navigate('/dashboard');
    toast({
      title: `${skill} path selected!`,
      description: "Your personalized roadmap is ready.",
    });
  };

  if (isAuthenticated && !showSkillSelection) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">AKIRO</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="outline" onClick={() => setShowAuth(true)}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-card rounded-full px-4 py-2 shadow-card">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">AI-Powered Learning</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                AKIRO — Your AI Learning &{' '}
                <span className="gradient-text">Career Companion</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                From learning to landing your first IT job — guided, practice-based, AI-powered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => setShowAuth(true)}
                className="btn-glow"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Hands-on Projects</h3>
                <p className="text-sm text-muted-foreground">Real-world coding experience</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold">Personalized Path</h3>
                <p className="text-sm text-muted-foreground">Tailored learning roadmaps</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Job Readiness</h3>
                <p className="text-sm text-muted-foreground">Industry-ready skills</p>
              </div>
            </div>
          </div>

          {/* Visual Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-accent rounded-3xl opacity-10 blur-3xl"></div>
            <div className="relative space-y-6">
              <ChatPreview />
              <Card className="p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Your Progress</h3>
                  <span className="text-2xl font-bold text-primary">73%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>React Fundamentals</span>
                    <span className="text-accent">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Node.js Backend</span>
                    <span className="text-primary">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Full Stack Project</span>
                    <span className="text-muted-foreground">Upcoming</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="py-16 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join thousands of successful developers</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="ml-2 font-semibold">4.9/5 from 12,000+ learners</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Junior Full Stack Developer", company: "TechCorp", quote: "AKIRO's personalized approach helped me land my dream job in just 6 months!" },
              { name: "David L.", role: "React Developer", company: "StartupX", quote: "The hands-on projects were exactly what I needed to build a strong portfolio." },
              { name: "Maria C.", role: "MERN Stack Developer", company: "InnovateLabs", quote: "The AI guidance kept me motivated and on track throughout my learning journey." }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join AKIRO</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <form onSubmit={handleAuthSubmit}>
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Sarah Chen" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="sarah@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" data-action="signup" className="w-full" variant="hero">
                  Create Account
                </Button>
              </TabsContent>
              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" name="email" type="email" placeholder="sarah@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input id="signin-password" name="password" type="password" required />
                </div>
                <Button type="submit" data-action="signin" className="w-full" variant="hero">
                  Sign In
                </Button>
              </TabsContent>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Skill Selection Dialog */}
      <Dialog open={showSkillSelection} onOpenChange={setShowSkillSelection}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Choose Your Learning Path</DialogTitle>
          </DialogHeader>
          <SkillSelection onSkillSelected={handleSkillSelected} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;