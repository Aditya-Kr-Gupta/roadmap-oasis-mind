
import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Zap, Award, Calendar, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AuthModal } from './AuthModal';

interface WeeklyProgress {
  week: string;
  progress: number;
  completed: number;
  total: number;
}

interface Achievement {
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface AnalyticsData {
  totalDays: number;
  completedTasks: number;
  totalTasks: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: WeeklyProgress[];
  achievements: Achievement[];
}

const ProgressAnalytics: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    } else {
      setDataLoading(false);
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    if (!user) return;

    try {
      // Fetch all tasks
      const { data: allTasks, error: tasksError } = await supabase
        .from('roadmap_tasks')
        .select('id, day_number')
        .order('day_number');

      if (tasksError) throw tasksError;

      // Fetch user progress
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('*, roadmap_tasks(day_number)')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      const totalTasks = allTasks?.length || 0;
      const completedTasks = userProgress?.filter(p => p.completed).length || 0;

      // Calculate weekly progress
      const weeklyData = calculateWeeklyProgress(allTasks || [], userProgress || []);

      // Calculate streaks
      const { currentStreak, longestStreak } = calculateStreaks(userProgress || []);

      // Calculate achievements
      const achievements = calculateAchievements(completedTasks, currentStreak, weeklyData);

      setAnalyticsData({
        totalDays: 90,
        completedTasks,
        totalTasks,
        currentStreak,
        longestStreak,
        weeklyData,
        achievements,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const calculateWeeklyProgress = (allTasks: any[], userProgress: any[]) => {
    const weeks = [];
    const completedTasksByDay = new Set(
      userProgress.filter(p => p.completed).map(p => p.roadmap_tasks?.day_number).filter(Boolean)
    );

    for (let week = 1; week <= 13; week++) {
      const startDay = (week - 1) * 7 + 1;
      const endDay = Math.min(week * 7, 90);
      
      const weekTasks = allTasks.filter(t => t.day_number >= startDay && t.day_number <= endDay);
      const completedInWeek = weekTasks.filter(t => completedTasksByDay.has(t.day_number)).length;
      
      weeks.push({
        week: `Week ${week}`,
        progress: weekTasks.length > 0 ? (completedInWeek / weekTasks.length) * 100 : 0,
        completed: completedInWeek,
        total: weekTasks.length,
      });
    }

    return weeks.slice(0, 4); // Show first 4 weeks
  };

  const calculateStreaks = (userProgress: any[]) => {
    const completedDates = userProgress
      .filter(p => p.completed && p.completed_at)
      .map(p => new Date(p.completed_at).toDateString())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (completedDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

    let currentStreak = 1;
    let longestStreak = 1;
    let tempStreak = 1;

    for (let i = 1; i < completedDates.length; i++) {
      const current = new Date(completedDates[i]);
      const previous = new Date(completedDates[i - 1]);
      const diffTime = current.getTime() - previous.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);
    
    // Check if current streak is ongoing (last completion was recent)
    const lastDate = new Date(completedDates[completedDates.length - 1]);
    const today = new Date();
    const daysSinceLastCompletion = Math.ceil((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    currentStreak = daysSinceLastCompletion <= 1 ? tempStreak : 0;

    return { currentStreak, longestStreak };
  };

  const calculateAchievements = (completedTasks: number, currentStreak: number, weeklyData: WeeklyProgress[]): Achievement[] => {
    const firstWeekCompleted = weeklyData[0]?.progress === 100;
    
    return [
      { 
        name: "Getting Started", 
        description: "Begin your learning journey", 
        unlocked: true, 
        icon: "🎯" 
      },
      { 
        name: "First Steps", 
        description: "Complete your first task", 
        unlocked: completedTasks >= 1, 
        icon: "👶" 
      },
      { 
        name: "Java Basics", 
        description: "Finish Java fundamentals week", 
        unlocked: firstWeekCompleted, 
        icon: "☕" 
      },
      { 
        name: "Week Champion", 
        description: "Complete a full week", 
        unlocked: weeklyData.some(w => w.progress === 100), 
        icon: "🏆" 
      },
      { 
        name: "Streak Master", 
        description: "Maintain a 7-day streak", 
        unlocked: currentStreak >= 7, 
        icon: "🔥" 
      },
      { 
        name: "Milestone Achiever", 
        description: "Complete 25 tasks", 
        unlocked: completedTasks >= 25, 
        icon: "🎖️" 
      },
    ];
  };

  if (loading || dataLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl mb-2">Track Your Progress</CardTitle>
            <CardDescription className="text-lg mb-6">
              Sign in to view detailed analytics and track your learning journey.
            </CardDescription>
            <Button 
              onClick={() => setAuthModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              View Analytics
            </Button>
          </CardHeader>
        </Card>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">
              {((analyticsData.completedTasks / analyticsData.totalTasks) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {analyticsData.completedTasks} of {analyticsData.totalTasks} tasks
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">{analyticsData.currentStreak}</p>
            <p className="text-xs text-muted-foreground">
              {analyticsData.currentStreak > 0 ? 'Keep it up!' : 'Start your streak!'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Tasks Completed</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">{analyticsData.completedTasks}</p>
            <p className="text-xs text-muted-foreground">learning milestones reached</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Achievements</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">
              {analyticsData.achievements.filter(a => a.unlocked).length}
            </p>
            <p className="text-xs text-muted-foreground">
              of {analyticsData.achievements.length} unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3" />
            Weekly Progress Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.weeklyData.map((week, index) => (
              <div key={week.week} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-medium">{week.week}</span>
                  <span className="text-card-foreground font-semibold">
                    {week.progress.toFixed(0)}% ({week.completed}/{week.total})
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={week.progress} 
                    className="h-3 transition-all duration-500 group-hover:h-4" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-3" />
            Achievements & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700 shadow-lg'
                    : 'bg-muted/50 border-muted opacity-60 hover:opacity-80'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl" />
                )}
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className={`font-medium text-sm ${
                      achievement.unlocked ? 'text-green-800 dark:text-green-200' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </span>
                  </div>
                  <p className={`text-xs ${
                    achievement.unlocked ? 'text-green-600 dark:text-green-300' : 'text-muted-foreground'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressAnalytics;
