import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Briefcase, 
  MessageCircle, 
  TrendingUp,
  Clock,
  CheckCircle,
  PlayCircle,
  ArrowRight 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import WeeklyAssignments from '@/components/WeeklyAssignments';
import ChatHelper from '@/components/ChatHelper';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Courses Completed', value: '3', icon: CheckCircle, color: 'text-accent' },
    { label: 'Hours Learned', value: '127', icon: Clock, color: 'text-primary' },
    { label: 'Streak Days', value: '23', icon: TrendingUp, color: 'text-accent' },
    { label: 'Job Applications', value: '8', icon: Briefcase, color: 'text-primary' }
  ];

  const nextMilestones = [
    { id: 1, title: 'Complete React Router', progress: 75, estimated: '2 days' },
    { id: 2, title: 'Build Express API', progress: 30, estimated: '5 days' },
    { id: 3, title: 'MongoDB Integration', progress: 0, estimated: '7 days' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your {user?.selectedSkill || 'MERN Stack'} learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <CardContent className="flex items-center p-0">
                <div className="flex-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>
                  Your journey to becoming a {user?.selectedSkill || 'MERN Stack'} developer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Overall Progress</span>
                  <span className="text-2xl font-bold text-primary">73%</span>
                </div>
                <Progress value={73} className="h-3" />
                
                <div className="space-y-4">
                  {nextMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={milestone.progress} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground">{milestone.estimated}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        {milestone.progress > 0 ? <PlayCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="hero" onClick={() => navigate('/roadmap')}>
                    View Full Roadmap
                  </Button>
                  <Button variant="outline">
                    Take Practice Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Assignments */}
            <WeeklyAssignments />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>MERN Stack Jobs</span>
                  <Badge variant="secondary">+12% this week</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg. Salary</span>
                  <span className="font-semibold">$85,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Remote Positions</span>
                  <span className="font-semibold">68%</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/jobs')}
                >
                  Browse Jobs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="card" className="w-full justify-start">
                  <BookOpen className="mr-2 w-4 h-4" />
                  Continue Learning
                </Button>
                <Button variant="card" className="w-full justify-start">
                  <Calendar className="mr-2 w-4 h-4" />
                  Schedule Study Time
                </Button>
                <Button variant="card" className="w-full justify-start">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Ask AI Tutor
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">JavaScript Mastery</p>
                    <p className="text-xs text-muted-foreground">Completed all fundamentals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">First React Project</p>
                    <p className="text-xs text-muted-foreground">Built a todo application</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Chat Helper Widget */}
      <ChatHelper />
    </div>
  );
};

export default Dashboard;