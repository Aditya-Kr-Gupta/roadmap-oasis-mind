
import React, { useState } from 'react';
import { Brain, Target, Clock, BarChart3, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import DailyRoadmap from '@/components/DailyRoadmap';
import MotivationalQuotes from '@/components/MotivationalQuotes';
import BreathingExercise from '@/components/BreathingExercise';
import PomodoroTimer from '@/components/PomodoroTimer';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import FlipClock from '@/components/FlipClock';

const Index = () => {
  const [isClockFullscreen, setIsClockFullscreen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-zen-50 to-ocean-50 dark:from-zen-900 dark:to-ocean-900 transition-all duration-500">
        {/* Header */}
        <header className="bg-white/80 dark:bg-zen-800/80 backdrop-blur-md border-b border-zen-200 dark:border-zen-700 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-ocean-500 bg-clip-text text-transparent">
                    Roadmap Oasis
                  </h1>
                  <p className="text-sm text-muted-foreground">Your mindful learning journey</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsClockFullscreen(true)}
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center space-x-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>Full Clock</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-zen-800 dark:text-zen-100 mb-4">
              Welcome to Your Learning Journey 🚀
            </h2>
            <p className="text-lg text-zen-600 dark:text-zen-400 max-w-2xl mx-auto">
              Master full-stack development with daily guided tasks, mindful breaks, and focused productivity techniques.
            </p>
          </div>

          {/* Current Time Display */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/70 dark:bg-zen-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border">
              <FlipClock isFullscreen={false} onClose={() => {}} />
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="roadmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-white/70 dark:bg-zen-800/70 backdrop-blur-sm">
              <TabsTrigger 
                value="roadmap" 
                className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-ocean-500 data-[state=active]:text-white"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Roadmap</span>
              </TabsTrigger>
              <TabsTrigger 
                value="productivity" 
                className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-ocean-500 data-[state=active]:text-white"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="wellness" 
                className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-ocean-500 data-[state=active]:text-white"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Wellness</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-ocean-500 data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-6">
              <DailyRoadmap />
            </TabsContent>

            {/* Productivity Tab */}
            <TabsContent value="productivity" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PomodoroTimer />
                <div className="bg-card rounded-xl p-6 shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    🚫 Distraction Blockers
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Focus Tips</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Turn off non-essential notifications</li>
                        <li>• Use website blockers during study time</li>
                        <li>• Keep your phone in another room</li>
                        <li>• Use the Pomodoro technique</li>
                      </ul>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Block Social Media (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Wellness Tab */}
            <TabsContent value="wellness" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotivationalQuotes />
                <BreathingExercise />
              </div>
              
              {/* Relaxation Section */}
              <div className="bg-card rounded-xl p-6 shadow-lg border">
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                  🎵 Relaxation Therapy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                    <span className="text-2xl">🌊</span>
                    <span>Ocean Sounds</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                    <span className="text-2xl">🌧️</span>
                    <span>Rain Sounds</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                    <span className="text-2xl">🎼</span>
                    <span>Study Music</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Audio features coming soon! 🎧
                </p>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <ProgressAnalytics />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 dark:bg-zen-800/50 backdrop-blur-sm border-t border-zen-200 dark:border-zen-700 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                Built with 💙 for mindful learning and productivity
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Stay focused, stay motivated, achieve your goals.
              </p>
            </div>
          </div>
        </footer>

        {/* Fullscreen Clock Modal */}
        {isClockFullscreen && (
          <FlipClock
            isFullscreen={true}
            onClose={() => setIsClockFullscreen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
