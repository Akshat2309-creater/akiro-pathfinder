import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  PlayCircle, 
  CheckCircle, 
  AlertCircle,
  Code
} from 'lucide-react';
import { getAssignments, Assignment } from '@/lib/api';

const WeeklyAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Assignment | null>(null);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (error) {
        console.error('Failed to load assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-primary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-accent border-accent/20 bg-accent/10';
      case 'in-progress':
        return 'text-primary border-primary/20 bg-primary/10';
      default:
        return 'text-muted-foreground border-border bg-muted/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <FileText className="w-4 h-4" />;
      case 'project':
        return <Code className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const mockQuizQuestions = [
    {
      id: 1,
      question: "What is the correct way to create a React functional component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "All of the above"
      ],
      correct: 3
    },
    {
      id: 2,
      question: "Which hook is used for managing state in React functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "Java Syntax Extension",
        "JavaScript Exchange"
      ],
      correct: 0
    }
  ];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Assignments
          </CardTitle>
          <CardDescription>
            Complete your assignments to stay on track
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(assignment.type)}
                  {getStatusIcon(assignment.status)}
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assignment.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {assignment.dueDate}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {assignment.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(assignment.status)}>
                  {assignment.status.replace('-', ' ')}
                </Badge>
                {assignment.type === 'quiz' && assignment.status !== 'completed' ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant={assignment.status === 'in-progress' ? 'hero' : 'default'}
                        onClick={() => setSelectedQuiz(assignment)}
                      >
                        {assignment.status === 'in-progress' ? 'Continue' : 'Start Quiz'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{assignment.title}</DialogTitle>
                      </DialogHeader>
                      <QuizModal assignment={assignment} questions={mockQuizQuestions} />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    size="sm"
                    variant={assignment.status === 'completed' ? 'outline' : 'default'}
                  >
                    {assignment.status === 'completed' ? 'Review' : 'Open'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

interface QuizModalProps {
  assignment: Assignment;
  questions: any[];
}

const QuizModal: React.FC<QuizModalProps> = ({ assignment, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">
          {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-lg mb-4">Your Score: <span className="font-bold text-primary">{score}%</span></p>
        <p className="text-muted-foreground mb-6">
          {score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job! Keep practicing.' : 'Keep studying and try again!'}
        </p>
        <Button variant="hero">Continue Learning</Button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <Badge variant="outline">{assignment.difficulty}</Badge>
      </div>

      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:bg-secondary/50'
              }`}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          variant="hero"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default WeeklyAssignments;