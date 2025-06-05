
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  day: number;
}

const roadmapData: Task[] = [
  // Week 1-4: Foundations and Core Development
  { id: '1', title: 'Java Fundamentals Review', description: 'Review Java basics (loops, conditions, OOP)', completed: false, day: 1 },
  { id: '2', title: 'Java Fundamentals Practice', description: 'Practice Java fundamentals with coding exercises', completed: false, day: 2 },
  { id: '3', title: 'Collections Framework', description: 'Learn List, Set, Map and their implementations', completed: false, day: 3 },
  { id: '4', title: 'Collections Practice', description: 'Practice with real-world collection problems', completed: false, day: 4 },
  { id: '5', title: 'Exception Handling', description: 'Master exceptions and file handling in Java', completed: false, day: 5 },
  { id: '6', title: 'Multithreading Basics', description: 'Learn thread creation and synchronization', completed: false, day: 6 },
  { id: '7', title: 'Java Project', description: 'Build Library Management System console app', completed: false, day: 7 },
  
  // Week 2: MySQL
  { id: '8', title: 'SQL Basics Review', description: 'Review CRUD operations and basic joins', completed: false, day: 8 },
  { id: '9', title: 'SQL Practice', description: 'Practice complex SQL queries', completed: false, day: 9 },
  { id: '10', title: 'Advanced SQL', description: 'Learn subqueries, views, and complex joins', completed: false, day: 10 },
  { id: '11', title: 'Database Optimization', description: 'Study indexing and query optimization', completed: false, day: 11 },
  { id: '12', title: 'Stored Procedures', description: 'Learn stored procedures and functions', completed: false, day: 12 },
  { id: '13', title: 'Triggers and Events', description: 'Master database triggers and events', completed: false, day: 13 },
  { id: '14', title: 'Database Design Project', description: 'Design schema for online store', completed: false, day: 14 },
  
  // Week 3: Frontend
  { id: '15', title: 'Advanced HTML', description: 'Semantic HTML, forms, multimedia tags', completed: false, day: 15 },
  { id: '16', title: 'CSS Layouts', description: 'Master Flexbox and CSS Grid', completed: false, day: 16 },
  { id: '17', title: 'Responsive Design', description: 'Learn media queries and responsive patterns', completed: false, day: 17 },
  { id: '18', title: 'JavaScript Fundamentals', description: 'Variables, loops, functions, and DOM', completed: false, day: 18 },
  { id: '19', title: 'Modern JavaScript', description: 'ES6+ features, promises, async/await', completed: false, day: 19 },
  { id: '20', title: 'JavaScript Practice', description: 'Build interactive web components', completed: false, day: 20 },
  { id: '21', title: 'Portfolio Website', description: 'Build responsive portfolio with HTML/CSS/JS', completed: false, day: 21 },
];

const DailyRoadmap: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [tasks, setTasks] = useState<Task[]>(roadmapData);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    setCompletedTasksCount(completed);
  }, [tasks]);

  const currentDayTasks = tasks.filter(task => task.day === currentDay);
  const progressPercentage = (completedTasksCount / tasks.length) * 100;

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            toast({
              title: "Task Completed! 🎉",
              description: `Great job completing: ${task.title}`,
            });
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else if (direction === 'next' && currentDay < 90) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Day {currentDay} Roadmap</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => navigateDay('prev')} 
            variant="outline" 
            size="sm"
            disabled={currentDay === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => navigateDay('next')} 
            variant="outline" 
            size="sm"
            disabled={currentDay === 90}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-muted-foreground">
            {completedTasksCount}/{tasks.length} tasks
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {progressPercentage.toFixed(1)}% complete
        </p>
      </div>

      <div className="space-y-4">
        {currentDayTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              task.completed 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : 'bg-background hover:bg-muted/50'
            }`}
          >
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className="mt-1 transition-colors hover:scale-110 transform duration-200"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
              )}
            </button>
            <div className="flex-1">
              <h3 className={`font-medium ${
                task.completed 
                  ? 'text-green-800 dark:text-green-200 line-through' 
                  : 'text-card-foreground'
              }`}>
                {task.title}
              </h3>
              <p className={`text-sm mt-1 ${
                task.completed 
                  ? 'text-green-600 dark:text-green-300' 
                  : 'text-muted-foreground'
              }`}>
                {task.description}
              </p>
            </div>
            <Clock className="h-4 w-4 text-muted-foreground mt-1" />
          </div>
        ))}
      </div>

      {currentDayTasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks scheduled for Day {currentDay}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Check out other days or this might be a rest day!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyRoadmap;
