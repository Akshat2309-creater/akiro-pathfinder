// Mock API functions for AKIRO prototype

export interface Skill {
  id: string;
  name: string;
  description: string;
  demand: 'High' | 'Medium' | 'Low';
  openings: number;
  trending: boolean;
  icon: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  estimatedDays: number;
}

export interface Job {
  id: string;
  company: string;
  logo: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  skills: string[];
  postedDays: number;
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
  type: 'quiz' | 'project' | 'reading';
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Mock data
const mockSkills: Skill[] = [
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    description: 'End-to-end web development with modern frameworks',
    demand: 'High',
    openings: 45000,
    trending: true,
    icon: '🚀'
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    description: 'MongoDB, Express, React, Node.js development',
    demand: 'High',
    openings: 68000,
    trending: true,
    icon: '⚛️'
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'CI/CD, containerization, and cloud infrastructure',
    demand: 'High',
    openings: 32000,
    trending: true,
    icon: '🔧'
  },
  {
    id: 'datascience',
    name: 'Data Science',
    description: 'Analytics, ML, and data-driven insights',
    demand: 'Medium',
    openings: 28000,
    trending: false,
    icon: '📊'
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    description: 'AWS, Azure, GCP cloud solutions',
    demand: 'High',
    openings: 41000,
    trending: true,
    icon: '☁️'
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    company: 'TechFlow Inc.',
    logo: '🏢',
    title: 'Junior Full Stack Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$75,000 - $95,000',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    postedDays: 2,
    description: 'Join our growing team building next-gen SaaS products.'
  },
  {
    id: '2',
    company: 'StartupX',
    logo: '🚀',
    title: 'MERN Stack Developer',
    location: 'Remote',
    type: 'Remote',
    salary: '$80,000 - $110,000',
    skills: ['MongoDB', 'Express', 'React', 'Node.js'],
    postedDays: 1,
    description: 'Build scalable web applications with our product team.'
  },
  {
    id: '3',
    company: 'DataCorp',
    logo: '📈',
    title: 'Junior Data Scientist',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$85,000 - $105,000',
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas'],
    postedDays: 5,
    description: 'Analyze data to drive business insights and strategy.'
  }
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Quiz',
    type: 'quiz',
    status: 'completed',
    dueDate: '2024-01-15',
    estimatedTime: '45 mins',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Build a React Todo App',
    type: 'project',
    status: 'in-progress',
    dueDate: '2024-01-22',
    estimatedTime: '6 hours',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'Node.js Express Server',
    type: 'project',
    status: 'not-started',
    dueDate: '2024-01-29',
    estimatedTime: '4 hours',
    difficulty: 'Intermediate'
  }
];

// API functions
export const getSkills = async (): Promise<Skill[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSkills;
};

export const getRoadmap = async (skillId: string): Promise<RoadmapMilestone[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const roadmaps: Record<string, RoadmapMilestone[]> = {
    mern: [
      { id: '1', title: 'HTML & CSS Basics', description: 'Learn web fundamentals', status: 'completed', estimatedDays: 7 },
      { id: '2', title: 'JavaScript ES6+', description: 'Modern JavaScript features', status: 'completed', estimatedDays: 14 },
      { id: '3', title: 'React Fundamentals', description: 'Component-based development', status: 'in-progress', estimatedDays: 21 },
      { id: '4', title: 'Node.js & Express', description: 'Backend development', status: 'available', estimatedDays: 14 },
      { id: '5', title: 'MongoDB & Mongoose', description: 'Database management', status: 'locked', estimatedDays: 10 },
      { id: '6', title: 'Full Stack Project', description: 'Build complete application', status: 'locked', estimatedDays: 30 }
    ],
    fullstack: [
      { id: '1', title: 'Frontend Foundations', description: 'HTML, CSS, JavaScript', status: 'completed', estimatedDays: 14 },
      { id: '2', title: 'Modern Frontend Framework', description: 'React or Vue.js', status: 'in-progress', estimatedDays: 21 },
      { id: '3', title: 'Backend Development', description: 'Server-side programming', status: 'available', estimatedDays: 21 },
      { id: '4', title: 'Database Design', description: 'SQL and NoSQL databases', status: 'locked', estimatedDays: 14 },
      { id: '5', title: 'DevOps Basics', description: 'Deployment and CI/CD', status: 'locked', estimatedDays: 10 },
      { id: '6', title: 'Portfolio Project', description: 'End-to-end application', status: 'locked', estimatedDays: 45 }
    ]
  };
  
  return roadmaps[skillId] || roadmaps.mern;
};

export const getJobs = async (query?: string, location?: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockJobs.filter(job => 
    !query || job.title.toLowerCase().includes(query.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
  );
};

export const getAssignments = async (): Promise<Assignment[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockAssignments;
};

export const getTrendingSkills = async (): Promise<Skill[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSkills.filter(skill => skill.trending);
};