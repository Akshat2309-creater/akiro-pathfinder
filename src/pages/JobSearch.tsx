import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, ExternalLink, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getJobs, Job } from '@/lib/api';

const JobSearch = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs(searchQuery, locationFilter);
        setJobs(data);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [searchQuery, locationFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Trigger useEffect with current search values
  };

  const recommendedJobs = jobs.filter(job => 
    user?.selectedSkill && job.skills.some(skill => 
      skill.toLowerCase().includes(user.selectedSkill.toLowerCase().split(' ')[0])
    )
  );

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Full-time':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Part-time':
        return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Job Search
          </h1>
          <p className="text-muted-foreground">
            Find your perfect {user?.selectedSkill || 'development'} role
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search MERN jobs, e.g. 'MERN Developer, Remote'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="hero">
                  Search Jobs
                </Button>
              </div>
              
              <div className="flex gap-4">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="austin">Austin</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recommended Jobs */}
            {recommendedJobs.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                </div>
                <div className="grid gap-4">
                  {recommendedJobs.slice(0, 2).map((job) => (
                    <Card key={job.id} className="border-accent/20 bg-accent/5 card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center text-2xl">
                              {job.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                          </div>
                          <Badge className="bg-accent/20 text-accent border-accent/20">
                            Recommended
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedDays} days ago
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4">{job.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getJobTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="text-sm text-muted-foreground">
                                +{job.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          <Button variant="hero">
                            Apply Now
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Jobs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                All Jobs ({jobs.length} found)
              </h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-muted"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-48"></div>
                            <div className="h-3 bg-muted rounded w-32"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-full"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center text-2xl">
                              {job.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedDays} days ago
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4">{job.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getJobTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="text-sm text-muted-foreground">
                                +{job.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          <Button variant="default">
                            Apply Now
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Market Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Openings</span>
                  <span className="font-semibold">68,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg. Salary</span>
                  <span className="font-semibold">$85,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Remote Jobs</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Growth Rate</span>
                  <Badge variant="secondary">+12% YoY</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Popular Skills */}
            <Card>
              <CardHeader>
                <CardTitle>In-Demand Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'AWS'].map((skill) => (
                  <Badge key={skill} variant="outline" className="mr-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
                <CardDescription>
                  Get notified about new opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full">
                  Set Up Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSearch;