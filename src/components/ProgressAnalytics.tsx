
import React from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProgressAnalytics: React.FC = () => {
  const stats = {
    totalDays: 90,
    completedDays: 12,
    currentStreak: 5,
    longestStreak: 8,
    averageDailyProgress: 85,
    tasksCompleted: 156,
    totalTasks: 300,
  };

  const achievements = [
    { name: "First Steps", description: "Complete your first task", unlocked: true, icon: "🎯" },
    { name: "Streak Master", description: "Maintain a 7-day streak", unlocked: true, icon: "🔥" },
    { name: "Java Ninja", description: "Complete Java fundamentals", unlocked: true, icon: "☕" },
    { name: "Database Expert", description: "Master MySQL basics", unlocked: false, icon: "🗄️" },
    { name: "Frontend Wizard", description: "Build your first website", unlocked: false, icon: "🎨" },
    { name: "Full Stack Hero", description: "Complete full-stack project", unlocked: false, icon: "🚀" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            {((stats.completedDays / stats.totalDays) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.completedDays}/{stats.totalDays} days
          </p>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{stats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">
            Best: {stats.longestStreak} days
          </p>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">Tasks Done</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{stats.tasksCompleted}</p>
          <p className="text-xs text-muted-foreground">
            of {stats.totalTasks} total
          </p>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-muted-foreground">Avg. Daily</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{stats.averageDailyProgress}%</p>
          <p className="text-xs text-muted-foreground">completion rate</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-card rounded-xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Weekly Progress</h3>
        <div className="space-y-3">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
            const progress = index === 0 ? 100 : index === 1 ? 85 : index === 2 ? 45 : 0;
            return (
              <div key={week}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{week}</span>
                  <span className="text-card-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-muted/50 border-muted opacity-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{achievement.icon}</span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
