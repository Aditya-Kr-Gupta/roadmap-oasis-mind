
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: string;
  title: string;
  description: string;
  day_number: number;
  category?: {
    name: string;
    description: string;
  };
}

interface UserProgress {
  id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}

const DailyRoadmap: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({});
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  useEffect(() => {
    const completed = Object.values(userProgress).filter(p => p.completed).length;
    setCompletedTasksCount(completed);
  }, [userProgress]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('roadmap_tasks')
        .select(`
          *,
          category:roadmap_categories(name, description)
        `)
        .order('day_number');

      if (error) throw error;
      setTasks(data || []);
      setTotalTasks(data?.length || 0);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error loading tasks",
        description: "Failed to load roadmap tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap: Record<string, UserProgress> = {};
      data?.forEach(progress => {
        progressMap[progress.task_id] = progress;
      });
      setUserProgress(progressMap);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to track your progress.",
        variant: "destructive",
      });
      return;
    }

    try {
      const currentProgress = userProgress[taskId];
      const isCompleted = !currentProgress?.completed;

      if (currentProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
          })
          .eq('id', currentProgress.id);

        if (error) throw error;
      } else {
        // Create new progress record
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            task_id: taskId,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
          });

        if (error) throw error;
      }

      // Update local state
      setUserProgress(prev => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          task_id: taskId,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        } as UserProgress,
      }));

      if (isCompleted) {
        const task = tasks.find(t => t.id === taskId);
        toast({
          title: "Task Completed! 🎉",
          description: `Great job completing: ${task?.title}`,
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error updating progress",
        description: "Failed to update task progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else if (direction === 'next' && currentDay < 90) {
      setCurrentDay(currentDay + 1);
    }
  };

  const currentDayTasks = tasks.filter(task => task.day_number === currentDay);
  const progressPercentage = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Day {currentDay} Roadmap
              </CardTitle>
              <CardDescription className="text-base">
                {currentDayTasks.length > 0 && currentDayTasks[0].category?.name}
              </CardDescription>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigateDay('prev')} 
              variant="outline" 
              size="sm"
              disabled={currentDay === 1}
              className="hover:bg-indigo-50 dark:hover:bg-indigo-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigateDay('next')} 
              variant="outline" 
              size="sm"
              disabled={currentDay === 90}
              className="hover:bg-indigo-50 dark:hover:bg-indigo-900"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-medium text-muted-foreground">
              {completedTasksCount}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200" />
          <p className="text-xs text-muted-foreground mt-2">
            {progressPercentage.toFixed(1)}% complete
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {currentDayTasks.map((task) => {
            const isCompleted = userProgress[task.id]?.completed || false;
            return (
              <div
                key={task.id}
                className={`group relative overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700 shadow-emerald-100 dark:shadow-emerald-900/20' 
                    : 'bg-gradient-to-r from-white to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20 border-indigo-200 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-1 transition-all hover:scale-110 transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                    disabled={!user}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 drop-shadow-sm" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-indigo-600 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isCompleted 
                        ? 'text-emerald-800 dark:text-emerald-200 line-through decoration-2' 
                        : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isCompleted 
                        ? 'text-emerald-600 dark:text-emerald-300' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {task.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">Day {task.day_number}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {currentDayTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">No tasks scheduled for Day {currentDay}</p>
            <p className="text-sm text-muted-foreground">
              This might be a rest day or review day. Check out other days!
            </p>
          </div>
        )}

        {!user && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
              📚 Sign in to track your progress and save your learning journey!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyRoadmap;
