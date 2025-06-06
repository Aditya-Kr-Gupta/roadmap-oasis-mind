
import React, { useState, useEffect } from 'react';
import { User, Settings, Trophy, Calendar, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AuthModal } from './AuthModal';

interface UserStats {
  totalTasks: number;
  completedTasks: number;
  currentDay: number;
  streak: number;
  completionRate: number;
}

const UserProfile: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    totalTasks: 0,
    completedTasks: 0,
    currentDay: 1,
    streak: 0,
    completionRate: 0,
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    } else {
      setStatsLoading(false);
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Fetch total tasks
      const { data: allTasks, error: tasksError } = await supabase
        .from('roadmap_tasks')
        .select('id');

      if (tasksError) throw tasksError;

      // Fetch user progress
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      const totalTasks = allTasks?.length || 0;
      const completedTasks = userProgress?.filter(p => p.completed).length || 0;
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      // Calculate current day (simple logic - can be enhanced)
      const currentDay = Math.max(1, completedTasks + 1);

      // Calculate streak (simplified - check consecutive completed days)
      const streak = calculateStreak(userProgress || []);

      setUserStats({
        totalTasks,
        completedTasks,
        currentDay: Math.min(currentDay, 90),
        streak,
        completionRate,
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const calculateStreak = (progress: any[]) => {
    // Simple streak calculation - can be enhanced with more sophisticated logic
    const completedDates = progress
      .filter(p => p.completed && p.completed_at)
      .map(p => new Date(p.completed_at).toDateString())
      .sort();

    if (completedDates.length === 0) return 0;

    let streak = 1;
    for (let i = completedDates.length - 1; i > 0; i--) {
      const current = new Date(completedDates[i]);
      const previous = new Date(completedDates[i - 1]);
      const diffTime = Math.abs(current.getTime() - previous.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  if (loading || statsLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-muted rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-48"></div>
                <div className="h-4 bg-muted rounded w-64"></div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-indigo-200/50 dark:border-purple-500/30 backdrop-blur-lg">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl mb-2 text-slate-900 dark:text-slate-100">Welcome to Learning Platform</CardTitle>
            <CardDescription className="text-lg mb-6 text-slate-600 dark:text-slate-400">
              Sign in to access your personalized learning dashboard and track your progress.
            </CardDescription>
            <Button 
              onClick={() => setAuthModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </Button>
          </CardHeader>
        </Card>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-purple-950/50 dark:to-indigo-950/50 border border-white/20 dark:border-slate-700/50 backdrop-blur-lg shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-indigo-200 dark:border-purple-500/50 shadow-lg">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">{profile.full_name}</CardTitle>
              <CardDescription className="text-lg text-slate-600 dark:text-slate-400">{profile.email}</CardDescription>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </div>
                {profile.role === 'admin' && (
                  <div className="flex items-center space-x-1 text-sm font-medium">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span className="text-amber-600 dark:text-amber-400">Admin</span>
                  </div>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-300 border-indigo-200 dark:border-purple-500/30 hover:bg-indigo-50 dark:hover:bg-purple-900/30">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200/50 dark:border-emerald-500/30 backdrop-blur-lg shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{userStats.currentDay}</h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">Current Day</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-lg shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{userStats.completedTasks}</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Tasks Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200/50 dark:border-orange-500/30 backdrop-blur-lg shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">{userStats.streak}</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-500/30 backdrop-blur-lg shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">{userStats.completionRate.toFixed(1)}%</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200/50 dark:border-green-500/30">
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                🎯 {userStats.completedTasks} tasks completed out of {userStats.totalTasks}
              </span>
              <span className="text-xs text-green-600 dark:text-green-400">
                {userStats.completionRate.toFixed(1)}% progress
              </span>
            </div>
            
            {userStats.streak > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg border border-orange-200/50 dark:border-orange-500/30">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  🔥 {userStats.streak} day learning streak!
                </span>
                <span className="text-xs text-orange-600 dark:text-orange-400">Keep it up!</span>
              </div>
            )}
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200/50 dark:border-blue-500/30">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                📚 Currently on Day {userStats.currentDay} of your learning journey
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400">
                {90 - userStats.currentDay} days remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
