import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Lock, PlayCircle, Calendar, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getRoadmap, RoadmapMilestone } from '@/lib/api';

const Roadmap = () => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const data = await getRoadmap(user?.selectedSkill?.toLowerCase() || 'mern');
        setMilestones(data);
      } catch (error) {
        console.error('Failed to load roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [user?.selectedSkill]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-accent" />;
      case 'in-progress':
        return <PlayCircle className="w-6 h-6 text-primary" />;
      case 'available':
        return <Clock className="w-6 h-6 text-muted-foreground" />;
      default:
        return <Lock className="w-6 h-6 text-muted-foreground opacity-50" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-accent bg-accent/5';
      case 'in-progress':
        return 'border-primary bg-primary/5';
      case 'available':
        return 'border-border bg-card hover:bg-secondary/50';
      default:
        return 'border-border bg-muted/30';
    }
  };

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const totalCount = milestones.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your roadmap...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Target className="w-8 h-8 text-primary" />
            {user?.selectedSkill || 'MERN Stack'} Roadmap
          </h1>
          <p className="text-muted-foreground">
            Your personalized learning path to becoming job-ready
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Progress</span>
              <span className="text-2xl font-bold text-primary">{Math.round(progressPercent)}%</span>
            </CardTitle>
            <CardDescription>
              {completedCount} of {totalCount} milestones completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-3 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-accent">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {milestones.filter(m => m.status === 'in-progress').length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">
                  {milestones.filter(m => m.status === 'available').length}
                </p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Connection Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-border"></div>
              )}
              
              <Card className={`transition-all duration-200 ${getStatusColor(milestone.status)} ${
                milestone.status === 'available' ? 'cursor-pointer card-hover' : ''
              }`}>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex-shrink-0 relative">
                    {getStatusIcon(milestone.status)}
                    <div className="absolute -inset-2 rounded-full bg-background"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {milestone.estimatedDays} days
                        </Badge>
                        {milestone.status === 'completed' && (
                          <Badge variant="secondary">Complete</Badge>
                        )}
                        {milestone.status === 'in-progress' && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{milestone.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Step {index + 1} of {totalCount}
                      </div>
                      
                      {milestone.status === 'available' && (
                        <Button variant="default">
                          Start Learning
                        </Button>
                      )}
                      {milestone.status === 'in-progress' && (
                        <Button variant="hero">
                          Continue
                        </Button>
                      )}
                      {milestone.status === 'completed' && (
                        <Button variant="outline">
                          Review
                        </Button>
                      )}
                      {milestone.status === 'locked' && (
                        <Button variant="outline" disabled>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-hero border-0">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-2">Ready to accelerate your progress?</h3>
            <p className="text-muted-foreground mb-6">
              Get personalized guidance and faster learning with our AI tutor
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="hero">
                Get AI Tutor Help
              </Button>
              <Button variant="outline">
                Join Study Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Roadmap;