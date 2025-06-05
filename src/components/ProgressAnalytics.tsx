
import React from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProgressAnalytics: React.FC = () => {
  // Realistic progress data for day 1 (just starting)
  const currentDay = 1;
  const totalDays = 90;
  const completedTasks = 0;
  const totalTasksToday = 2; // Day 1 has 2 tasks: Review Java fundamentals part 1

  const stats = {
    totalDays,
    completedDays: 0, // Haven't completed any full days yet
    currentStreak: 0, // No streak yet
    longestStreak: 0, // No streak achieved yet
    averageDailyProgress: 0, // No tasks completed yet
    tasksCompleted: completedTasks,
    totalTasks: totalTasksToday,
    weeklyData: [
      { week: 'Week 1', progress: 0, completed: 0, total: 7 }, // Just starting
      { week: 'Week 2', progress: 0, completed: 0, total: 7 },
      { week: 'Week 3', progress: 0, completed: 0, total: 7 },
      { week: 'Week 4', progress: 0, completed: 0, total: 7 }
    ]
  };

  const achievements = [
    { name: "Getting Started", description: "Begin your learning journey", unlocked: true, icon: "🎯" },
    { name: "First Steps", description: "Complete your first task", unlocked: false, icon: "👶" },
    { name: "Java Basics", description: "Finish Java fundamentals", unlocked: false, icon: "☕" },
    { name: "Week Champion", description: "Complete a full week", unlocked: false, icon: "🏆" },
    { name: "Streak Master", description: "Maintain a 7-day streak", unlocked: false, icon: "🔥" },
    { name: "Database Expert", description: "Master MySQL basics", unlocked: false, icon: "🗄️" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-gradient-to-br from-pixel-50 to-pixel-100 dark:from-pixel-900 dark:to-pixel-800 rounded-2xl p-6 shadow-lg border-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-pixel-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">
              {((currentDay / stats.totalDays) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              Day {currentDay} of {stats.totalDays}
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-900 dark:to-coral-800 rounded-2xl p-6 shadow-lg border-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg animate-glow">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">
              Start your first streak!
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900 dark:to-sage-800 rounded-2xl p-6 shadow-lg border-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Today's Tasks</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">{stats.tasksCompleted}</p>
            <p className="text-xs text-muted-foreground">
              of {stats.totalTasks} for today
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-zen-50 to-zen-100 dark:from-zen-900 dark:to-zen-800 rounded-2xl p-6 shadow-lg border-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-zen-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Achievements</span>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-1">1</p>
            <p className="text-xs text-muted-foreground">unlocked so far</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm animate-slide-up">
        <h3 className="text-xl font-semibold mb-6 text-card-foreground flex items-center">
          <div className="w-1 h-6 bg-pixel-500 rounded-full mr-3" />
          Weekly Progress Breakdown
        </h3>
        <div className="space-y-4">
          {stats.weeklyData.map((week, index) => (
            <div key={week.week} className="group" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">{week.week}</span>
                <span className="text-card-foreground font-semibold">
                  {week.progress}% ({week.completed}/{week.total})
                </span>
              </div>
              <div className="relative">
                <Progress value={week.progress} className="h-3 transition-all duration-500 group-hover:h-4" />
                <div className="absolute inset-0 bg-gradient-to-r from-pixel-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-pixel-50 dark:bg-pixel-900/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            📚 You're just getting started! Complete your first task to see progress here.
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border-0 backdrop-blur-sm animate-scale-in">
        <h3 className="text-xl font-semibold mb-6 text-card-foreground flex items-center">
          <div className="w-1 h-6 bg-coral-500 rounded-full mr-3" />
          Achievements & Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
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
                  <span className="text-2xl animate-bounce-gentle">{achievement.icon}</span>
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
      </div>
    </div>
  );
};

export default ProgressAnalytics;
