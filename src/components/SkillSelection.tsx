import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, DollarSign, Clock, Sparkles } from 'lucide-react';
import { getSkills, getTrendingSkills, Skill } from '@/lib/api';

interface SkillSelectionProps {
  onSkillSelected: (skill: string) => void;
}

const SkillSelection: React.FC<SkillSelectionProps> = ({ onSkillSelected }) => {
  const { setSelectedSkill } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [trendingSkills, setTrendingSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const [skillsData, trendingData] = await Promise.all([
          getSkills(),
          getTrendingSkills()
        ]);
        setSkills(skillsData);
        setTrendingSkills(trendingData);
      } catch (error) {
        console.error('Failed to load skills:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkillId(skillId);
  };

  const handleConfirm = () => {
    const selectedSkill = skills.find(skill => skill.id === selectedSkillId);
    if (selectedSkill) {
      setSelectedSkill(selectedSkill.name);
      onSkillSelected(selectedSkill.name);
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'text-accent border-accent/20 bg-accent/10';
      case 'Medium':
        return 'text-primary border-primary/20 bg-primary/10';
      default:
        return 'text-muted-foreground border-border bg-muted/50';
    }
  };

  const getMarketScore = (openings: number) => {
    if (openings >= 40000) return 95;
    if (openings >= 30000) return 85;
    if (openings >= 20000) return 75;
    return 65;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading skill paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Learning Path</h2>
        <p className="text-muted-foreground">
          Select a skill to start your personalized learning journey
        </p>
      </div>

      {/* Trending Skills Banner */}
      {trendingSkills.length > 0 && (
        <div className="bg-gradient-hero rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Trending This Month</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSkills.map((skill) => (
              <Badge key={skill.id} className="bg-primary/20 text-primary border-primary/30">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const isSelected = selectedSkillId === skill.id;
          const marketScore = getMarketScore(skill.openings);
          
          return (
            <Card
              key={skill.id}
              className={`cursor-pointer transition-all duration-200 card-hover ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleSkillSelect(skill.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{skill.icon}</div>
                  <div className="flex items-center gap-1">
                    {skill.trending && (
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Badge className={`text-xs ${getDemandColor(skill.demand)}`}>
                      {skill.demand} Demand
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <CardDescription className="text-sm">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Market Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Job Openings</span>
                    </div>
                    <span className="font-semibold">
                      {skill.openings.toLocaleString()}+
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>Avg. Salary</span>
                    </div>
                    <span className="font-semibold">
                      ${skill.id === 'datascience' ? '95k' : skill.id === 'cloud' ? '90k' : '85k'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Learning Time</span>
                    </div>
                    <span className="font-semibold">
                      {skill.id === 'fullstack' ? '6-8 months' : skill.id === 'datascience' ? '8-10 months' : '4-6 months'}
                    </span>
                  </div>
                </div>

                {/* Market Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Market Score</span>
                    <span className="font-bold text-primary">{marketScore}/100</span>
                  </div>
                  <Progress value={marketScore} className="h-2" />
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="flex items-center justify-center py-2">
                    <Badge className="bg-primary text-primary-foreground">
                      ✓ Selected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Industry Demand Panel */}
      <Card className="bg-gradient-to-r from-secondary/50 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Industry Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">180k+</p>
              <p className="text-sm text-muted-foreground">Total IT Jobs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">$89k</p>
              <p className="text-sm text-muted-foreground">Avg. Salary</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">72%</p>
              <p className="text-sm text-muted-foreground">Remote Friendly</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">+15%</p>
              <p className="text-sm text-muted-foreground">YoY Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="hero"
          size="lg"
          onClick={handleConfirm}
          disabled={!selectedSkillId}
          className="min-w-48"
        >
          Start Learning Journey
        </Button>
      </div>
    </div>
  );
};

export default SkillSelection;