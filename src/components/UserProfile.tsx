
import React, { useState } from 'react';
import { User, Settings, Trophy, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  currentDay: number;
  totalDays: number;
  completedTasks: number;
  streak: number;
  joinDate: string;
  level: number;
}

const UserProfile: React.FC = () => {
  const [userData] = useState<UserData>({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "",
    currentDay: 1,
    totalDays: 90,
    completedTasks: 0,
    streak: 0,
    joinDate: "2024-06-05",
    level: 1
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="glass-morphism border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-pixel-200 dark:border-pixel-700">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-pixel-100 dark:bg-pixel-800 text-pixel-700 dark:text-pixel-300 text-xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-card-foreground">{userData.name}</CardTitle>
              <CardDescription className="text-lg">{userData.email}</CardDescription>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-pixel-600 dark:text-pixel-400">
                  <Trophy className="h-4 w-4" />
                  <span>Level {userData.level}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-300">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-pixel-50 to-pixel-100 dark:from-pixel-900 dark:to-pixel-800 border-0 shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-pixel-600 dark:text-pixel-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-card-foreground">{userData.currentDay}</h3>
            <p className="text-sm text-muted-foreground">Current Day</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900 dark:to-sage-800 border-0 shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-sage-600 dark:text-sage-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-card-foreground">{userData.completedTasks}</h3>
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-900 dark:to-coral-800 border-0 shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="text-2xl font-bold text-card-foreground">{userData.streak}</h3>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zen-50 to-zen-100 dark:from-zen-900 dark:to-zen-800 border-0 shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-2xl font-bold text-card-foreground">{Math.round((userData.currentDay / userData.totalDays) * 100)}%</h3>
            <p className="text-sm text-muted-foreground">Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-morphism border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-1 h-6 bg-pixel-500 rounded-full mr-3" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Ready to start your learning journey!</span>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Profile created</span>
              <span className="text-xs text-muted-foreground">{new Date(userData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
